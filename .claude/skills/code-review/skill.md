---
name: code-review
description: Code review automation, quality standards enforcement, best practices validation, and collaborative review processes
version: "1.0.0"
category: quality
author: js-app-team
---

# Code Review Skill

Comprehensive code review automation and quality enforcement tool for maintaining high coding standards and best practices across the JavaScript monorepo.

## Features

### 🔍 **Automated Code Analysis**
- Static code analysis and quality assessment
- Code pattern recognition and best practices validation
- Security vulnerability detection and prevention
- Performance bottleneck identification and optimization suggestions

### 📝 **Review Process Automation**
- Automated review checklist generation
- Code quality scoring and metrics calculation
- Review assignment and collaboration facilitation
- Feedback aggregation and action item tracking

### 🛠️ **Standards Enforcement**
- Coding standards compliance validation
- TypeScript best practices enforcement
- React and tRPC pattern validation
- Documentation and commenting standards verification

### 👥 **Team Collaboration**
- Collaborative review workflow management
- Knowledge sharing and best practices dissemination
- Code review metrics and team performance tracking
- Mentorship and skill development facilitation

## Usage

### Automated Code Review
```
Perform a comprehensive code review of the recent changes in the user authentication feature
```

### Quality Standards Validation
```
Check the new API router for compliance with our coding standards and best practices
```

### Security Review
```
Review the database schema changes for security vulnerabilities and best practices compliance
```

### Performance Review
```
Analyze the React component for performance issues and optimization opportunities
```

## Code Review Framework

### 1. Automated Analysis Categories
```typescript
// Code Quality Analysis
interface CodeQualityMetrics {
  maintainability: {
    cyclomaticComplexity: number;
    cognitiveComplexity: number;
    linesOfCode: number;
    duplicateCode: number;
  };
  readability: {
    namingConventions: boolean;
    codeStructure: boolean;
    documentationCoverage: number;
    commentQuality: string;
  };
  testability: {
    testCoverage: number;
    testQuality: string;
    mockUsage: boolean;
    integrationTests: boolean;
  };
  performance: {
    algorithmComplexity: string;
    memoryUsage: string;
    bundleSize: number;
    renderingPerformance: string;
  };
}

// Security Analysis
interface SecurityAnalysis {
  vulnerabilities: {
    sqlInjection: boolean;
    xssPrevention: boolean;
    authenticationIssues: boolean;
    authorizationChecks: boolean;
    dataExposure: boolean;
  };
  bestPractices: {
    inputValidation: boolean;
    errorHandling: boolean;
    loggingSecurity: boolean;
    dependencySecurity: boolean;
  };
}
```

### 2. Review Checklists
```typescript
// TypeScript/JavaScript Review Checklist
const typescriptReviewChecklist = {
  types: {
    explicitTyping: 'All functions and variables have explicit types',
    interfaceDesign: 'Interfaces are well-designed and reusable',
    genericUsage: 'Generics are used appropriately for type safety',
    typeAssertions: 'Type assertions are minimized and safe'
  },
  codeStructure: {
    functionComplexity: 'Functions are small and focused (single responsibility)',
    classDesign: 'Classes follow SOLID principles',
    moduleOrganization: 'Modules are well-organized and cohesive',
    namingConventions: 'Consistent and descriptive naming'
  },
  performance: {
    memoryUsage: 'No memory leaks or excessive memory usage',
    algorithmEfficiency: 'Appropriate algorithms and data structures',
    asyncOperations: 'Proper async/await and error handling',
    bundleImpact: 'Minimal impact on bundle size'
  }
};

// React Review Checklist
const reactReviewChecklist = {
  components: {
    propInterface: 'Props are properly typed with interfaces',
    stateManagement: 'State is managed appropriately',
    lifecycleUsage: 'Hooks are used correctly instead of lifecycle methods',
    componentComposition: 'Components are composable and reusable'
  },
  performance: {
    memoization: 'React.memo, useMemo, useCallback used appropriately',
    rendering: 'No unnecessary re-renders',
    bundleSize: 'Code splitting and lazy loading implemented',
    imageOptimization: 'Images are optimized and lazy loaded'
  },
  accessibility: {
    semanticHtml: 'Semantic HTML elements are used',
    ariaAttributes: 'ARIA attributes are used correctly',
    keyboardNavigation: 'Keyboard navigation is supported',
    focusManagement: 'Focus is managed properly'
  }
};

// tRPC Review Checklist
const trpcReviewChecklist = {
  procedures: {
    inputValidation: 'Zod schemas are used for input validation',
    errorHandling: 'Appropriate TRPCError codes are used',
    typeSafety: 'End-to-end type safety is maintained',
    documentation: 'Procedures are well-documented'
  },
  security: {
    authentication: 'Protected procedures use authentication middleware',
    authorization: 'Authorization checks are implemented',
    inputSanitization: 'Inputs are properly sanitized',
    rateLimiting: 'Rate limiting is implemented where appropriate'
  }
};
```

