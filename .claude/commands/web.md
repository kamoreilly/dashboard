# Web Application Command

## Command: /web

Package-specific command for SvelteKit application development, route management, and frontend optimization.

## Usage

### Application Overview
```
/web
```
Show application structure, routes, and development status.

### Route Management
```
/web routes
```
List all SvelteKit routes and their configurations.

```
/web create-route <path>
```
Create a new route scaffold.

```
/web validate-routes
```
Validate route configurations and type safety.

### Performance Optimization
```
/web analyze
```
Analyze frontend performance and bundle optimization.

```
/web optimize
```
Apply frontend performance optimizations.

### Development Tools
```
/web dev-setup
```
Set up development environment for web application.

```
/web build-check
```
Validate build configuration and dependencies.

## Integration with Skills

This command integrates with:
- **UI/UX Architect** agent for application architecture
- **Performance Optimization** skill for frontend performance
- **Type Safety** skill for frontend type validation
- **Documentation Generation** skill for component docs

## Example Workflow

```bash
# Analyze current application structure
/web routes

# Create new route for feature development
/web create-route /dashboard/analytics

# Validate route configurations
/web validate-routes

# Analyze performance
/web analyze

# Apply optimizations
/web optimize
```