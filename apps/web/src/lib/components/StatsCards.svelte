<script lang="ts">
	export let stats: any;
	export let isLoading: boolean = false;

	const cards = [
		{
			title: "Total Audits",
			value: stats?.totalAudits || 0,
			change: stats?.totalAudits > 0 ? "+12%" : "0%",
			changeType: "positive" as const,
			icon: "📋",
		},
		{
			title: "In Progress",
			value: stats?.inProgressAudits || 0,
			change: stats?.inProgressAudits > 0 ? "+2 this week" : "No active audits",
			changeType: stats?.inProgressAudits > 0 ? "neutral" as const : "negative" as const,
			icon: "⏳",
		},
		{
			title: "Completion Rate",
			value: `${Math.round(stats?.completionRate || 0)}%`,
			change: stats?.completionRate > 80 ? "On track" : "Needs attention",
			changeType: stats?.completionRate > 80 ? "positive" as const : "negative" as const,
			icon: "✅",
		},
		{
			title: "Open Findings",
			value: stats?.openFindings || 0,
			change: stats?.criticalFindings > 0 ? `${stats?.criticalFindings} critical` : "No critical issues",
			changeType: stats?.criticalFindings > 0 ? "negative" as const : "positive" as const,
			icon: "⚠️",
		},
	];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
	{#each cards as card}
		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<span class="text-2xl">{card.icon}</span>
				</div>
				<div class="ml-5 w-0 flex-1">
					<dl>
						<dt class="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
						<dd class="flex items-baseline">
							<div class="text-2xl font-semibold text-gray-900">
								{isLoading ? "..." : card.value}
							</div>
							{#if !isLoading && card.change}
								<div
									class="ml-2 flex items-baseline text-sm font-medium"
									class:text-green-600={card.changeType === "positive"}
									class:text-red-600={card.changeType === "negative"}
									class:text-gray-500={card.changeType === "neutral"}
								>
									{card.change}
								</div>
							{/if}
						</dd>
					</dl>
				</div>
			</div>
		</div>
	{/each}
</div>