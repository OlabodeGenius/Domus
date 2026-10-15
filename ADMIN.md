# Domus property workspace

The property-management preview is available at `/admin`. It uses Sarah
Jenkins's sample portfolio and does not require authentication.

| Route | Workspace |
|---|---|
| `/admin` | Portfolio overview, collection health, alerts, and activity |
| `/admin/properties` | Property cards, occupancy filters, and unit summaries |
| `/admin/tenants` | Resident directory and household-independent emergency contacts |
| `/admin/leases` | Expiration pipeline and renewal-offer preview |
| `/admin/payments` | Rent ledger, financial activity, and printable receipts |
| `/admin/maintenance` | Repair requests, priority, assignment, and resolution |
| `/admin/documents` | Property records and a browser-session document vault |

The sample portfolio is anchored to November 12, 2026: 148 homes, 382 residents,
and $218,450 in scheduled monthly rent. The workspace suggests a country and
currency using the browser's time zone and locale; the header lets an owner
change either preference. Currency changes format the sample amounts only and
do not perform exchange-rate conversion.

Demo actions such as adding a record, assigning a maintenance request, saving a
renewal draft, or uploading a document update the current browser session only.
The preview has no database or API, does not contact residents, process
payments, or provide authentication. Documents uploaded in the preview remain
in memory and are not sent to a server.

The workspace defaults to light mode. The header toggle switches the workspace
to dark mode and remembers that preference in local browser storage.
