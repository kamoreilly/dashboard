<script lang="ts">
import { orpc } from "$lib/orpc";
import { createQuery } from "@tanstack/svelte-query";
import StatsCards from "$lib/components/StatsCards.svelte";
import AuditList from "$lib/components/AuditList.svelte";
import AuditChart from "$lib/components/AuditChart.svelte";
import RecentFindings from "$lib/components/RecentFindings.svelte";

const statsQuery = createQuery(orpc.audits.getAuditStats.queryOptions());
const recentAuditsQuery = createQuery(() =>
	orpc.audits.getAudits.queryOptions({ limit: 10 })
);
const recentFindingsQuery = createQuery(() =>
	orpc.findings.getFindings.queryOptions({
		status: "open",
		limit: 5
	})
);
</script>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="flex justify-between items-center">
		<div>
			<h2 class="text-3xl font-bold text-gray-900">Audit Dashboard</h2>
			<p class="mt-2 text-gray-600">Monitor and manage your IT audits and findings</p>
		</div>
		<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
			New Audit
		</button>
	</div>

	<!-- Statistics Cards -->
	<section>
		<StatsCards stats={$statsQuery.data} isLoading={$statsQuery.isLoading} />
	</section>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Audit List (2/3 width) -->
		<div class="lg:col-span-2 space-y-6">
			<AuditList
				audits={$recentAuditsQuery.data || []}
				isLoading={$recentAuditsQuery.isLoading}
			/>
		</div>

		<!-- Sidebar Charts & Findings (1/3 width) -->
		<div class="space-y-6">
			<!-- Audit Status Chart -->
			<AuditChart stats={$statsQuery.data} />

			<!-- Recent Findings -->
			<RecentFindings
				findings={$recentFindingsQuery.data || []}
				isLoading={$recentFindingsQuery.isLoading}
			/>
		</div>
	</div>
</div>