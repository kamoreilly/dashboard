# Pre-Push Hook

## Purpose
Comprehensive checks before pushing code to remote repository to ensure quality and compatibility.

## Checks Performed

### 1. Full Test Suite
```bash
bun test
```
Runs the complete test suite across all packages with coverage reporting.

### 2. Build Validation
```bash
bun build
```
Ensures the application builds successfully across all packages.

### 3. Performance Check
```bash
bun perf:check
```
Analyzes bundle sizes and performance metrics.

### 4. Integration Tests
```bash
bun test:integration
```
Runs integration tests for cross-package functionality.

### 5. Documentation Generation
```bash
bun docs:generate
```
Generates and validates documentation coverage.

## Integration with Agents and Skills

This hook integrates with:
- **Testing Strategy** skill for comprehensive test execution
- **Performance Optimization** skill for performance validation
- **Documentation Generation** skill for documentation coverage
- **Full-Stack Architect** subagent for system integration validation

## Configuration

Add to `.git/hooks/pre-push` or use Husky:

```bash
#!/bin/sh
# Pre-push hook for comprehensive quality checks

echo "🚀 Running pre-push checks..."

# Test suite
echo "🧪 Running test suite..."
if ! bun test; then
  echo "❌ Tests failed. Please fix failing tests before pushing."
  exit 1
fi

# Build validation
echo "🔨 Validating build..."
if ! bun build; then
  echo "❌ Build failed. Please fix build errors before pushing."
  exit 1
fi

# Performance check
echo "⚡ Checking performance..."
if ! bun perf:check; then
  echo "❌ Performance check failed. Please address performance issues before pushing."
  exit 1
fi

# Integration tests
echo "🔗 Running integration tests..."
if ! bun test:integration; then
  echo "❌ Integration tests failed. Please fix integration issues before pushing."
  exit 1
fi

# Documentation
echo "📚 Validating documentation..."
if ! bun docs:generate; then
  echo "❌ Documentation generation failed. Please update documentation before pushing."
  exit 1
fi

echo "✅ All pre-push checks passed! Ready to push."
```

## Performance Thresholds

Configure performance thresholds in `package.json`:

```json
{
  "performanceThresholds": {
    "maxBundleSize": "250KB",
    "maxLoadTime": "3s",
    "minLighthouseScore": 90
  }
}
```

## Coverage Requirements

Set minimum coverage requirements:

```json
{
  "coverageThresholds": {
    "global": {
      "branches": 80,
      "functions": 85,
      "lines": 85,
      "statements": 85
    }
  }
}
```