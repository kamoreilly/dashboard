---
name: testing-strategy
description: Comprehensive testing strategy for tRPC procedures, authentication flows, database operations, and React components
version: "1.0.0"
category: testing
author: js-auditor-team
---

# Testing Strategy Skill

Comprehensive testing framework and strategy tool for the full-stack JavaScript application, covering unit tests, integration tests, and end-to-end testing.

## Features

### 🧪 **tRPC Testing**
- Unit test generation for tRPC procedures
- Integration testing for tRPC routers
- Authentication middleware testing
- Error handling and validation testing

### 🔐 **Authentication Testing**
- Better-Auth configuration testing
- Session management testing
- OAuth provider integration testing
- Security flow testing and validation

### 🗄️ **Database Testing**
- Drizzle schema validation testing
- Database operation testing
- Migration testing and rollback verification
- Data integrity and constraint testing

### 🌐 **Frontend Testing**
- React component unit testing
- TanStack Start route testing
- Hook testing with React Query
- User interaction and integration testing

## Usage

### Generate tRPC Procedure Tests
```
Generate comprehensive unit tests for all tRPC procedures with authentication and validation testing
```

### Create Authentication Test Suite
```
Create tests for authentication flows including login, registration, and session management
```

### Database Testing Strategy
```
Generate tests for database operations, schema validation, and migration testing
```

### Frontend Component Tests
```
Create unit and integration tests for React components with user interaction scenarios
```

## Testing Framework Structure

### 1. tRPC Procedure Testing
```typescript
// Example test structure
describe('User Router', () => {
  describe('getUser', () => {
    it('should return user data for valid ID', async () => {
      const result = await caller.getUser({ id: 'test-user-id' });
      expect(result).toHaveProperty('id', 'test-user-id');
      expect(result).toHaveProperty('email');
    });

    it('should throw NOT_FOUND for non-existent user', async () => {
      await expect(
        caller.getUser({ id: 'non-existent-id' })
      ).rejects.toThrow(TRPCError);
    });
  });
});
```

### 2. Authentication Testing
```typescript
describe('Authentication', () => {
  describe('Login Flow', () => {
    it('should authenticate user with valid credentials', async () => {
      const result = await authClient.signIn.email({
        email: 'test@example.com',
        password: 'valid-password'
      });
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('session');
    });

    it('should reject invalid credentials', async () => {
      const result = await authClient.signIn.email({
        email: 'test@example.com',
        password: 'invalid-password'
      });
      expect(result.error).toBeDefined();
    });
  });
});
```

### 3. Database Testing
```typescript
describe('Database Operations', () => {
  describe('User Creation', () => {
    it('should create user with valid data', async () => {
      const userData = {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com'
      };

      const createdUser = await db.insert(user).values(userData).returning();
      expect(createdUser[0]).toMatchObject(userData);
    });

    it('should enforce unique email constraint', async () => {
      await expect(
        db.insert(user).values({
          id: 'another-user',
          name: 'Another User',
          email: 'test@example.com' // Duplicate email
        })
      ).rejects.toThrow();
    });
  });
});
```

### 4. Component Testing
```typescript
describe('UserProfile Component', () => {
  it('should display user information correctly', () => {
    const mockUser = {
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com'
    };

    render(<UserProfile user={mockUser} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should enable editing when editable prop is true', () => {
    const mockUser = {
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com'
    };

    render(<UserProfile user={mockUser} editable />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });
});
```

## Test Categories

### 🟢 **Unit Tests**
- Individual function testing
- Component isolation testing
- Utility function testing
- Input validation testing

### 🟡 **Integration Tests**
- Database operation testing
- tRPC procedure integration
- Authentication flow testing
- API endpoint testing

### 🔴 **End-to-End Tests**
- User journey testing
- Cross-package integration
- Full workflow testing
- Performance and load testing

## Example Test Output

