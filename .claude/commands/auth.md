# Authentication Package Command

## Command: /auth

Package-specific command for authentication configuration, Better-Auth setup, and security management.

## Usage

### Authentication Overview
```
/auth
```
Show authentication configuration status and available features.

### Configuration Management
```
/auth config
```
Display current Better-Auth configuration.

```
/auth providers
```
Show configured OAuth providers and their status.

```
/auth sessions
```
Display session configuration and management settings.

### Security Setup
```
/auth security
```
Review security settings and compliance.

```
/auth validate
```
Validate authentication configuration and security measures.

### Development Tools
```
/auth test-user
```
Create or update test user for development.

```
/auth reset-dev
```
Reset development authentication data.

## Integration with Skills

This command integrates with:
- **Auth Expert** subagent for security configuration
- **Security Audit** skill for vulnerability assessment
- **Testing Strategy** skill for authentication testing

## Example Workflow

```bash
# Review current authentication setup
/auth config

# Validate security configuration
/auth security

# Create development test user
/auth test-user

# Test authentication flows
npm run dev
# Then use /auth validate to verify configuration
```