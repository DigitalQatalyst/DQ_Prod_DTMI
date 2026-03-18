---
inclusion: auto
---

# Feature-Based Folder Structure Guidelines

## Core Principles

### 1. Feature-Based Organization

- Organize code by features/domains, not by file types
- Each feature should be self-contained with its own components, hooks, utils, and types
- Avoid generic folders like `components/`, `utils/`, `hooks/` at the root level

### 2. Folder Structure Pattern

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   ├── books/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   └── marketplace/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── pages/
└── app/
```

### 3. Feature Module Structure

Each feature should have:

- `components/` - Feature-specific components
- `hooks/` - Feature-specific custom hooks
- `services/` - API calls and business logic
- `types/` - TypeScript interfaces and types
- `utils/` - Feature-specific utility functions
- `index.ts` - Public API exports

### 4. Import Rules

- Use barrel exports (`index.ts`) for clean imports
- Import from features using: `import { Component } from '@/features/auth'`
- Shared utilities go in `src/shared/`
- No cross-feature imports except through public APIs

### 5. Component Organization

- One component per file
- Co-locate related files (component + styles + tests)
- Use descriptive, feature-specific names
- Avoid generic names like `Button`, `Modal` (use `AuthButton`, `BookModal`)

## Implementation Guidelines

### When Creating New Features:

1. Create feature folder in `src/features/`
2. Add required subfolders (components, hooks, services, types)
3. Create `index.ts` with public exports
4. Move related existing code into the feature

### When Refactoring:

1. Identify feature boundaries
2. Move components to appropriate feature folders
3. Update imports to use barrel exports
4. Remove empty generic folders

### File Naming Conventions:

- Components: PascalCase (`BookCard.tsx`)
- Hooks: camelCase starting with 'use' (`useBookData.ts`)
- Services: camelCase (`bookService.ts`)
- Types: PascalCase (`BookTypes.ts`)
- Utils: camelCase (`bookUtils.ts`)

## Benefits

- Better code organization and maintainability
- Easier to locate and modify feature-related code
- Reduced coupling between features
- Clearer boundaries and responsibilities
- Easier testing and debugging
