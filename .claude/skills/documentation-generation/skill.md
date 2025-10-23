---
name: documentation-generation
description: Automated documentation generation for tRPC APIs, database schemas, authentication flows, and frontend components
version: "1.0.0"
category: documentation
author: js-auditor-team
---

# Documentation Generation Skill

Comprehensive automated documentation generation tool for the full-stack JavaScript application, covering APIs, database schemas, authentication flows, and components.

## Features

### 📚 **API Documentation**
- tRPC router and procedure documentation
- Input/output schema specifications
- Type examples and usage patterns
- API endpoint organization and categorization

### 🗄️ **Database Documentation**
- Drizzle schema documentation
- Table relationships and constraints
- Field descriptions and data types
- Migration history and change tracking

### 🔐 **Authentication Documentation**
- Better-Auth configuration documentation
- Authentication flow diagrams
- Session management documentation
- Security implementation details

### 🌐 **Frontend Documentation**
- Component API documentation
- Route documentation and examples
- Hook usage documentation
- Storybook-style component examples

## Usage

### Generate Complete API Documentation
```
Generate comprehensive documentation for all tRPC routers and procedures
```

### Create Database Schema Documentation
```
Document the database schemas, relationships, and field descriptions
```

### Document Authentication Flows
```
Create documentation for the authentication system, flows, and configuration
```

### Generate Component Documentation
```
Generate documentation for React components with examples and usage patterns
```

## Documentation Formats

### 1. API Documentation
```markdown
# API Documentation

## Users Router

### getUser
Retrieves a user by their ID.

**Input:**
```typescript
{
  id: string // User ID
}
```

**Output:**
```typescript
{
  id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
```

**Example Usage:**
```typescript
const { data } = api.getUser.useQuery({ id: "user-123" });
```
```

### 2. Database Schema Documentation
```markdown
# Database Schema Documentation

## Users Table

Stores user account information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique user identifier |
| name | TEXT | NOT NULL | User's display name |
| email | TEXT | NOT NULL, UNIQUE | User's email address |
| emailVerified | BOOLEAN | NOT NULL | Email verification status |
| createdAt | TIMESTAMP | NOT NULL | Account creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last update timestamp |

**Relationships:**
- One-to-many with `sessions` table
- One-to-many with `accounts` table
```

### 3. Component Documentation
```markdown
# UserProfile Component

Displays user profile information with editing capabilities.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| user | User | Yes | - | User data to display |
| editable | boolean | No | false | Whether profile can be edited |
| onUpdate | (user: Partial<User>) => void | No | - | Callback for user updates |

## Examples

### Basic Usage
```tsx
<UserProfile user={userData} />
```

### Editable Profile
```tsx
<UserProfile
  user={userData}
  editable
  onUpdate={handleUserUpdate}
/>
```
```

## Documentation Generation Process

### 1. Source Code Analysis
```typescript
// Analyze tRPC router structure
export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      // Implementation analyzed for documentation
    }),

  updateUser: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      email: z.string().email().optional()
    }))
    .mutation(({ input }) => {
      // Implementation analyzed for documentation
    })
});
```

### 2. Schema Extraction
```typescript
// Extract Drizzle schema information
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  // Schema analyzed for documentation generation
});
```

### 3. Component Analysis
```typescript
// Analyze React component structure
interface UserProfileProps {
  user: User;
  editable?: boolean;
  onUpdate?: (user: Partial<User>) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  editable = false,
  onUpdate
}) => {
  // Component analyzed for documentation
};
```

## Example Generated Documentation

```
📚 APPLICATION DOCUMENTATION
==========================

🚀 tRPC API Documentation
--------------------------

### Users Router (/api/users)
Procedures for user management and profile operations.

#### getUser
**Endpoint**: `api.getUser`
**Method**: Query
**Authentication**: Public

**Input Schema:**
```typescript
{
  id: string // User identifier (UUID format)
}
```

**Output Schema:**
```typescript
{
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

**Example Request:**
```typescript
const { data, error } = api.getUser.useQuery({
  id: "123e4567-e89b-12d3-a456-426614174000"
});
```

**Error Responses:**
- `NOT_FOUND`: User not found
- `BAD_REQUEST`: Invalid user ID format

---

🗄️ Database Schema Documentation
--------------------------------

### Users Table
User account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique user identifier (UUID) |
| name | TEXT | NOT NULL | User's display name |
| email | TEXT | NOT NULL, UNIQUE | User's email address |
| emailVerified | BOOLEAN | NOT NULL, DEFAULT false | Email verification status |
| image | TEXT | NULLABLE | Profile image URL |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT now() | Account creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL, DEFAULT now() | Last update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX (email)

**Relationships:**
- `sessions` (one-to-many) - User login sessions
- `accounts` (one-to-many) - External account links

---

🔐 Authentication Documentation
------------------------------

### Better-Auth Configuration
Authentication system using Better-Auth with email/password and OAuth providers.

**Features:**
- Email/password authentication
- Google OAuth integration
- Session-based authentication
- Email verification
- Password reset functionality

**Session Configuration:**
```typescript
session: {
  expiresIn: 60 * 15, // 15 minutes
  updateAge: 60 * 5,  // Update every 5 minutes
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60 // 5 minutes
  }
}
```

**Security Features:**
- CSRF protection enabled
- Secure cookie configuration
- Rate limiting on auth endpoints
- Account lockout after failed attempts

---

🌐 Frontend Documentation
--------------------------

### TanStack Start Routes

#### /dashboard
Main dashboard route with user data and analytics.

**Data Loading:**
```typescript
loader: async () => {
  const user = await api.getUserProfile.query();
  const analytics = await api.getAnalytics.query();
  return { user, analytics };
}
```

**Component:** `DashboardPage`
**Authentication Required:** Yes
**SEO Meta:** Title, description, og tags configured

#### /profile
User profile management page.

**Data Loading:**
```typescript
loader: async ({ params }) => {
  const profile = await api.getUserProfile.query({
    id: params.userId
  });
  return { profile };
}
```

**Component:** `ProfilePage`
**Authentication Required:** Yes
**Route Parameters:** `userId`

### Components

#### UserProfile
User profile display and editing component.

**Props:**
```typescript
interface UserProfileProps {
  user: User;
  editable?: boolean;
  onUpdate?: (updates: Partial<User>) => void;
  className?: string;
}
```

**Examples:**
```tsx
// Display only
<UserProfile user={userData} />

// Editable with updates
<UserProfile
  user={userData}
  editable
  onUpdate={handleUpdate}
/>
```

**Styling:** Uses TailwindCSS classes with responsive design
**Dependencies:** React, lucide-react icons
```

## Documentation Output Formats

- **Markdown**: Comprehensive documentation in MD format
- **JSON**: Structured API documentation for programmatic use
- **HTML**: Static documentation website
- **Storybook**: Component documentation with live examples

## Integration with Development Workflow

This skill integrates with:
- **tRPC Specialist** subagent for API documentation
- **Database Architect** subagent for schema documentation
- **Auth Expert** subagent for authentication documentation
- **Full-Stack Auditor** subagent for system-wide documentation

This skill ensures comprehensive, up-to-date documentation across all layers of the application, improving developer experience and knowledge sharing.