# Pre-Commit Hook

## Purpose
Automated quality checks before committing code to ensure consistency and catch issues early.

## Checks Performed

### 1. Type Safety Check
```bash
bun check-types
```
Runs TypeScript compilation across all packages to ensure type safety.

### 2. Linting
```bash
bun lint
```
Checks code style and formatting consistency across packages.

### 3. Database Schema Validation
```bash
cd packages/db && bun db:validate
```
Validates Drizzle schema consistency and relationships.

### 4. tRPC Type Validation
```bash
cd packages/api && bun validate-types
```
Ensures tRPC router and client type consistency.

### 5. Security Scan
```bash
bun security:scan
```
Runs basic security checks on modified files.

## Integration with Agents and Skills

This hook integrates with:
- **Type Safety** skill for comprehensive type checking
- **Database Architect** subagent for schema validation
- **tRPC Specialist** subagent for API type consistency
- **Security Audit** skill for vulnerability scanning

## Configuration

Add to `.git/hooks/pre-commit` or use Husky for automated setup:

```bash
#!/bin/sh
# Pre-commit hook for quality checks

echo "🔍 Running pre-commit checks..."

# Type safety check
echo "📋 Checking TypeScript types..."
if ! bun check-types; then
  echo "❌ Type checking failed. Please fix type errors before committing."
  exit 1
fi

# Linting
echo "🧹 Running linter..."
if ! bun lint; then
  echo "❌ Linting failed. Please fix linting errors before committing."
  exit 1
fi

# Database validation
echo "🗄️ Validating database schema..."
if ! cd packages/db && bun db:validate; then
  echo "❌ Database validation failed. Please fix schema issues before committing."
  exit 1
fi

# tRPC validation
echo "🚀 Validating tRPC types..."
if ! cd packages/api && bun validate-types; then
  echo "❌ tRPC validation failed. Please fix API type issues before committing."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
```

## Bypassing Checks

In emergency situations, you can bypass with:
```bash
git commit --no-verify
```

Use sparingly and ensure quality issues are addressed promptly.