# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build system, no npm, no server required. Open `index.html` directly in a browser:

```
# macOS
open index.html

# Linux
xdg-open index.html
```

Both `index.html` and `data.js` must be in the same directory. `data.js` is loaded as a `<script src>` tag before the main app script and must define its constants (`APP_CONFIG`, `D*` constants) before the DOM loads.

Default login: `admin` / `admin`

Live deployment: https://neil293.github.io/complytrack/

## Architecture

**Two files, no dependencies:**

- `index.html` — All CSS, HTML templates, and JavaScript logic (~3,500 lines). This is the entire application.
- `data.js` — App config and seed data only. All constants start with `D` (e.g. `DASSETS`, `DUSERS`, `DSETTINGS`) and are consumed once by `initData()` on first load.

**Data flow:**

1. On `DOMContentLoaded`, `initData()` checks localStorage. If empty, it seeds from the `D*` constants in `data.js`.
2. All runtime state lives in global variables: `CU` (current user), `assets`, `users`, `clients`, `complexes`, `types`, `settings`.
3. Any mutation calls `saveAll()` to persist the entire state to localStorage and schedule a cloud sync (if Firebase is configured).
4. UI re-renders by calling a `render*()` function (e.g. `renderAssets()`, `renderClients()`).

**Code sections** are marked with `CT:SECTION` comments in `index.html`:

| Section | Lines (approx) | Purpose |
|---|---|---|
| `STORAGE` | ~749 | `ls()`, `L()`, `S()` — localStorage helpers; `$()` — getElementById shorthand |
| `STATE` | ~759 | Global variable declarations |
| `FIREBASE` | ~803 | Cloud sync — `initFirebase()`, `pullFromCloud()`, `pushToCloud()`, `scheduleFsSync()` |
| `BOOT` | ~960 | `initData()`, `saveAll()`, `hardReset()`, `loginUser()` |
| `ASSET_CRUD` | ~1106 | `saveAsset()`, `deleteAsset()`, `saveSvc()`, `renderAssets()`, `assetCard()` |
| `COMPLEX_CRUD` | ~1408 | `saveComplex()`, `deleteComplex()`, import parsing |
| `REPORT_WIZARD` | ~1465 | 7-step wizard (`renderWiz()`, `renderWizS1()`–`renderWizS7()`), `genReport()` |
| `LEGIONELLA_CERT` | ~2562 | Legionella disinfection certificate HTML template |
| `STANDARD_REPORT` | ~2738 | Standard service report HTML template |
| `SETTINGS` | ~3022 | `renderSettings()`, `renderFsSection()`, company info, users, asset types, data export/import |

## Key Conventions

**IDs** are plain strings: `'c4'` for a client, `'cx_irt_04'` for a complex, `'wbg_tmv_001'` for an asset. When creating new records, generate IDs with `'id_'+Date.now()` or similar unique strings.

**Asset status** is computed (not stored) by `getStatus(a)` from `svcDate`, `intv` (interval), and `month`. The statuses are: `overdue`, `due`, `upcoming`, `complete`, `failed`, `pending`, `decomm`.

**Asset interval** values: `'annual'`, `'biannual'`, `'quarterly'`, `'monthly'`.

**Report history** is stored inside each asset as `a.log[]`. Each log entry has a `type` (`'svc'`, `'react'`, `'leg'`), a snapshot of the report HTML in `a.log[i].html`, and timestamps for print/email actions. `regenReport()` reconstructs a past report from this snapshot.

**Modals** slide up from the bottom (`.mbg` + `.modal`). Open with `$('modal-id').classList.add('on')`, close by removing `'on'`. The backdrop is the `.mbg` element; the white panel inside it is `.modal`.

**Toasts** are shown via `toast(msg, isError)`.

**Navigation** uses `goPage(name)` where `name` is one of the `PAGES` array: `['assets','upcoming','clients','reports','settings']`. The active page element gets class `on`.

## Report Wizard

