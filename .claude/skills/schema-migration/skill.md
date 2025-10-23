---
name: schema-migration
description: Drizzle ORM migration generation, validation, and database change management for the TypeScript dashboard application
version: "1.0.0"
category: database
author: dashboard-dev-team
---

# Schema Migration Skill

Automated Drizzle migration management tool for safe database schema evolution in the TypeScript dashboard application.

## Features

### 🔄 **Migration Generation**
- Automatic Drizzle migration generation from schema changes
- SQL preview and validation before execution
- Dependency analysis for safe migration ordering
- Rollback strategy generation for all migrations

### 🗄️ **Schema Change Analysis**
- Impact assessment of proposed schema changes
- Breaking change detection and warnings
- Foreign key constraint validation
- Index performance analysis for new schemas

### ⚡ **Migration Optimization**
- Database-specific optimization for SQLite/Turso
- Performance impact analysis for large migrations
- Zero-downtime migration strategies when possible
- Transaction safety and rollback planning

### 🛡️ **Safety & Validation**
- Pre-migration data integrity checks
- Post-migration validation and verification
- Backup strategy recommendations
- Production deployment safety checks

## Usage

### Generate Migrations
```
Generate Drizzle migrations for the schema changes in packages/db/src/schema/
```

### Validate Migration Safety
```
Analyze the proposed database schema changes for potential breaking changes and data loss risks
```

### Create Rollback Plan
```
Create a rollback plan for the latest database migration including data restoration procedures
```

### Optimize Migration Performance
```
Optimize the database migration for production deployment with minimal downtime
```

## Migration Workflow

### 1. Schema Analysis
```
Examine current database schema and identify changes:
- New tables and columns
- Modified constraints and indexes
- Data type changes
- Relationship updates
```

### 2. Impact Assessment
```
Analyze impact of schema changes:
- Data migration requirements
- Application compatibility
- Performance implications
- Backup requirements
```

### 3. Migration Generation
```
Generate safe migration scripts:
- Forward migration SQL
- Rollback migration SQL
- Data validation queries
- Performance optimization hints
```

### 4. Validation & Testing
```
Validate migration safety:
- Test on staging database
- Verify data integrity
- Check application compatibility
- Performance benchmarking
```

## Migration Categories

### 🟢 **Safe Migrations**
- Adding new tables or columns
- Creating new indexes
- Adding nullable columns
- Creating new constraints

### 🟡 **Careful Migrations**
- Adding non-nullable columns with defaults
- Modifying column types (compatible changes)
- Adding foreign key constraints
- Creating unique constraints

### 🔴 **High-Risk Migrations**
- Dropping tables or columns
- Modifying primary keys
- Changing foreign key relationships
- Large data type conversions

## Example Output

```
🔄 MIGRATION ANALYSIS REPORT
============================

📊 Schema Changes Detected:
---------------------------
[+] New table: audit_log (packages/db/src/schema/audit.ts)
[*] Modified table: user - added 'role' column
[+] New index: idx_user_email on user.email

⚠️  IMPACT ASSESSMENT:
---------------------
🟢 Safe Changes: 2 (New tables, nullable columns)
🟡 Careful Changes: 1 (New index - may affect write performance)
🔴 Breaking Changes: 0

🛡️  MIGRATION PLAN:
-------------------
Step 1: Create audit_log table
Step 2: Add 'role' column to user table (nullable)
Step 3: Create idx_user_email index
Step 4: Validate data integrity

📋 ROLLBACK STRATEGY:
---------------------
1. Drop idx_user_email index
2. Drop 'role' column from user table
3. Drop audit_log table

⏱️  Estimated Downtime: < 30 seconds
📊 Data Migration Required: No
```

## Integration with Subagents

This skill works seamlessly with:
- **Database Engineer** agent for schema design validation
- **System Architect** agent for impact analysis
- **API Engineer** agent for API compatibility checks

## Safety Features

### Pre-Migration Checks
- Database backup verification
- Sufficient disk space validation
- Connection pool capacity check
- Application compatibility test

### Post-Migration Validation
- Row count verification
- Data integrity checks
- Performance benchmark comparison
- Application functionality test

### Rollback Capabilities
- Automatic rollback script generation
- Data restoration procedures
- Configuration rollback steps
- Emergency response protocols

## Best Practices Enforced

1. **Incremental Changes**: Break large migrations into smaller, safer steps
2. **Backward Compatibility**: Maintain application compatibility during transitions
3. **Data Integrity**: Never risk data loss; always have rollback options
4. **Performance Awareness**: Consider impact on database performance
5. **Testing First**: Always validate migrations in non-production environments

This skill ensures safe, reliable database schema evolution for the TypeScript dashboard application while maintaining data integrity and application availability.