<script lang="ts">
	export let audits: any[] = [];
	export let isLoading: boolean = false;

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800";
			case "in_progress":
				return "bg-blue-100 text-blue-800";
			case "overdue":
				return "bg-red-100 text-red-800";
			case "planned":
				return "bg-gray-100 text-gray-800";
			case "cancelled":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "critical":
				return "text-red-600";
			case "high":
				return "text-orange-600";
			case "medium":
				return "text-yellow-600";
			case "low":
				return "text-green-600";
			default:
				return "text-gray-600";
		}
	};

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString();
	};
</script>

<div class="bg-white shadow rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-lg leading-6 font-medium text-gray-900">Recent Audits</h3>
			<a href="/audits" class="text-sm text-blue-600 hover:text-blue-800">View all</a>
		</div>

		{#if isLoading}
			<div class="space-y-4">
				{#each Array(5) as _}
					<div class="animate-pulse">
						<div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
						<div class="h-3 bg-gray-200 rounded w-1/2"></div>
					</div>
				{/each}
			</div>
		{:else if audits.length === 0}
			<div class="text-center py-8 text-gray-500">
				<p>No audits found. Create your first audit to get started.</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each audits as audit}
					<div class="border-b border-gray-200 pb-4 last:border-b-0">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<div class="flex items-center gap-3 mb-2">
									<h4 class="text-sm font-medium text-gray-900">{audit.title}</h4>
									<span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
										{audit.status.replace("_", " ")}
									</span>
									<span class={`text-sm font-medium ${getPriorityColor(audit.priority)}`}>
										{audit.priority}
									</span>
								</div>
								{#if audit.description}
									<p class="text-sm text-gray-600 mb-2">{audit.description}</p>
								{/if}
								<div class="flex items-center gap-4 text-xs text-gray-500">
									<span>Type: {audit.type}</span>
									{#if audit.department}
										<span>Department: {audit.department}</span>
									{/if}
									{#if audit.dueDate}
										<span>Due: {formatDate(audit.dueDate)}</span>
									{/if}
								</div>
							</div>
							<div class="ml-4 flex-shrink-0">
								<a
									href="/audits/{audit.id}"
									class="text-blue-600 hover:text-blue-800 text-sm font-medium"
								>
									View Details
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>