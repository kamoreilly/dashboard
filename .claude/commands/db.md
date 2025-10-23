# Database Package Command

## Command: /db

Package-specific command for database operations, schema management, and Drizzle ORM tasks.

## Usage

### Database Development
```
/db
```
Shows available database operations and current schema status.

### Schema Management
```
/db push
```
Push schema changes to the database.

```
/db generate
```
Generate migration files from schema changes.

```
/db migrate
```
Run pending migrations.

```
/db studio
```
Open Drizzle Studio for database management.

### Database Status
```
/db status
```
Show current database schema status and pending changes.

```
/db validate
```
Validate schema consistency and relationships.

## Integration with Skills

This command integrates with:
- **Database Architect** subagent for schema design
- **Schema Migration** skill for safe migrations
- **Type Safety** skill for schema-type validation

## Example Workflow

```bash
# Make schema changes in packages/db/src/schema/
# Generate migrations
/db generate

# Review and validate migrations
/db validate

# Apply changes to development database
/db push

# Open studio to verify changes
/db studio
```