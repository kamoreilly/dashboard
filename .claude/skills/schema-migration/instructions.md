# Schema Migration Instructions

## When to Use This Skill

Use this skill when you need to:
- Generate Drizzle migrations for schema changes
- Validate the safety of database schema modifications
- Plan database deployments for production environments
- Analyze the impact of schema changes on the application
- Create rollback strategies for database migrations

## How to Use

### Simple Migration Generation
```
Generate migrations for the database schema changes
```

### Comprehensive Migration Planning
```
Create a complete migration plan for the new audit log table including rollback strategy and deployment safety checks
```

### Impact Analysis
```
Analyze how the proposed user table changes will affect the tRPC API and frontend application
```

### Production Migration Strategy
```
Plan a production-safe migration for adding indexes to the user table with minimal downtime
```

## What the Skill Will Do

1. **Analyze Schema Changes**: Compare current and proposed database schemas
2. **Generate Migration Scripts**: Create safe SQL migration and rollback scripts
3. **Assess Impact**: Evaluate effects on application performance and compatibility
4. **Validate Safety**: Check for potential data loss or breaking changes
5. **Create Deployment Plan**: Provide step-by-step migration procedures

## Key Analysis Areas

### Schema Compatibility
- Data type changes and conversions
- Constraint modifications and additions
- Table and column additions/removals
- Index creation and optimization
- Foreign key relationship changes

### Application Impact
- tRPC procedure compatibility
- Authentication system integration
- Frontend data handling requirements
- API response structure changes
- Session and user data implications

### Performance Considerations
- Query performance impact
- Index optimization opportunities
- Migration execution time estimates
- Database load during migration
- Post-migration performance benchmarks

### Safety & Validation
- Data integrity preservation
- Rollback capability verification
- Backup requirement assessment
- Testing strategy recommendations
- Production deployment safety

## Output Expectations

The skill will provide:
- Detailed migration scripts with SQL commands
- Impact analysis with risk assessments
- Step-by-step deployment procedures
- Comprehensive rollback strategies
- Performance optimization recommendations
- Safety checklists and validation procedures

## Before Running Migrations

Always ensure:
- [ ] Database backup is created and verified
- [ ] Migration is tested in staging environment
- [ ] Application compatibility is validated
- [ ] Rollback strategy is documented and tested
- [ ] Production deployment window is scheduled
- [ ] Monitoring and alerting are configured

## Migration Safety Checklist

### Pre-Migration
- Database backup integrity verified
- Sufficient maintenance window allocated
- Application compatibility tested
- Rollback procedures documented
- Team notification complete

### Post-Migration
- Data integrity validation passed
- Application functionality verified
- Performance benchmarks met
- Error rates within acceptable range
- Monitoring systems operational

This skill ensures safe, reliable database schema evolution while maintaining application stability and data integrity.