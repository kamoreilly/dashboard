---
name: documentation-research
description: Research official documentation APIs for best practices and implementation patterns before coding
version: "1.0.0"
category: development
author: js-app-team
---

# Documentation Research Skill

Comprehensive documentation research tool for finding official best practices, implementation patterns, and up-to-date API references before writing code.

## Features

### 📚 **Official Documentation Lookup**
- Search official docs for tRPC, Drizzle, Better-Auth, TanStack Start, React
- Find latest API references and best practices
- Identify deprecated patterns and current recommendations
- Extract code examples and implementation patterns

### 🔍 **Best Practices Research**
- Research current industry standards and security guidelines
- Find performance optimization techniques
- Identify common pitfalls and anti-patterns
- Discover testing strategies and validation approaches

### 📋 **Implementation Validation**
- Cross-reference multiple official sources
- Verify code patterns against official examples
- Ensure compliance with framework-specific guidelines
- Validate security implementations against standards

### 🚀 **Version-Specific Guidance**
- Research version-specific features and changes
- Ensure compatibility with current project versions
- Find migration guides for version upgrades
- Identify breaking changes and migration paths

## Usage

### Documentation Research
```
Research the official Better-Auth documentation for implementing secure session management with HttpOnly cookies
```

### Best Practices Lookup
```
Find the current best practices for tRPC error handling and input validation patterns
```

### API Reference Search
```
Look up the Drizzle ORM documentation for creating indexes and optimizing SQLite queries
```

### Security Standards Research
```
Research OWASP guidelines and current security standards for authentication systems
```

## Documentation Research Process

### 1. Source Identification
```typescript
// Primary Documentation Sources
const officialDocs = {
  tRPC: 'https://trpc.io/docs',
  Drizzle: 'https://orm.drizzle.team/docs',
  BetterAuth: 'https://better-auth.com/docs',
  TanStack: 'https://tanstack.com/start/latest',
  React: 'https://react.dev',
  NextAuth: 'https://next-auth.js.org'
};

// Security Standards
const securityStandards = {
  OWASP: 'https://owasp.org/',
  CWE: 'https://cwe.mitre.org/',
  NIST: 'https://csrc.nist.gov/'
};
```

### 2. Information Extraction
```typescript
// Research Process
const researchProcess = {
  identifyOfficialSources: ['docs', 'api', 'examples', 'guides'],
  extractPatterns: ['code examples', 'configuration', 'best practices'],
  validateCurrent: ['version compatibility', 'security updates'],
  crossReference: ['multiple sources', 'community discussions']
};
```

### 3. Implementation Validation
```typescript
// Validation Criteria
const validationCriteria = {
  officialExamples: 'Matches official documentation patterns',
  securityStandards: 'Follows current security guidelines',
  performanceOptimized: 'Uses recommended performance patterns',
  versionCompatible: 'Compatible with project dependencies',
  testedApproaches: 'Well-documented and community tested'
};
```

## Available Documentation Sources

### **Framework Documentation**
- **tRPC**: Official documentation, examples, and migration guides
- **Drizzle ORM**: Schema definitions, queries, migrations, and optimization
- **Better-Auth**: Authentication strategies, configuration, and security
- **TanStack Start**: SSR patterns, routing, and meta optimization
- **React**: Component patterns, hooks, and performance

### **Security Standards**
- **OWASP**: Application security verification standard
- **CWE**: Common weakness enumeration and mitigation
- **NIST**: Security controls and compliance frameworks

### **Community Resources**
- **GitHub**: Repository documentation and issues
- **Stack Overflow**: Community solutions and discussions
- **Dev.to**: Implementation tutorials and patterns

## Example Research Output

```
📚 DOCUMENTATION RESEARCH SESSION
===============================

🎯 Query: Better-Auth secure session management

🔍 Official Sources Found:
- Better-Auth Session Management Guide
- HttpOnly Cookie Configuration Documentation
- Session Security Best Practices

📊 Key Findings:
✅ HttpOnly, Secure, SameSite=Strict cookies recommended
✅ Session rotation for enhanced security
✅ Configurable session expiration options
⚠️ Custom session stores for production scaling

🔧 Implementation Pattern:
```typescript
const authConfig = {
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60,     // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60            // 5 minutes
    }
  }
};
```

⚡ Security Recommendations:
- Use short-lived access tokens with refresh rotation
- Implement CSRF protection for state changes
- Consider session analytics for anomaly detection
- Rate limiting on authentication endpoints

📋 Next Steps:
1. Configure cookie settings per official docs
2. Implement session rotation mechanism
3. Add CSRF protection middleware
4. Set up monitoring for session security
```

## Integration with Team

This skill works seamlessly with:
- **All Implementation Agents** for research before coding
- **Security Engineer** for security standards research
- **Code Review Lead** for validation against official patterns
- **QA Engineer** for testing methodology research

## Best Practices

1. **Always Research First**: Never implement without checking official documentation
2. **Current Versions**: Ensure patterns match current framework versions
3. **Security Focus**: Prioritize security best practices and guidelines
4. **Multiple Sources**: Cross-reference multiple official sources
5. **Practical Application**: Focus on implementable patterns and examples

This skill ensures that all implementations follow official best practices, maintain security standards, and use current, recommended patterns for optimal performance and maintainability.