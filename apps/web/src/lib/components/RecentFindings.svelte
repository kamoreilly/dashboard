<script lang="ts">
	export let findings: any[] = [];
	export let isLoading: boolean = false;

	const getRiskLevelColor = (riskLevel: string) => {
		switch (riskLevel) {
			case "critical":
				return "bg-red-100 text-red-800 border-red-200";
			case "high":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "medium":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "low":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString();
	};
</script>

<div class="bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-lg leading-6 font-medium text-gray-900">Recent Findings</h3>
			<a href="/findings" class="text-sm text-blue-600 hover:text-blue-800">View all</a>
		</div>

		{#if isLoading}
			<div class="space-y-3">
				{#each Array(3) as _}
					<div class="animate-pulse">
						<div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
						<div class="h-2 bg-gray-200 rounded w-3/4"></div>
					</div>
				{/each}
			</div>
		{:else if findings.length === 0}
			<div class="text-center py-8 text-gray-500">
				<p>No open findings</p>
			</div>
		{:else}
			<div class="space-y-3">
				{#each findings as finding}
					<div class="border rounded-lg p-3 {getRiskLevelColor(finding.riskLevel)}">
						<div class="flex items-start justify-between mb-2">
							<h4 class="text-sm font-medium text-gray-900 flex-1">{finding.title}</h4>
							<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium {getRiskLevelColor(finding.riskLevel)}">
								{finding.riskLevel}
							</span>
						</div>
						{#if finding.description}
							<p class="text-xs text-gray-700 mb-2 line-clamp-2">{finding.description}</p>
						{/if}
						<div class="flex items-center justify-between text-xs text-gray-600">
							<span>Audit #{finding.auditId}</span>
							{#if finding.dueDate}
								<span>Due: {formatDate(finding.dueDate)}</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>