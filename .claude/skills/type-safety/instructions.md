# Type Safety Instructions

## When to Use This Skill

Use this skill when you need to:
- Perform comprehensive TypeScript type checking across packages
- Validate type consistency between database schemas and TypeScript types
- Check tRPC client-server type compatibility
- Analyze component prop types and frontend type safety
- Identify and fix type-related issues in the codebase

## How to Use

### Complete Type Analysis
```
Perform a comprehensive type safety analysis across all packages
```

### Database-Type Validation
```
Check that the TypeScript types match the Drizzle database schemas
```

### tRPC Type Consistency
```
Validate type consistency between tRPC router definitions and client usage
```

### Frontend Type Analysis
```
Analyze the TanStack Start application for type safety issues
```

## What the Skill Will Do

1. **Analyze Type Definitions**: Examine TypeScript types across all packages
2. **Validate Consistency**: Check type consistency between different layers
3. **Identify Issues**: Find type mismatches, missing types, and inference problems
4. **Provide Solutions**: Suggest specific fixes for type-related issues
5. **Generate Reports**: Create comprehensive type safety analyses

## Key Analysis Areas

### Cross-Package Type Safety
- Import/export type dependencies
- Interface consistency across packages
- Generic type parameter validation
- Type alias definitions and usage

### Database Type Integration
- Drizzle schema to type mapping
- Generated type correctness
- Column type consistency
- Relationship type validation

### API Type Safety
- tRPC procedure input/output types
- Router interface consistency
- Client-server type compatibility
- Error handling type safety

### Frontend Type Validation
- Component prop type definitions
- Hook return type consistency
- Route parameter types
- SSR/client type compatibility

## Output Expectations

The skill will provide:
- Detailed type mismatch reports with specific locations
- Recommendations for improving type safety
- Generated type definitions where appropriate
- Configuration suggestions for TypeScript compilers
- Best practice guidelines for type usage

## Type Safety Best Practices

1. **Enable Strict Mode**: Use strict TypeScript settings
2. **Prefer Generated Types**: Use types generated from schemas
3. **Explicit Annotations**: Add explicit types where inference is unclear
4. **Consistent Interfaces**: Maintain type consistency across packages
5. **Regular Validation**: Check type safety regularly during development

This skill helps maintain robust type safety across the entire JavaScript application stack, preventing runtime errors and improving code quality.