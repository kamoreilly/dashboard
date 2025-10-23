<script lang="ts">
	export let stats: any;

	const chartData = [
		{ name: "Completed", value: stats?.completedAudits || 0, color: "bg-green-500" },
		{ name: "In Progress", value: stats?.inProgressAudits || 0, color: "bg-blue-500" },
		{ name: "Overdue", value: stats?.overdueAudits || 0, color: "bg-red-500" },
	];

	const total = chartData.reduce((sum, item) => sum + item.value, 0);

	const getPercentage = (value: number) => {
		return total > 0 ? Math.round((value / total) * 100) : 0;
	};
</script>

<div class="bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Audit Status Distribution</h3>

		{#if total === 0}
			<div class="text-center py-8 text-gray-500">
				<p>No audit data available</p>
			</div>
		{:else}
			<!-- Simple bar chart -->
			<div class="space-y-3">
				{#each chartData as item}
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class={`w-3 h-3 rounded-full ${item.color}`}></div>
							<span class="text-sm text-gray-700">{item.name}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sm font-medium text-gray-900">{item.value}</span>
							<span class="text-xs text-gray-500">({getPercentage(item.value)}%)</span>
						</div>
					</div>
					<div class="w-full bg-gray-200 rounded-full h-2">
						<div
							class="{item.color} h-2 rounded-full transition-all duration-500"
							style="width: {getPercentage(item.value)}%"
						></div>
					</div>
				{/each}
			</div>

			<div class="mt-4 pt-4 border-t border-gray-200">
				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-600">Total Audits</span>
					<span class="text-lg font-semibold text-gray-900">{total}</span>
				</div>
			</div>
		{/if}
	</div>
</div>