### 3. Quality Scoring System
```typescript
// Quality Score Calculation
interface QualityScore {
  overall: number; // 0-100
  categories: {
    codeQuality: number;
    security: number;
    performance: number;
    maintainability: number;
    testability: number;
    documentation: number;
  };
  recommendations: string[];
  blockers: string[];
}

const calculateQualityScore = (analysis: CodeAnalysis): QualityScore => {
  const scores = {
    codeQuality: calculateCodeQualityScore(analysis.codeStructure),
    security: calculateSecurityScore(analysis.security),
    performance: calculatePerformanceScore(analysis.performance),
    maintainability: calculateMaintainabilityScore(analysis.maintainability),
    testability: calculateTestabilityScore(analysis.testing),
    documentation: calculateDocumentationScore(analysis.documentation)
  };

  const overall = Object.values(scores).reduce((a, b) => a + b, 0) / 6;

  return {
    overall: Math.round(overall),
    categories: scores,
    recommendations: generateRecommendations(analysis),
    blockers: identifyBlockers(analysis)
  };
};
```

## Example Code Review Output

```
🔍 CODE REVIEW ANALYSIS
=======================

📊 Overall Quality Score: 87/100
--------------------------------

### Quality Breakdown
- **Code Quality**: 92/100 ✅ Excellent
- **Security**: 85/100 ✅ Good
- **Performance**: 88/100 ✅ Good
- **Maintainability**: 90/100 ✅ Excellent
- **Testability**: 75/100 ⚠️ Needs Improvement
- **Documentation**: 82/100 ✅ Good

### 🔵 Database Engineer Review
**File**: packages/db/src/schema/user.ts
**Score**: 94/100 ✅ Excellent

#### ✅ Strengths
- Well-structured schema with proper relationships
- Excellent use of TypeScript types and constraints
- Proper indexing strategy for performance
- Clear field descriptions and validation

#### ⚠️ Suggestions
- Consider adding audit fields (created_at, updated_at) to all tables
- Add check constraints for email format validation
- Consider adding soft delete functionality for user records

#### 🔴 Blockers
None identified.

### 🟢 API Engineer Review
**File**: packages/api/src/routers/user.ts
**Score**: 89/100 ✅ Good

#### ✅ Strengths
- Excellent input validation with Zod schemas
- Proper error handling with TRPCError codes
- Good separation of concerns
- Type-safe implementation

#### ⚠️ Suggestions
- Add rate limiting to sensitive procedures
- Consider adding request logging for audit purposes
- Implement caching for frequently accessed data
- Add pagination to list procedures

#### 🔴 Blockers
None identified.

### 🟡 Security Engineer Review
**File**: packages/auth/src/index.ts
**Score**: 85/100 ✅ Good

#### ✅ Strengths
- Secure session configuration with HttpOnly cookies
- Proper CSRF protection implementation
- Good rate limiting configuration
- Secure password policies

#### ⚠️ Suggestions
- Implement account lockout after failed attempts
- Add email verification for new registrations
- Consider implementing two-factor authentication
- Add audit logging for security events

#### 🔴 Blockers
None identified.

### 🩵 Code Review Lead Review
**File**: apps/web/src/components/UserProfile.tsx
**Score**: 91/100 ✅ Excellent

#### ✅ Strengths
- Excellent component structure and TypeScript usage
- Proper use of React hooks and memoization
- Great accessibility implementation
- Comprehensive error handling

#### ⚠️ Suggestions
- Consider adding loading states for better UX
- Implement optimistic updates for better perceived performance
- Add error boundaries for better error handling
- Consider implementing form validation

#### 🔴 Blockers
None identified.

### 🧠 Cross-Cutting Concerns

#### Performance Analysis
- **Bundle Size**: Current bundle size is 245KB gzipped ✅ Good
- **Rendering Performance**: Components are well-optimized ✅ Good
- **Database Queries**: No N+1 queries detected ✅ Excellent
- **API Response Times**: All under 200ms ✅ Excellent

#### Security Assessment
- **Input Validation**: Comprehensive validation implemented ✅ Excellent
- **Authentication**: Proper authentication checks ✅ Good
- **Authorization**: Role-based access control implemented ✅ Good
- **Data Exposure**: No sensitive data exposed ✅ Excellent

#### Testing Coverage
- **Unit Tests**: 82% coverage ⚠️ Needs Improvement
- **Integration Tests**: 75% coverage ⚠️ Needs Improvement
- **E2E Tests**: Critical paths covered ✅ Good

### 📋 Action Items

#### High Priority
1. **Add Unit Tests** - Increase coverage to 90% for critical components
2. **Implement Account Lockout** - Add security feature to authentication system
3. **Add Rate Limiting** - Implement for API endpoints

#### Medium Priority
1. **Add Audit Logging** - Implement for security events
2. **Optimize Bundle Size** - Further reduce bundle size by 10%
3. **Add Loading States** - Improve user experience with loading indicators

#### Low Priority
1. **Add Error Boundaries** - Implement for better error handling
2. **Implement Caching** - Add caching for frequently accessed data
3. **Add Form Validation** - Implement client-side validation

### 📈 Quality Metrics

#### Code Quality Trends
- **Previous Score**: 85/100
- **Current Score**: 87/100
- **Improvement**: +2 points ✅ Positive trend

#### Team Performance
- **Review Participation**: 100% (all team members participated)
- **Review Turnaround**: Average 4 hours ⚡ Fast
- **Issue Resolution**: 95% resolved within 24 hours
- **Knowledge Sharing**: Excellent documentation and explanations

### 🎯 Recommendations

#### Process Improvements
1. **Automated Testing**: Implement automated test coverage reporting
2. **Security Scanning**: Add automated security vulnerability scanning
3. **Performance Monitoring**: Implement performance monitoring in CI/CD
4. **Documentation**: Add automated documentation generation

#### Skill Development
1. **Testing Best Practices**: Team training on advanced testing patterns
2. **Security Training**: Security best practices workshop
3. **Performance Optimization**: Performance optimization techniques training
4. **Code Review Skills**: Advanced code review techniques

This code review shows excellent overall quality with specific areas for improvement. The team is maintaining high standards while continuously improving the codebase.
```

## Integration with Team

This skill works seamlessly with:
- **Code Review Lead** agent for review process management and standards enforcement
- **Security Engineer** agent for security-focused reviews and vulnerability assessment
- **QA Engineer** agent for testing strategy and quality assurance
- **System Architect** agent for architectural consistency and design patterns

## Best Practices

1. **Constructive Feedback**: Provide specific, actionable feedback with clear explanations
2. **Security First**: Always prioritize security considerations in code reviews
3. **Performance Awareness**: Consider performance implications of code changes
4. **Knowledge Sharing**: Use code reviews as opportunities for knowledge transfer
5. **Continuous Improvement**: Regularly update review standards and checklists

This skill ensures that code reviews are thorough, consistent, and valuable for maintaining high code quality while fostering team collaboration and continuous learning.