The wizard is 7 steps driven by `wizCur` (step index) and `wizData` (all selections). Key functions:

- `renderWiz()` — outer shell, calls the current step renderer
- `renderWizS1()` – `renderWizS7()` — one function per step
- `renderWizS4b()` — **Systems step**: routes by `wizData.serviceType`:
  - `pump` → `renderWizS4bPumps()` (Sewer + Stormwater Pump selection)
  - all others → WWS + TMV selection
- `buildRptDataFromWiz()` — assembles `rptData` from `wizData`; uses `explicitIds` (assets ticked in the Systems step) to override the broad type filter

**`wizData` fields:**

| Field | Purpose |
|---|---|
| `clientId`, `cxId` | Selected client and complex |
| `from`, `to`, `singleDay` | Date range |
| `serviceType` | `'standard'`, `'reactive'`, `'legionella'`, `'warmwater'`, `'tmv'`, `'pump'`, `'other'` |
| `jobNumber`, `typeF` | Job number and optional asset type filter |
| `techId` | Selected technician |
| `wwsItems` | Warm Water System selections (from register or manual) |
| `tmvItems` | TMV selections (from register or manual) |
| `pumpItems` | Sewer/Stormwater Pump selections (from register or manual) |
| `extraNotes` | Extra notes textarea value |

Each item in `wwsItems` / `tmvItems` / `pumpItems` has: `{assetId?, ref, model, result, fromRegister}`.

## Firebase Cloud Sync

Firebase is **optional** — the app works fully offline without it. The SDK is loaded from CDN; if it fails (no internet), Firebase is silently skipped.

**Global vars:** `fsDb`, `fsAuth`, `fsSyncTimer` (all `null` until configured)

**Config storage:** `settings.fsCfg` — contains the Firebase web app config fields plus `email` and `pass` (password is stripped before any Firestore write).

**Sync strategy (minimises free-tier usage):**
- `initFirebase()` — called in `loginUser()`; signs in with email/password, then calls `pullFromCloud()` once
- `pullFromCloud(uid)` — one Firestore read; if cloud `at` timestamp is newer than `settings.fsSyncAt`, prompts user to load from cloud
- `pushToCloud(uid)` — writes the full state as one Firestore document (`complytrack/{uid}`)
- `scheduleFsSync()` — called by `saveAll()`; debounces 30 s, then calls `pushToCloud()`. No real-time listener.
- Typical session cost: **1 read + 3–5 writes** — well within the Spark free tier (50K reads / 20K writes per day)

**Settings UI:** `renderFsSection()` injects the Cloud Sync card into `<div id="fs-sync-section">` in the Data tab. It renders a setup form (not yet configured) or a status panel with Sync Now / Disconnect (already configured). Called from `renderSettings()`.

**Firestore document path:** `complytrack/{firebaseAuthUid}` — one document per authenticated user, containing the full backup payload (`assets`, `users`, `clients`, `complexes`, `types`, `settings`, `at`).

## Customisation via data.js

To rebrand or change seed data, edit only `data.js`:
- `APP_CONFIG` — app name, tagline, version, default credentials
- `DSETTINGS` — company details, brand colour, report title, email templates
- `DCLIENTS`, `DCOMPLEXES`, `DASSETS`, `DUSERS` — seed records loaded on first run

`index.html` reads `APP_CONFIG.name` and `APP_CONFIG.tagline` to set the page `<title>` and nav logo automatically.

## Asset Import Format

Bulk import via **Edit Complex → Import Assets** (tab-separated from Excel, or CSV):

```
ref, location, make, model, serial, capacity, month, interval, last_service_date, result, notes
```

Only `ref` is required. Dates must be `YYYY-MM-DD`. The parser (`importAssetsCSV`) handles quoted fields containing commas.

## Data Reset

Reset all data to seed defaults:
- Login screen → "Reset all data" link
- Settings → Data → Reset All Data
- Or call `hardReset()` from the browser console