```
🧪 TESTING STRATEGY REPORT
==========================

📊 Test Coverage Analysis:
---------------------------
- Overall Coverage: 87.3%
- packages/api: 92.1%
- packages/auth: 89.5%
- packages/db: 85.2%
- apps/web: 83.8%

🧪 Generated Test Suites:

### 1. tRPC Procedure Tests (15 tests)
✅ User Router Tests
- getUser: 3 test cases
- updateUser: 4 test cases
- deleteUser: 2 test cases
- getUserProfile: 3 test cases
- searchUsers: 3 test cases

✅ Auth Router Tests
- signIn: 4 test cases
- signUp: 3 test cases
- signOut: 2 test cases
- resetPassword: 3 test cases

### 2. Authentication Flow Tests (12 tests)
✅ Session Management
- Login with email/password: 3 test cases
- OAuth login flows: 4 test cases
- Session validation: 3 test cases
- Token refresh: 2 test cases

✅ Security Testing
- CSRF protection: 2 test cases
- Rate limiting: 2 test cases
- Account lockout: 2 test cases
- Password validation: 2 test cases

### 3. Database Tests (18 tests)
✅ Schema Validation
- User table constraints: 4 test cases
- Session table relationships: 3 test cases
- Account table validation: 3 test cases
- Migration testing: 4 test cases

✅ Data Operations
- CRUD operations: 6 test cases
- Transaction handling: 2 test cases
- Index performance: 2 test cases

### 4. Component Tests (24 tests)
✅ React Components
- UserProfile: 6 test cases
- LoginForm: 5 test cases
- Dashboard: 4 test cases
- Navigation: 3 test cases

✅ Hooks Integration
- useAuth: 4 test cases
- useUserData: 3 test cases
- useRouter: 2 test cases

🔧 Test Configuration:
----------------------
**Testing Framework:** Vitest + React Testing Library
**Database Testing:** SQLite in-memory database
**Authentication Testing:** Mock auth providers
**API Testing:** tRPC test utilities
**Component Testing:** React Testing Library

📋 Recommended Test Commands:
---------------------------
```bash
# Run all tests
bun test

# Run tests with coverage
bun test --coverage

# Run tests for specific package
bun test packages/api

# Run tests in watch mode
bun test --watch

# Run integration tests
bun test --mode integration

# Run E2E tests
bun test:e2e
```

🎯 Priority Test Areas:
---------------------
🔴 Critical (Must Have):
- Authentication flow testing
- Database constraint validation
- Input validation in tRPC procedures
- Session management testing

🟡 Important (Should Have):
- Component user interaction testing
- Error handling validation
- Database migration testing
- API error response testing

✅ Nice to Have:
- Performance testing
- Load testing
- Accessibility testing
- Visual regression testing

📊 Test Data Management:
----------------------
**Fixtures:** Located in `tests/fixtures/`
- User data templates
- Authentication scenarios
- Database seed data
- Mock API responses

**Test Utilities:** Located in `tests/utils/`
- Database test helpers
- Authentication test helpers
- tRPC test utilities
- Component test helpers

🚀 Continuous Integration:
-------------------------
**GitHub Actions:**
- Automated test execution on PR
- Coverage reporting
- Test result visualization
- Performance regression detection

**Quality Gates:**
- Minimum 80% test coverage required
- All critical tests must pass
- No new test failures allowed
- Performance degradation alerts
```

## Testing Tools & Libraries

### Core Testing Stack
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **tRPC Testing**: tRPC procedure testing utilities
- **Better-Auth Testing**: Authentication testing helpers

### Database Testing
- **SQLite in-memory**: Isolated test database
- **Drizzle Test Kit**: Database testing utilities
- **Database Fixtures**: Test data management

### E2E Testing
- **Playwright**: End-to-end testing framework
- **Test Scenarios**: User journey testing
- **Performance Monitoring**: Load and timing analysis

## Best Practices

### 1. Test Organization
- Group tests by functionality and packages
- Use descriptive test names and contexts
- Separate unit, integration, and E2E tests
- Maintain clear test data management

### 2. Test Quality
- Focus on behavior, not implementation details
- Test user interactions and scenarios
- Validate error conditions and edge cases
- Maintain test independence and isolation

### 3. Coverage Goals
- Aim for high coverage in critical paths
- Focus on business logic and user flows
- Test authentication and security features
- Cover database operations and constraints

This skill ensures comprehensive testing coverage across all application layers, providing confidence in code quality and system reliability.