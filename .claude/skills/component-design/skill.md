---
name: component-design
description: Svelte component design, UI/UX architecture, design system implementation, and component library development
version: "1.0.0"
category: design
author: dashboard-dev-team
---

# Component Design Skill

Comprehensive Svelte component design and UI/UX architecture tool for creating reusable, accessible, and visually consistent components.

## Features

### 🎨 **Component Architecture**
- Svelte component design and implementation patterns
- Component composition and hierarchy planning
- State management and props interface design
- Reactivity and optimization strategies

### 🎯 **Design System Integration**
- shadcn/ui component customization and extension
- Design token implementation and management
- Component variant and styling system design
- Consistent visual language and pattern library

### 📱 **Responsive & Accessible Design**
- Mobile-first responsive design implementation
- WCAG 2.1 AA accessibility compliance
- Cross-browser and device compatibility testing
- Performance optimization for component rendering

### 🔧 **Developer Experience**
- Component documentation and usage examples
- TypeScript interface design and type safety
- Storybook integration and component testing
- Component library maintenance and versioning

## Usage

### Component Design
```
Design a comprehensive data table component with sorting, filtering, and pagination features for the dashboard
```

### Design System Implementation
```
Create a consistent button component system with multiple variants, sizes, and states following the design system
```

### Component Architecture
```
Design a reusable form component system with validation, error handling, and accessibility features
```

### Component Library
```
Create a comprehensive component library for the application with consistent styling and TypeScript interfaces
```

## Component Design Framework

### 1. Component Architecture Patterns
```typescript
// Component Composition Pattern
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ComponentProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Compound Component Pattern
const Card = {
  Root: ({ children, ...props }: CardProps) => (
    <div className={cn('card', props.className)} {...props}>
      {children}
    </div>
  ),
  Header: ({ children, ...props }: CardHeaderProps) => (
    <div className="card-header" {...props}>
      {children}
    </div>
  ),
  Content: ({ children, ...props }: CardContentProps) => (
    <div className="card-content" {...props}>
      {children}
    </div>
  ),
  Footer: ({ children, ...props }: CardFooterProps) => (
    <div className="card-footer" {...props}>
      {children}
    </div>
  )
};
```

### 2. Design System Integration
```typescript
// Design Tokens
const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    neutral: {
      50: '#f9fafb',
      500: '#6b7280',
      900: '#111827'
    }
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem'      // 32px
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem'    // 20px
    }
  }
};

// Component Variants System
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-8 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);
```

### 3. Accessibility Implementation
```typescript
// Accessibility Guidelines
const accessibilityFeatures = {
  // Keyboard Navigation
  keyboardNavigation: {
    tabIndex: 0,
    onKeyDown: handleKeyDown,
    focusable: true
  },

  // Screen Reader Support
  screenReader: {
    'aria-label': 'Descriptive label',
    'aria-describedby': 'element-description',
    role: 'button'
  },

  // Focus Management
  focusManagement: {
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: focusRef
  },

  // Color Contrast
  colorContrast: {
    minimumRatio: 4.5, // WCAG AA standard
    textColors: 'text-neutral-900',
    backgroundColors: 'bg-white'
  }
};

// Accessible Component Example
const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Example Component Design

```
🎨 COMPONENT DESIGN ANALYSIS
============================

🎯 Component: Advanced Data Table
--------------------------------

### Component Overview
A comprehensive data table component with sorting, filtering, pagination, and row selection capabilities for dashboard and analytics views.

### Component Architecture

#### Component Structure
```
DataTable
├── DataTableHeader
│   ├── SearchInput
│   ├── FilterDropdown
│   └── ColumnVisibilityToggle
├── DataTableContent
│   ├── TableHeader
│   │   └── SortableColumn
│   ├── TableBody
│   │   └── TableRow
│   │       ├── TableCell
│   │       └── RowActions
│   └── TableFooter
├── DataTablePagination
│   ├── PageSizeSelector
│   ├── PageNavigation
│   └── RowCountDisplay
└── LoadingState & EmptyState
```

#### Props Interface
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  empty?: React.ReactNode;
  className?: string;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
  pagination?: {
    pageSize: number;
    pageIndex: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    totalCount: number;
  };
  sorting?: {
    column: string;
    direction: 'asc' | 'desc';
    onSortChange: (column: string, direction: 'asc' | 'desc') => void;
  };
  filtering?: {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filters: FilterConfig[];
    onFilterChange: (filters: FilterValue[]) => void;
  };
}

interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (props: CellContext<T>) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
}
```

### Design System Integration

#### Styling Strategy
```typescript
// Design Token Usage
const tableStyles = {
  container: 'bg-white border border-neutral-200 rounded-lg shadow-sm',
  header: 'bg-neutral-50 border-b border-neutral-200',
  row: 'border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
  cell: 'px-4 py-3 text-sm text-neutral-900',
  headerCell: 'px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
};

// Component Variants
const tableVariants = cva(
  'w-full border-collapse',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
      },
      striped: {
        true: 'striped-row',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      striped: false
    }
  }
);
```

### Responsive Design

#### Mobile-First Strategy
```typescript
// Responsive Breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px'   // Large desktop
};

// Responsive Implementation
const ResponsiveDataTable: React.FC<DataTableProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileDataTable {...props} />;
  }

  return <DesktopDataTable {...props} />;
};
```

### Accessibility Features

#### Screen Reader Support
```typescript
// ARIA Implementation
const AccessibleTable: React.FC<DataTableProps> = ({ data, columns, ...props }) => {
  return (
    <div className="relative overflow-x-auto">
      <table
        role="table"
        aria-label="Data table"
        aria-rowcount={data.length}
        className={tableVariants(props)}
      >
        <thead>
          <tr role="row">
            {columns.map((column) => (
              <th
                key={column.id}
                role="columnheader"
                aria-sort={getSortAria(column.sortable)}
                scope="col"
                className={tableStyles.headerCell}
              >
                {column.header}
                {column.sortable && <SortIndicator column={column} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {data.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              role="row"
              aria-rowindex={index + 1}
              className={tableStyles.row}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  role="gridcell"
                  className={tableStyles.cell}
                >
                  {column.cell?.({
                    row,
                    value: row[column.accessorKey],
                    index
                  }) ?? String(row[column.accessorKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### Performance Optimization

#### Rendering Optimizations
```typescript
// Memoization Strategy
const MemoizedTableRow = React.memo(TableRow, (prevProps, nextProps) => {
  return prevProps.row.id === nextProps.row.id &&
         prevProps.selected === nextProps.selected &&
         prevProps.highlighted === nextProps.highlighted;
});

// Virtualization for Large Datasets
const VirtualizedTable: React.FC<VirtualizedTableProps> = ({
  data,
  itemHeight = 50,
  containerHeight = 400
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    data.length
  );

  const visibleItems = data.slice(visibleStart, visibleEnd);

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: data.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            <TableRow data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Component Documentation

#### Usage Examples
```typescript
// Basic Usage
<DataTable
  data={users}
  columns={[
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'role', header: 'Role', accessorKey: 'role' }
  ]}
  pagination={{
    pageSize: 10,
    pageIndex: currentPage,
    onPageChange: setCurrentPage,
    totalCount: totalUsers
  }}
  sorting={{
    column: sortColumn,
    direction: sortDirection,
    onSortChange: setSorting
  }}
/>

// Advanced Usage with Custom Cells
<DataTable
  data={products}
  columns={[
    {
      id: 'name',
      header: 'Product',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <img src={row.image} alt="" className="w-8 h-8 rounded" />
          <span>{row.name}</span>
        </div>
      )
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      cell: ({ value }) => (
        <span className="font-medium">${value.toFixed(2)}</span>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    }
  ]}
  onRowClick={(product) => navigate(`/products/${product.id}`)}
/>
```

## Integration with Team

This skill works seamlessly with:
- **UI/UX Architect** agent for design system consistency and user experience
- **Product Strategist** agent for user requirements and feature specifications
- **Code Review Lead** agent for component quality and best practices
- **QA Engineer** agent for component testing and accessibility validation

## Best Practices

1. **Component Reusability**: Design components to be flexible and reusable across different contexts
2. **Accessibility First**: Ensure all components meet WCAG 2.1 AA standards from the start
3. **Performance Optimization**: Use memoization, virtualization, and lazy loading appropriately
4. **Design System Consistency**: Follow established design tokens and component patterns
5. **Developer Experience**: Provide clear documentation, TypeScript interfaces, and usage examples

This skill ensures that components are well-designed, accessible, performant, and consistent with the overall design system, providing a solid foundation for the user interface.