---
name: type-safety
description: End-to-end TypeScript type checking and validation across packages, ensuring type consistency from database to frontend
version: "1.0.0"
category: typescript
author: js-auditor-team
---

# Type Safety Skill

Comprehensive TypeScript type safety validation tool ensuring end-to-end type consistency across the JavaScript monorepo's tech stack components.

## Features

### 🔗 **Cross-Package Type Analysis**
- Type consistency validation between packages
- Import/export type dependency analysis
- Generic type parameter validation
- Interface and type alias consistency checks

### 🗄️ **Database-to-TypeScript Mapping**
- Drizzle schema to TypeScript type validation
- Database column type consistency checks
- Generated type correctness verification
- Schema-type synchronization validation

### 🚀 **tRPC Type Safety Verification**
- Router procedure type validation
- Input/output schema type consistency
- Client-server type compatibility checks
- React Query integration type safety

### 🌐 **Frontend Type Validation**
- TanStack Start route type safety
- Component prop type validation
- Hook return type consistency
- SSR/client type compatibility

## Usage

### Comprehensive Type Check
```
Perform a complete type safety analysis across all packages in the JavaScript monorepo
```

### Database-Type Consistency
```
Validate that the TypeScript types match the Drizzle database schemas and identify any inconsistencies
```

### tRPC Type Safety
```
Check the type consistency between tRPC router definitions and client-side usage
```

### Frontend Type Analysis
```
Analyze the TanStack Start application for type safety issues and potential improvements
```

## Type Safety Layers

### 1. Database Schema Types
```typescript
// Drizzle schema -> TypeScript types
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

// Generated types should match exactly
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
```

### 2. tRPC Procedure Types
```typescript
// Router procedure types must be consistent
export const getUser = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    // Return type must match User type
  });
```

### 3. Client-Server Types
```typescript
// Client usage must match router types
const { data } = api.getUser.useQuery({ id: "123" });
// data type should be User | undefined
```

### 4. Frontend Component Types
```typescript
// Component props should be properly typed
interface UserProfileProps {
  user: User; // From database types
  onUpdate: (user: Partial<User>) => void;
}
```

## Analysis Categories

### 🟢 **Type Consistency**
- Cross-package type alignment
- Interface definition consistency
- Generic type parameter validation
- Import/export type dependencies

### 🟡 **Type Inference**
- Type inference accuracy checks
- Generated type validation
- Automatic type widening/narrowing
- Contextual typing verification

### 🔴 **Type Conflicts**
- Type mismatch detection
- Circular dependency identification
- Incompatible type definitions
- Missing type declarations

## Example Output

```
🔍 TYPE SAFETY ANALYSIS REPORT
==============================

📊 OVERALL TYPE COVERAGE: 94.2%
✅ STRICT MODE ENABLED: All packages
🔗 CROSS-PACKAGE CONSISTENCY: 98.1%

🟢 TYPE CONSISTENCY CHECKS:
---------------------------
✅ Database schema ↔ TypeScript types: 100% match
✅ tRPC input/output types: All consistent
✅ Component prop types: Properly defined
✅ Hook return types: Accurately inferred

⚠️  TYPE INFERENCE ISSUES (3):
-----------------------------
[1] packages/api/src/routers/audit.ts:45
    Issue: Return type could be more specific
    Current: unknown
    Suggested: AuditLog[]
    Fix: Add explicit return type annotation

[2] apps/web/src/routes/dashboard.tsx:23
    Issue: Component prop could be more specific
    Current: any
    Suggested: UserProfileProps
    Fix: Import and use proper prop type

[3] packages/db/src/schema/auth.ts:67
    Issue: Generated type mismatch
    Schema: session.expiredAt (timestamp)
    Type: string
    Suggested: Date
    Fix: Regenerate types with updated config

🔴 TYPE CONFLICTS (1):
-----------------------
[1] packages/auth/src/types.ts:15
    Conflict: Duplicate User type definition
    Location: packages/api/src/types/user.ts:8
    Impact: Potential runtime errors
    Fix: Consolidate to single type definition

📋 RECOMMENDATIONS:
-------------------
1. Enable strict null checks in all packages
2. Add explicit return types to tRPC procedures
3. Consolidate duplicate type definitions
4. Use generated types from Drizzle schemas
5. Implement proper error type handling

⚡ OPTIMIZATION OPPORTUNITIES:
-----------------------------
- Replace 'any' types with proper interfaces (5 instances)
- Add generic constraints to improve type safety (3 locations)
- Use discriminated unions for better type narrowing (2 opportunities)
```

## Integration Points

This skill validates type consistency across:

### Database Layer
- Drizzle schema definitions
- Generated TypeScript types
- Database query result types
- Migration type safety

### API Layer
- tRPC router definitions
- Procedure input/output types
- Middleware context types
- Error handling types

### Authentication Layer
- User session types
- JWT token types
- Permission types
- Auth configuration types

### Frontend Layer
- Route parameter types
- Component prop types
- Hook return types
- Event handler types

## Type Safety Best Practices

### 1. Strict Configuration
- Enable strict mode in all tsconfig.json files
- Use noImplicitAny and strictNullChecks
- Configure proper path mapping for imports

### 2. Generated Types
- Prefer generated types over manual definitions
- Use Drizzle's $inferSelect and $inferInsert
- Keep types in sync with schemas

### 3. Explicit Annotations
- Add explicit return types to functions
- Use proper generic constraints
- Document complex type relationships

### 4. Type Validation
- Run type checking across all packages
- Validate tRPC client-server consistency
- Check component prop type coverage

This skill ensures the JavaScript application maintains complete type safety from database to frontend, preventing runtime errors and improving developer experience.