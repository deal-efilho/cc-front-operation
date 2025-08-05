# Technology Stack

## Framework & Runtime
- **Next.js 14.2.25** with App Router
- **React 18** with TypeScript
- **Node.js** runtime environment

## Build System & Tools
- **Next.js** build system
- **Biome** for linting and formatting (replaces ESLint/Prettier)
- **TypeScript 5** for type safety
- **PostCSS** for CSS processing

## Styling & UI
- **Tailwind CSS 3.4.1** for utility-first styling
- **shadcn/ui** component library (New York style)
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **next-themes** for dark mode support
- **tailwindcss-animate** for animations

## State Management & Data Fetching
- **Zustand** for client-side state management
- **TanStack Query (React Query)** for server state management
- **TanStack React Table** for data tables
- **TanStack React Form** for form handling
- **React Hook Form** for additional form utilities

## Shared Dependencies
- **@mfe/cc-front-shared** - Internal shared component library
- **Sonner** for toast notifications

## Development Commands

```bash
# Development server (runs on port 3004)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting (uses Biome)
npm run lint

# Reinstall shared dependencies
npm run reinstall-shared
```

## Code Quality Configuration
- **Biome** configuration in `biome.json`
- 2-space indentation
- 80 character line width
- Double quotes for strings
- Semicolons required
- ES5 trailing commas