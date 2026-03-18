---
inclusion: auto
---

# React Development Standards

## Component Development Guidelines

### 1. Component Structure

```typescript
// Feature-based component example
import React from 'react'
import { useBookData } from '../hooks/useBookData'
import type { BookProps } from '../types/BookTypes'

interface BookCardProps extends BookProps {
  onSelect?: (id: string) => void
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  onSelect
}) => {
  const { isLoading, error } = useBookData(id)

  if (isLoading) return <BookCardSkeleton />
  if (error) return <BookCardError error={error} />

  return (
    <div className="book-card">
      {/* Component content */}
    </div>
  )
}
```

### 2. Hook Patterns

- Custom hooks should start with 'use'
- Keep hooks focused on single responsibility
- Return objects with named properties, not arrays
- Handle loading and error states consistently

```typescript
// Good hook pattern
export const useBookData = (bookId: string) => {
  const [data, setData] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Implementation...

  return { data, isLoading, error, refetch };
};
```

### 3. State Management

- Use local state for component-specific data
- Use context for feature-wide state
- Keep state as close to where it's used as possible
- Avoid prop drilling - use context or state management

### 4. Event Handling

- Use descriptive event handler names
- Handle events at the appropriate level
- Prevent default behavior when necessary
- Use TypeScript event types

```typescript
const handleBookSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  onSelect?.(book.id);
};
```

### 5. Conditional Rendering

- Use early returns for loading/error states
- Keep JSX clean with extracted conditions
- Use logical operators appropriately

```typescript
// Good
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />

return (
  <div>
    {books.length > 0 && <BookList books={books} />}
    {showFilters && <BookFilters />}
  </div>
)
```

### 6. Props and Interfaces

- Define clear prop interfaces
- Use optional props appropriately
- Provide default values when needed
- Avoid passing entire objects when only specific properties are needed

### 7. Styling Approach

- Use Tailwind CSS classes consistently
- Group related classes together
- Use responsive design patterns
- Extract complex class combinations to constants

```typescript
const cardClasses = [
  "bg-white rounded-xl shadow-md",
  "hover:shadow-xl transition-all duration-300",
  "overflow-hidden border border-gray-100",
].join(" ");
```

### 8. Performance Optimization

- Use React.memo for components that receive stable props
- Implement useMemo for expensive calculations
- Use useCallback for event handlers passed to child components
- Lazy load heavy components

### 9. Error Boundaries

- Implement error boundaries for feature sections
- Provide fallback UI for errors
- Log errors for debugging
- Allow graceful degradation

### 10. Accessibility

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast

## File Organization Within Features

```
features/books/
├── components/
│   ├── BookCard/
│   │   ├── BookCard.tsx
│   │   ├── BookCard.test.tsx
│   │   └── index.ts
│   ├── BookList/
│   └── BookFilters/
├── hooks/
│   ├── useBookData.ts
│   ├── useBookFilters.ts
│   └── index.ts
├── services/
│   ├── bookService.ts
│   └── index.ts
├── types/
│   ├── BookTypes.ts
│   └── index.ts
└── index.ts
```

## Testing Strategy

- Unit tests for utility functions
- Component tests for UI behavior
- Integration tests for feature workflows
- Mock external dependencies
- Test error scenarios and edge cases
