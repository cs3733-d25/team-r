# Features Folder

Each subfolder here represents a **self-contained feature** or page of the app.

## Structure example:
features/
├── login/
│   └── Login.tsx
├── mapView/
│   ├── MapView.tsx
│   └── MapControls.tsx
├── directory/
│   └── Directory.tsx
├── serviceReqs/
│   └── ServiceReqs.tsx

## Each feature folder may include:
- The main component/view for that route
- Feature-specific components
- Local styles (CSS, SCSS, etc.)
- Services or utilities only used by that feature
- Optional local state management (e.g. context, reducers)

> 🧩 Keeping features modular helps with scalability, testing, and code readability.
