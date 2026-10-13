# Legal compliance

> This is an engineering record of what the site does and where each legal point is handled. It is **not legal advice**. The policy wording is draft text and must be reviewed by a qualified lawyer before launch.

## Where the legal text lives

| What | Where |
| --- | --- |
| Privacy Policy, Terms, Cookie Policy | `src/app/privacy-policy`, `terms-and-conditions`, `cookies` |
| Legal facts (entity, grievance officer, retention, storage list, trademark credits) | `src/config/legal.ts` (single source) |
| Notice shown at every form | `src/components/forms/PrivacyNotice.tsx` |
| Unconfirmed facts show "To be confirmed" | `src/components/ui/Fill.tsx` |

Anything you change in `config/legal.ts` flows to all three policies, the form notices and the footer. Update `LEGAL.updated` whenever the text or the facts change.

## Before launch

1. Fill in `src/config/legal.ts`: `entityName`, `registeredAddress`, `grievanceOfficer.name` and `designation`, `courtsCity`. `npm run check:legal` lists what is missing; `npm run check:legal -- --strict` fails until it is all there.
2. Confirm `retentionMonths` (24) is what you will actually do, and run the purge on a schedule (below).
3. Have a lawyer review the three policies.
4. Serve the site over HTTPS. The `Strict-Transport-Security` header is already set and takes effect on HTTPS.
5. If you ever add analytics, advertising, a chat widget, embedded video, a map or external fonts, update the Cookie Policy and Privacy Policy **first** and add a consent step. Today the site sets no cookies and makes no third-party requests (a test checks both).

## What the site does with personal data

| Item | Fact |
| --- | --- |
| Collected | Name, email, phone (optional), message and form choices from the demo form, contact form and updates box; timestamp, reference, source page |
| Not collected | Passwords, payment or ID data, health data. Visitors are told not to send them |
| Stored in | `data/inquiries.xlsx`, `data/inquiries.jsonl` (backup), and Google Sheets if `INQUIRY_STORAGE` uses it. `data/` is git-ignored |
| IP address | Counted in server memory for rate limiting only; not stored with the enquiry. The host may keep ordinary server logs |
| Cookies | None. One `sessionStorage` key (`ss-intro-seen`) |
| Third parties | None load in the browser. WhatsApp opens only on click. Hosting and (optionally) Google Sheets act for you |
| Marketing | Only with consent: the unticked checkbox on the demo form, or the updates box |

## Handling requests

All commands need Node and run from the project folder. They change nothing unless you add `--confirm`, and they save a copy first in `data/privacy-backups/` (delete those copies afterwards, they still hold the data).

```bash
npm run privacy -- find  person@example.com             # access request: what do we hold?
npm run privacy -- erase person@example.com --confirm   # erasure or consent withdrawal
npm run privacy -- purge --confirm                      # retention: delete enquiries older than retentionMonths
```

- Reply to the person within `LEGAL.responseDays` (30) days. Confirm it is them first (reply to the address on file).
- The tool matches the **Email** column. If someone's details also appear in another person's message text, check by hand.
- Subscribers are kept by `purge` and removed by `erase` (unsubscribe request).
- Google Sheets is not touched. Delete matching rows there yourself.
- Run `purge` at least monthly (a calendar reminder or a cron job).

## Checklist against the law (summary)

| Requirement | Covered by |
| --- | --- |
| IT (SPDI) Rules 2011, rule 4: published privacy policy stating what is collected, why, disclosure and security | Privacy Policy sections 2 to 7 |
| SPDI rule 5(9): Grievance Officer named on the website, answer within one month | Privacy Policy section 9; `responseDays` 30 |
| SPDI rule 5: consent for sensitive data | None collected; visitors told not to send it |
| DPDP Act 2023: notice at collection, purpose, rights, complaint route | Form notice and Privacy Policy sections 3 and 8 to 9 |
| DPDP: consent that can be withdrawn as easily as given | Unticked checkbox; withdrawal by email; `erase` tool |
| DPDP: erase when purpose ends | Retention in section 6; `purge` tool |
| DPDP: children under 18 | Section 10; website for adults only |
| DPDP: breach notification | Privacy Policy section 7 (commitment); see below |
| Consumer Protection Act 2019 | Terms section 8 keeps statutory rights; no online selling |
| TRAI rules on promotional calls and SMS | Privacy Policy section 3: no promotional contact without agreement |
| Trademarks of named brands | Terms section 6 credits and disclaimer |

**Dates (checked from published summaries in October 2026; confirm with your lawyer against the Gazette):** the DPDP Rules were notified on 13 November 2025. Most duties (notice, consent, rights, children, breach) apply from **13 May 2027**. Until then the 2011 SPDI Rules under section 43A of the IT Act are the rules in force. The policy is written to satisfy both.

## If personal data is exposed

Find out what was exposed and for whom, stop the cause, then tell the affected people and the authorities as the law requires (the DPDP Rules set the process and timing). Record what happened and what you did.
