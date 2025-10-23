import { publicProcedure } from "../index";
import type { RouterClient } from "@orpc/server";
import { auditRouter, findingsRouter, recommendationsRouter, evidenceRouter } from "./audits";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	// Audit management endpoints
	audits: auditRouter,
	findings: findingsRouter,
	recommendations: recommendationsRouter,
	evidence: evidenceRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
