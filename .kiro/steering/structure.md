# Project Structure

## Root Directory Organization

```
├── app/                    # Next.js App Router pages and layouts
├── components/             # Shared UI components
├── config/                 # Configuration files
├── features/               # Feature-based modules
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
├── providers/              # React context providers
├── public/                 # Static assets
└── scripts/                # Build and utility scripts
```

## Key Directories

### `/app` - Next.js App Router
- `layout.tsx` - Root layout with providers and shared components
- `page.tsx` - Route pages
- `globals.css` - Global styles and CSS variables
- Uses Next.js 13+ App Router convention

### `/components` - Shared Components
- `ui/` - shadcn/ui components and base UI primitives
- Reusable components used across features
- Follow shadcn/ui naming and structure conventions

### `/features` - Feature Modules
Organized by business domain (e.g., `consult`, `exchange`):
```
features/
├── [feature-name]/
│   ├── components/         # Feature-specific components
│   ├── hooks/             # Feature-specific hooks
│   ├── layouts/           # Feature-specific layouts
│   ├── mocks/             # Mock data for development
│   └── pages/             # Feature page components
```

### `/config` - Configuration
- `menu-config.ts` - Navigation menu configuration with permissions
- Other app-wide configuration files

### `/hooks` - Custom Hooks
- Reusable React hooks (e.g., `use-modal.ts`)
- Follow `use-` naming convention

### `/lib` - Utilities
- `utils.ts` - Common utility functions (includes `cn` for className merging)
- Helper functions and shared logic

### `/providers` - Context Providers
- React context providers for global state
- `query-provider.tsx` - TanStack Query setup
- `modal-provider.tsx` - Modal state management

## File Naming Conventions

- **Components**: PascalCase for component files (`ConfirmationModal.tsx`)
- **Hooks**: kebab-case with `use-` prefix (`use-modal.ts`)
- **Pages**: kebab-case (`exchange-page.tsx`)
- **Utilities**: kebab-case (`menu-config.ts`)
- **Types**: PascalCase interfaces/types

## Import Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/*` - Root directory
- `@/components` - Components directory
- `@/lib` - Lib directory
- `@/hooks` - Hooks directory
- `@/ui` - UI components (`@/components/ui`)

## Architecture Patterns

- **Feature-based organization** for business logic
- **Shared components** in `/components`
- **Custom hooks** for reusable logic
- **Provider pattern** for global state
- **Utility-first** CSS with Tailwind
- **Permission-based** menu system