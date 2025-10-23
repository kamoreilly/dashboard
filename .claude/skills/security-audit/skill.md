---
name: security-audit
description: Automated security vulnerability scanning and OWASP compliance checking for the JavaScript auditing application
version: "1.0.0"
category: security
author: js-auditor-team
---

# Security Audit Skill

Automated security analysis tool for the JavaScript auditing monorepo, focusing on OWASP compliance and vulnerability detection.

## Features

### 🔍 **tRPC Endpoint Security Analysis**
- Input validation completeness verification
- Authentication and authorization enforcement
- SQL injection vulnerability detection
- XSS protection validation
- Rate limiting implementation checks

### 🛡️ **Better-Auth Security Audit**
- Session configuration security review
- CSRF protection implementation verification
- Cookie security settings validation
- OAuth configuration security checks
- Password policy enforcement analysis

### 🗄️ **Database Security Assessment**
- Drizzle schema security review
- SQL injection vulnerability detection
- Database access pattern analysis
- Data encryption and storage security
- Audit trail implementation verification

### 🌐 **Frontend Security Review**
- TanStack Start SSR security analysis
- Client-side data exposure checks
- XSS vulnerability detection
- CSRF protection implementation
- Authentication token security review

## Usage

### Automatic Security Audit
```
Run a comprehensive security audit of the entire JavaScript auditing application
```

### Specific Package Audit
```
Audit the authentication package for security vulnerabilities
```

### Custom Security Check
```
Check for OWASP Top 10 vulnerabilities in the tRPC API endpoints
```

## Security Checks Performed

### Authentication & Authorization
- ✅ Proper session token handling
- ✅ CSRF protection implementation
- ✅ Secure cookie configuration
- ✅ Rate limiting on auth endpoints
- ✅ Password strength requirements
- ✅ Account lockout mechanisms

### Input Validation & Sanitization
- ✅ Zod schema validation completeness
- ✅ SQL injection prevention
- ✅ XSS protection measures
- ✅ File upload security
- ✅ API input sanitization

### Data Protection
- ✅ Encryption at rest and in transit
- ✅ Sensitive data exposure checks
- ✅ PII handling compliance
- ✅ Database access controls
- ✅ Audit trail implementation

### Configuration Security
- ✅ Environment variable security
- ✅ CORS configuration
- ✅ Security headers implementation
- ✅ HTTPS enforcement
- ✅ Trusted origins configuration

## Output Format

The security audit provides:

1. **Risk Assessment**: Critical, High, Medium, Low severity ratings
2. **Vulnerability Details**: Description, impact, and affected files
3. **Remediation Steps**: Specific actions to fix identified issues
4. **Compliance Score**: OWASP compliance percentage
5. **Security Checklist**: Verified security controls

## Integration

This skill integrates with:
- **Database Architect** subagent for schema security analysis
- **tRPC Specialist** subagent for API security review
- **Auth Expert** subagent for authentication security audit
- **Full-Stack Auditor** subagent for system-wide security analysis

## Example Output

```
🔍 SECURITY AUDIT REPORT
========================

🚨 CRITICAL VULNERABILITIES (2)
-----------------------------
[1] SQL Injection Risk - packages/api/src/routers/audit.ts:45
    Impact: Database compromise, data theft
    Fix: Implement proper input validation and parameterized queries

[2] Session Fixation - packages/auth/src/index.ts:23
    Impact: Account takeover, unauthorized access
    Fix: Regenerate session ID after login

⚠️  HIGH RISK (3)
-----------------
[1] Missing Rate Limiting - packages/api/src/routers/auth.ts:12
[2] Weak Password Policy - packages/auth/src/config.ts:8
[3] CORS Misconfiguration - apps/web/src/middleware.ts:15

✅ SECURITY COMPLIANCE: 72%
📊 OWASP TOP 10 COVERAGE: 8/10
```

## Best Practices Enforced

1. **Zero Trust Architecture**: Never trust user input
2. **Principle of Least Privilege**: Minimal permissions required
3. **Defense in Depth**: Multiple security layers
4. **Security by Default**: Secure configurations out of the box
5. **Continuous Monitoring**: Ongoing security assessment

This skill ensures the JavaScript auditing application maintains the highest security standards and compliance with industry best practices.