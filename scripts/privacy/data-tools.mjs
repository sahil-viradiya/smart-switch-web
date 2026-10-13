#!/usr/bin/env node
/**
 * Privacy data tools for the enquiry stores (the Excel sheet and the JSONL backup).
 *
 *   node scripts/privacy/data-tools.mjs find  <email>              show what we hold about someone
 *   node scripts/privacy/data-tools.mjs erase <email> [--confirm]  delete everything we hold about them
 *   node scripts/privacy/data-tools.mjs purge [--confirm]          delete enquiries older than the retention period
 *
 * Without --confirm nothing is changed (dry run). Deleting makes a timestamped copy of each file first
 * (data/privacy-backups/), because a mistake here cannot otherwise be undone. Delete those copies too once
 * you are sure: they still contain the removed personal data.
 *
 * Google Sheets is NOT touched: if you use it (INQUIRY_STORAGE=sheets or both), delete the rows there by hand.
 * Subscribers are kept by `purge` (they stay until they unsubscribe); use `erase` when someone asks.
 */
import ExcelJS from 'exceljs';
import { copyFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const xlsx = process.env.INQUIRY_XLSX_PATH ?? path.join(root, 'data', 'inquiries.xlsx');
const jsonl = process.env.INQUIRY_BACKUP_PATH ?? path.join(root, 'data', 'inquiries.jsonl');
const [cmd, ...rest] = process.argv.slice(2);
const confirm = rest.includes('--confirm');
const arg = rest.find((a) => !a.startsWith('--'));

const retention = Number(/retentionMonths:\s*(\d+)/.exec(await readFile(path.join(root, 'src/config/legal.ts'), 'utf8'))?.[1] ?? 24);
const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - retention);

const usage = () => { console.log('Usage: data-tools.mjs find <email> | erase <email> [--confirm] | purge [--confirm]'); process.exit(1); };
if (!['find', 'erase', 'purge'].includes(cmd) || (cmd !== 'purge' && !arg)) usage();

const email = (arg ?? '').trim().toLowerCase();
const mask = (s) => (s ? s.replace(/^(.{2}).*(@.*)$/, '$1***$2') : '');
/** Row predicate for the chosen command. Dates are the ISO "Received (UTC)" value. */
const hit = (r) => {
  if (cmd === 'purge') return r.Type !== 'Subscriber' && new Date(r['Received (UTC)']) < cutoff;
  return String(r.Email ?? '').trim().toLowerCase() === email;
};
const describe = (r) => `${r['Received (UTC)']?.slice(0, 10)}  ${r.Reference}  ${r.Type}  ${mask(String(r.Email ?? ''))}`;
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backup = async (file) => { const dir = path.join(path.dirname(file), 'privacy-backups'); await mkdir(dir, { recursive: true }); await copyFile(file, path.join(dir, `${stamp}-${path.basename(file)}`)); };

let total = 0;

// 1. JSONL backup
if (existsSync(jsonl)) {
  const lines = (await readFile(jsonl, 'utf8')).split('\n').filter(Boolean);
  const rows = lines.map((l) => { try { return JSON.parse(l); } catch { return null; } });
  const gone = rows.filter((r) => r && hit(r));
  gone.forEach((r) => console.log(`[jsonl] ${describe(r)}`));
  total += gone.length;
  if (confirm && cmd !== 'find' && gone.length) {
    await backup(jsonl);
    await writeFile(`${jsonl}.tmp`, lines.filter((l, i) => !(rows[i] && hit(rows[i]))).map((l) => `${l}\n`).join(''));
    await rename(`${jsonl}.tmp`, jsonl);
  }
} else console.log(`[jsonl] no file at ${jsonl}`);

// 2. Excel sheet
if (existsSync(xlsx)) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(xlsx);
  const ws = wb.getWorksheet('Inquiries');
  if (ws) {
    const head = ws.getRow(1).values.slice(1);
    const toObj = (row) => Object.fromEntries(head.map((h, i) => [h, String(row.getCell(i + 1).value ?? '')]));
    const remove = [];
    ws.eachRow((row, n) => { if (n > 1 && hit(toObj(row))) { remove.push(n); console.log(`[xlsx ] ${describe(toObj(row))}`); } });
    total += remove.length;
    if (confirm && cmd !== 'find' && remove.length) {
      await backup(xlsx);
      remove.reverse().forEach((n) => ws.spliceRows(n, 1));
      await wb.xlsx.writeFile(`${xlsx}.tmp`);
      await rename(`${xlsx}.tmp`, xlsx);
    }
  }
} else console.log(`[xlsx ] no file at ${xlsx}`);

const verb = cmd === 'find' ? 'found' : confirm ? 'deleted' : 'would delete (dry run, add --confirm)';
console.log(`\n${cmd}${cmd === 'purge' ? ` (older than ${retention} months, ${cutoff.toISOString().slice(0, 10)})` : ` ${mask(email)}`}: ${verb} ${total} record(s) across the stores.`);
if (confirm && cmd !== 'find' && total) console.log('Copies were saved in data/privacy-backups/. Delete them once you are sure. Remember Google Sheets (manual) if you use it.');
