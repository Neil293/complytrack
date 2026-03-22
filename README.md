# ComplyTrack — Water System Compliance

A single-file progressive web app for tracking water system compliance assets, generating service reports, and managing Legionella disinfection certificates.

---

## Getting Started

1. Download `index.html`
2. Open it in any modern browser (Chrome, Safari, Edge, Firefox)
3. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `admin`

> No installation, no server, no internet connection required. Everything runs in the browser.

---

## Features

### Assets
- Track all water system assets across multiple clients and complexes
- Asset types: Warm Water System, TMV, Sewer Pump, Stormwater Pump, Raypack, UV System, Legionella Sterilising
- Status tracking: Overdue, Due Soon, Upcoming, Complete, Failed, Pending, Decommissioned
- Record service history with date, result, technician, notes and parts used
- Filter by type, status, client or search by keyword
- Auto-generate asset reference IDs (⚡ Generate button)
- **Section / Area** field for grouping assets within a complex

### Clients & Complexes
- Manage multiple clients each with multiple complexes/sites
- Full address details, contact info and notes per complex
- Deleting a client automatically deactivates all linked assets

### Service Reports
- **7-step Report Wizard:**
  1. Select Client
  2. Select Complex
  3. Date & Job (service type, job number, single day or range)
  4. Technician
  5. Systems (select warm water systems and TMVs)
  6. Summary (preview before generating)
  7. Review & Generate
- **Report types:** Service Report, Reactive Service, Warm Water, TMV, Pump Service, Legionella Disinfection Certificate, Other
- **Legionella Certificate** includes: company letterhead, disinfection details, WWS table, TMV table, method used, serviced by section
- All reports use consistent branded layout with company logo and colours
- Print to PDF via browser print dialog
- Email via default mail client

### Report History
- Every generated report is saved to the assets it covers
- Three separate history lists per asset: Service History, Reactive Service History, Legionella Disinfection History
- Each record tracks when it was printed and emailed (with timestamp and user)
- ↺ View button to regenerate any past report exactly as it was
- Admin users can delete history records

### Asset Import
- Bulk import assets into a complex via CSV or tab-separated data
- Access from **Edit Complex → Import Assets**
- Paste directly from Excel or Google Sheets (tab-separated auto-detected)
- Or use comma-separated CSV format
- See `ComplyTrack_Asset_Import_Instructions.md` for full format details

### Settings
- **🏗 Company** — company name, ABN, phone, email, website, brand colour, report title, disclaimer
- **👥 Users** — add/edit/delete users with roles (admin, supervisor, technician) and permissions
- **🏢 Clients** — manage clients with colour coding
- **🏷 Asset Types** — customise asset types with icons and colours
- **📄 Report Template** — configure report sections and branding
- **⚙️ Data** — export CSV, backup JSON, restore from backup, reset all data

---

## Default Data

The app comes pre-loaded with:
- **Client:** IRT Group
- **20 Complexes:** All IRT sites across NSW and ACT
- **124 TMV Assets:** William Beach Gardens (Kanahooka NSW) — all Rada 215 valves

---

## Data Storage

All data is stored in **browser localStorage**. This means:
- Data persists between sessions in the same browser
- Opening the file in a different browser starts fresh with seed data
- To transfer data between devices: **Settings → ⚙️ Data → 💾 Backup JSON**, then restore on the new device

---

## Login

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin` | Administrator |
| `tech1` | `tech1` | Technician |

---

## Report Wizard — Service Types

| Type | Icon | Use For |
|------|------|---------|
| Service Report | 📋 | Standard planned maintenance |
| Reactive Service | ⚡ | Breakdown or fault response |
| Legionella Certificate | 🦠 | Chemical disinfection certificate |
| Warm Water Service | 🌡 | Warm water system inspection |
| TMV Service | 🚿 | Thermostatic mixing valve service |
| Pump Service | 🔧 | Sewer or stormwater pump service |
| Other | 📄 | General compliance report |

---

## Asset Import CSV Format

```
ref, location, make, model, serial, capacity, month, interval, last_service_date, result, notes
```

- Only `ref` is mandatory
- Dates must be `YYYY-MM-DD`
- Tab-separated (from Excel/Sheets) or comma-separated both work
- See `ComplyTrack_Asset_Import_Instructions.md` for full details

---

## Resetting Data

To reset all data back to defaults (IRT seed data):
- On the login screen tap **🔄 Reset all data**
- Or go to **Settings → ⚙️ Data → 🗑 Reset All Data**

---

## Repository

Source code and latest releases are available on GitHub:

**https://github.com/Neil293/complytrack**

---

## Files

| File | Description |
|------|-------------|
| `index.html` | The complete app — open this in a browser |
| `README.md` | This file |
| `ComplyTrack_Asset_Import_Guide.md` | Quick import reference |
| `ComplyTrack_Asset_Import_Instructions.md` | Full detailed import instructions |

---

## Technical

- Pure HTML, CSS and JavaScript — no frameworks, no dependencies
- Single file — everything including the company logo is embedded
- Works offline
- Mobile-friendly responsive design
- Compatible with Chrome, Safari, Edge, Firefox

---

*ComplyTrack — Water System Compliance*
*Developed for Fairy Meadow Plumbing*
