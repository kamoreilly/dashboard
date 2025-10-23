<script lang="ts">
	import { orpc } from "$lib/orpc";
	import { createQuery } from "@tanstack/svelte-query";

	const statsQuery = createQuery(orpc.audits.getAuditStats.queryOptions());
	const auditsQuery = createQuery(() =>
		orpc.audits.getAudits.queryOptions({ limit: 100 })
	);
	const findingsQuery = createQuery(() =>
		orpc.findings.getFindings.queryOptions({ limit: 100 })
	);

	$: monthlyData = calculateMonthlyTrends($auditsQuery.data || []);
	$: riskDistribution = calculateRiskDistribution($findingsQuery.data || []);
	$: departmentPerformance = calculateDepartmentPerformance($auditsQuery.data || []);

	function calculateMonthlyTrends(audits: any[]) {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const currentYear = new Date().getFullYear();

		const monthlyData = months.map((month, index) => {
			const monthAudits = audits.filter(audit => {
				const auditDate = new Date(audit.createdAt);
				return auditDate.getMonth() === index && auditDate.getFullYear() === currentYear;
			});

			const completed = monthAudits.filter(a => a.status === "completed").length;
			const total = monthAudits.length;

			return {
				month,
				completed,
				total,
				completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
			};
		});

		return monthlyData.filter(month => month.total > 0);
	}

	function calculateRiskDistribution(findings: any[]) {
		const distribution = {
			critical: findings.filter(f => f.riskLevel === "critical").length,
			high: findings.filter(f => f.riskLevel === "high").length,
			medium: findings.filter(f => f.riskLevel === "medium").length,
			low: findings.filter(f => f.riskLevel === "low").length,
		};

		const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);

		return Object.entries(distribution).map(([risk, count]) => ({
			risk,
			count,
			percentage: total > 0 ? Math.round((count / total) * 100) : 0
		}));
	}

	function calculateDepartmentPerformance(audits: any[]) {
		const departments = [...new Set(audits.map(a => a.department).filter(Boolean))];

		return departments.map(dept => {
			const deptAudits = audits.filter(a => a.department === dept);
			const completed = deptAudits.filter(a => a.status === "completed").length;
			const overdue = deptAudits.filter(a => a.status === "overdue").length;
			const total = deptAudits.length;

			return {
				department: dept,
				total,
				completed,
				overdue,
				completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
			};
		}).sort((a, b) => b.completionRate - a.completionRate);
	}

	const exportReport = () => {
		const reportData = {
			generatedAt: new Date().toISOString(),
			statistics: $statsQuery.data,
			monthlyTrends: monthlyData,
			riskDistribution,
			departmentPerformance,
		};

		const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `audit-report-${new Date().toISOString().split("T")[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
</script>

<div class="space-y-8">
	<!-- Report Header -->
	<div class="flex justify-between items-center">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
			<p class="mt-2 text-gray-600">Comprehensive audit analysis and insights</p>
		</div>
		<div class="flex space-x-3">
			<button
				on:click={exportReport}
				class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
			>
				<span>📊</span> Export Report
			</button>
		</div>
	</div>

	<!-- Executive Summary -->
	<section class="bg-white rounded-lg shadow p-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Executive Summary</h3>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			<div class="text-center">
				<div class="text-3xl font-bold text-blue-600">{$statsQuery.data?.totalAudits || 0}</div>
				<div class="text-sm text-gray-600">Total Audits</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-green-600">{$statsQuery.data?.completionRate.toFixed(1) || 0}%</div>
				<div class="text-sm text-gray-600">Completion Rate</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-orange-600">{$statsQuery.data?.openFindings || 0}</div>
				<div class="text-sm text-gray-600">Open Findings</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold text-red-600">{$statsQuery.data?.criticalFindings || 0}</div>
				<div class="text-sm text-gray-600">Critical Issues</div>
			</div>
		</div>
	</section>

	<!-- Monthly Trends -->
	<section class="bg-white rounded-lg shadow p-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Audit Trends</h3>
		{#if monthlyData.length > 0}
			<div class="space-y-3">
				{#each monthlyData as month}
					<div>
						<div class="flex justify-between items-center mb-1">
							<span class="text-sm font-medium text-gray-700">{month.month}</span>
							<span class="text-sm text-gray-600">{month.completed}/{month.total} completed ({month.completionRate}%)</span>
						</div>
						<div class="w-full bg-gray-200 rounded-full h-2">
							<div
								class="bg-blue-600 h-2 rounded-full transition-all duration-500"
								style="width: {month.completionRate}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-gray-500 text-center py-8">No audit data available for the current year</p>
		{/if}
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Risk Distribution -->
		<section class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Finding Risk Distribution</h3>
			{#if riskDistribution.length > 0}
				<div class="space-y-3">
					{#each riskDistribution as risk}
						<div>
							<div class="flex justify-between items-center mb-1">
								<span class="text-sm font-medium text-gray-700 capitalize">{risk.risk}</span>
								<span class="text-sm text-gray-600">{risk.count} findings ({risk.percentage}%)</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-2">
								<div
									class="h-2 rounded-full transition-all duration-500"
									class:bg-red-500={risk.risk === "critical"}
									class:bg-orange-500={risk.risk === "high"}
									class:bg-yellow-500={risk.risk === "medium"}
									class:bg-green-500={risk.risk === "low"}
									style="width: {risk.percentage}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 text-center py-8">No findings data available</p>
			{/if}
		</section>

		<!-- Department Performance -->
		<section class="bg-white rounded-lg shadow p-6">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
			{#if departmentPerformance.length > 0}
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each departmentPerformance as dept}
								<tr>
									<td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
									<td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{dept.total}</td>
									<td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{dept.completed}</td>
									<td class="px-4 py-3 whitespace-nowrap text-sm text-red-600">{dept.overdue}</td>
									<td class="px-4 py-3 whitespace-nowrap text-sm">
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {dept.completionRate >= 80 ? 'bg-green-100 text-green-800' : dept.completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
											{dept.completionRate}%
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p class="text-gray-500 text-center py-8">No department data available</p>
			{/if}
		</section>
	</div>
</div>