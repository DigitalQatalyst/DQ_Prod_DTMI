---
inclusion: auto
---

# Clean Code and Maintainability Guidelines

## Code Quality Standards

### 1. No Unnecessary Documentation Files

- **NEVER create markdown files unless explicitly requested by the user**
- Avoid README.md, CHANGELOG.md, or other documentation files
- Keep documentation in code comments when needed
- Use JSDoc for function documentation

### 2. Component Best Practices

- Keep components small and focused (< 200 lines)
- Use descriptive component names that reflect their purpose
- Extract complex logic into custom hooks
- Prefer composition over inheritance
- Use TypeScript interfaces for props

### 3. Function Guidelines

- Functions should do one thing well
- Use descriptive function names
- Keep functions small (< 50 lines)
- Avoid deep nesting (max 3 levels)
- Use early returns to reduce complexity

### 4. Variable and Naming Conventions

- Use descriptive variable names
- Avoid abbreviations and single-letter variables
- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use UPPER_SNAKE_CASE for constants

### 5. Import Organization

```typescript
// 1. External libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// 2. Internal features (alphabetical)
import { useAuth } from "@/features/auth";
import { BookCard } from "@/features/books";

// 3. Shared utilities
import { formatDate } from "@/shared/utils";

// 4. Types
import type { User, Book } from "@/shared/types";
```

### 6. Code Structure

- Group related code together
- Use consistent indentation (2 spaces)
- Add blank lines between logical sections
- Remove unused imports and variables
- Use meaningful comments sparingly

### 7. Error Handling

- Always handle errors gracefully
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Show user-friendly error states

### 8. Performance Considerations

- Use React.memo for expensive components
- Implement proper key props in lists
- Avoid inline functions in render methods
- Use useMemo and useCallback when appropriate
- Lazy load components when possible

### 9. TypeScript Usage

- Always use TypeScript for new files
- Define proper interfaces and types
- Avoid `any` type - use proper typing
- Use union types and generics appropriately
- Enable strict mode in tsconfig.json

### 10. Testing Considerations

- Write testable code
- Keep business logic separate from UI
- Use dependency injection for services
- Mock external dependencies
- Test edge cases and error scenarios

## Code Review Checklist

- [ ] No unnecessary markdown files created
- [ ] Components are properly organized by feature
- [ ] Functions are small and focused
- [ ] Variables have descriptive names
- [ ] Imports are organized correctly
- [ ] Error handling is implemented
- [ ] TypeScript types are properly defined
- [ ] No unused code or imports
- [ ] Code follows established patterns
- [ ] Performance considerations addressed
