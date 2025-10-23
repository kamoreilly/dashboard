# API Package Command

## Command: /api

Package-specific command for oRPC/Hono router development, API management, and procedure optimization.

## Usage

### API Overview
```
/api
```
Show all available oRPC routers and procedures.

### Router Management
```
/api routes
```
List all available routes and their procedures.

```
/api validate
```
Validate API type safety and consistency.

```
/api docs
```
Generate API documentation.

### Performance Analysis
```
/api analyze
```
Analyze API performance and optimization opportunities.

```
/api test
```
Run API integration tests.

### Development Tools
```
/api create-router <name>
```
Create a new oRPC router scaffold.

```
/api create-procedure <router> <name>
```
Create a new procedure scaffold in specified router.

## Integration with Skills

This command integrates with:
- **API Engineer** agent for oRPC/Hono architecture
- **Type Safety** skill for API type validation
- **Documentation Generation** skill for API docs
- **Testing Strategy** skill for API testing

## Example Workflow

```bash
# Analyze current API structure
/api routes

# Validate type safety across APIs
/api validate

# Generate comprehensive documentation
/api docs

# Create new router for feature development
/api create-router notifications

# Create new procedure
/api create-procedure user getUserProfile
```