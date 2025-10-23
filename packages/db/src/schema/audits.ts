import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Audits table - main audit records
export const audits = sqliteTable("audits", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	description: text("description"),
	type: text("type").notNull(), // 'internal', 'external', 'compliance', 'security', etc.
	status: text("status").notNull().default("planned"), // 'planned', 'in_progress', 'completed', 'overdue', 'cancelled'
	priority: text("priority").notNull().default("medium"), // 'low', 'medium', 'high', 'critical'
	startDate: integer("start_date", { mode: "timestamp" }),
	endDate: integer("end_date", { mode: "timestamp" }),
	dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
	auditorId: text("auditor_id"), // reference to user/team
	department: text("department"),
	scope: text("scope"), // audit scope description
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit findings table
export const auditFindings = sqliteTable("audit_findings", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	auditId: integer("audit_id").notNull().references(() => audits.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	description: text("description").notNull(),
	riskLevel: text("risk_level").notNull().default("medium"), // 'low', 'medium', 'high', 'critical'
	category: text("category"), // 'control_deficiency', 'process_gap', 'violation', etc.
	status: text("status").notNull().default("open"), // 'open', 'in_progress', 'resolved', 'closed', 'accepted_risk'
	recommendation: text("recommendation"),
	assignedTo: text("assigned_to"), // who should fix this finding
	dueDate: integer("due_date", { mode: "timestamp" }),
	resolvedDate: integer("resolved_date", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit recommendations table
export const auditRecommendations = sqliteTable("audit_recommendations", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	findingId: integer("finding_id").notNull().references(() => auditFindings.id, { onDelete: "cascade" }),
	description: text("description").notNull(),
	priority: text("priority").notNull().default("medium"),
	status: text("status").notNull().default("pending"), // 'pending', 'in_progress', 'completed', 'rejected'
	assignedTo: text("assigned_to"),
	dueDate: integer("due_date", { mode: "timestamp" }),
	completedDate: integer("completed_date", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit evidence table
export const auditEvidence = sqliteTable("audit_evidence", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	auditId: integer("audit_id").notNull().references(() => audits.id, { onDelete: "cascade" }),
	findingId: integer("finding_id").references(() => auditFindings.id, { onDelete: "cascade" }),
	title: text("title").notNull(),
	description: text("description"),
	filePath: text("file_path"), // path to uploaded file
	fileType: text("file_type"), // 'document', 'screenshot', 'log', etc.
	status: text("status").notNull().default("submitted"), // 'submitted', 'reviewed', 'accepted', 'rejected'
	uploadedBy: text("uploaded_by"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit metrics table for tracking KPIs
export const auditMetrics = sqliteTable("audit_metrics", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	auditId: integer("audit_id").notNull().references(() => audits.id, { onDelete: "cascade" }),
	metricType: text("metric_type").notNull(), // 'completion_rate', 'finding_count', 'days_overdue', etc.
	value: real("value").notNull(),
	targetValue: real("target_value"),
	unit: text("unit"), // 'percentage', 'count', 'days', etc.
	recordedAt: integer("recorded_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Zod schemas for validation
export const insertAuditSchema = createInsertSchema(audits, {
	title: z.string().min(1, "Title is required"),
	type: z.enum(["internal", "external", "compliance", "security", "financial", "operational"]),
	status: z.enum(["planned", "in_progress", "completed", "overdue", "cancelled"]).default("planned"),
	priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const selectAuditSchema = createSelectSchema(audits);

export const insertFindingSchema = createInsertSchema(auditFindings, {
	title: z.string().min(1, "Finding title is required"),
	description: z.string().min(1, "Finding description is required"),
	riskLevel: z.enum(["low", "medium", "high", "critical"]).default("medium"),
	status: z.enum(["open", "in_progress", "resolved", "closed", "accepted_risk"]).default("open"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const selectFindingSchema = createSelectSchema(auditFindings);

export const insertRecommendationSchema = createInsertSchema(auditRecommendations, {
	description: z.string().min(1, "Recommendation description is required"),
	priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
	status: z.enum(["pending", "in_progress", "completed", "rejected"]).default("pending"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const selectRecommendationSchema = createSelectSchema(auditRecommendations);

export const insertEvidenceSchema = createInsertSchema(auditEvidence, {
	title: z.string().min(1, "Evidence title is required"),
	status: z.enum(["submitted", "reviewed", "accepted", "rejected"]).default("submitted"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const selectEvidenceSchema = createSelectSchema(auditEvidence);

export const insertMetricSchema = createInsertSchema(auditMetrics).omit({ id: true, recordedAt: true });
export const selectMetricSchema = createSelectSchema(auditMetrics);

// Type exports
export type Audit = typeof audits.$inferSelect;
export type NewAudit = typeof audits.$inferInsert;
export type Finding = typeof auditFindings.$inferSelect;
export type NewFinding = typeof auditFindings.$inferInsert;
export type Recommendation = typeof auditRecommendations.$inferSelect;
export type NewRecommendation = typeof auditRecommendations.$inferInsert;
export type Evidence = typeof auditEvidence.$inferSelect;
export type NewEvidence = typeof auditEvidence.$inferInsert;
export type Metric = typeof auditMetrics.$inferSelect;
export type NewMetric = typeof auditMetrics.$inferInsert;