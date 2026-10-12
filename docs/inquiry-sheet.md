# Inquiry sheet — where demo requests are saved

Every **Book a Demo** request, **contact message** and **newsletter sign-up** is posted to
`POST /api/inquiries` and appended as one row to an Excel sheet.

## Option A — Excel file on the server (default)
`INQUIRY_STORAGE=xlsx` writes `data/inquiries.xlsx` (sheet **Inquiries**, header row frozen + filterable).

- Needs a writable disk (your own server, VPS, Docker volume, or local machine). It will **not** persist on serverless hosts such as Vercel.
- Download the file any time; open it in Excel.
- **Windows:** if Excel has the file open it is locked and the Excel write fails. Nothing is lost — every inquiry is also appended to `data/inquiries.jsonl`.
- `data/` is git-ignored (it holds personal data). Back it up.

## Option B — Google Sheet (works on any host)
1. Create a Google Sheet. Row 1 headers (exactly, in this order):
   `Received (UTC) | Received (local) | Reference | Type | Name | Email | Phone | Enquiry type | Property type | Department | Subject | Message | Product updates OK | Source page`
2. **Extensions → Apps Script**, paste:

```js
const SECRET = 'choose-a-long-random-string';          // same value as INQUIRY_SHEET_SECRET
const COLUMNS = ['Received (UTC)','Received (local)','Reference','Type','Name','Email','Phone','Enquiry type','Property type','Department','Subject','Message','Product updates OK','Source page'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return out({ ok: false, error: 'forbidden' });
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const values = COLUMNS.map(function (c) { return body.row[c] || ''; });
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, COLUMNS.length);
    range.setNumberFormat('@');          // plain text: phone numbers stay intact, "=..." is never run as a formula
    range.setValues([values]);
    return out({ ok: true });
  } catch (err) { return out({ ok: false, error: String(err) }); }
}
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
```
3. **Deploy → New deployment → Web app**, *Execute as: Me*, *Who has access: Anyone*. Copy the `/exec` URL.
4. Set in `.env.local` (or your host's environment):
```
INQUIRY_STORAGE=sheets
INQUIRY_SHEET_WEBHOOK_URL=<the /exec URL>
INQUIRY_SHEET_SECRET=<same secret as in the script>
```
Use `INQUIRY_STORAGE=both` to write the Excel file and the Google Sheet.

## Protection built in
Same-origin only · 20 KB body cap · Zod validation (shared with the forms) · per-IP rate limit
(default 8 per 10 min) · hidden honeypot field · spreadsheet formula-injection neutralised
(cells starting with `=` or `@`, or `+`/`-` that are not phone numbers, are prefixed with `'`; phone numbers like `+91 97255 58828` are kept as typed) · secrets stay server-side.

## Columns
Received (UTC), Received (local), Reference (e.g. `DEMO-261013-7K2QX`), Type, Name, Email, Phone, Enquiry type,
Property type, Department, Subject, Message, Product updates OK, Source page.
