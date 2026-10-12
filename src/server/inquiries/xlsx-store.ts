import 'server-only';
import ExcelJS from 'exceljs';
import { existsSync } from 'node:fs';
import { appendFile, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { COLUMNS, type InquiryRow } from './rows';

const SHEET = 'Inquiries';
export const xlsxPath = () => process.env.INQUIRY_XLSX_PATH ?? path.join(process.cwd(), 'data', 'inquiries.xlsx');
export const backupPath = () => process.env.INQUIRY_BACKUP_PATH ?? path.join(process.cwd(), 'data', 'inquiries.jsonl');

// One write at a time: the workbook is read, appended and replaced atomically.
let queue: Promise<unknown> = Promise.resolve();

export function appendToXlsx(row: InquiryRow): Promise<void> {
  const run = queue.then(() => write(row));
  queue = run.catch(() => undefined);
  return run;
}

async function write(row: InquiryRow) {
  const file = xlsxPath();
  await mkdir(path.dirname(file), { recursive: true });
  const wb = new ExcelJS.Workbook();
  let ws: ExcelJS.Worksheet;
  if (existsSync(file)) {
    await wb.xlsx.readFile(file);
    ws = wb.getWorksheet(SHEET) ?? wb.addWorksheet(SHEET);
  } else {
    ws = wb.addWorksheet(SHEET, { views: [{ state: 'frozen', ySplit: 1 }] });
  }
  if (ws.rowCount === 0) {
    const head = ws.addRow([...COLUMNS]);
    head.font = { bold: true };
    head.eachCell((c) => { c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFE6D2' } }; });
    const widths = [22, 26, 18, 16, 22, 28, 18, 24, 18, 22, 24, 60, 12, 22];
    widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLUMNS.length } };
  }
  const added = ws.addRow(COLUMNS.map((c) => row[c]));
  added.alignment = { vertical: 'top', wrapText: true };
  const tmp = `${file}.tmp`;
  await wb.xlsx.writeFile(tmp);
  await rename(tmp, file); // atomic replace: a crash never leaves a half-written workbook
}

/** Append-only safety net. If Excel has the workbook open (Windows locks it) the inquiry is still kept here. */
export async function appendToBackup(row: InquiryRow): Promise<void> {
  const file = backupPath();
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(row)}\n`, 'utf8');
}
