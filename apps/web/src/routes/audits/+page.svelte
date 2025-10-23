<script lang="ts">
	import { orpc } from "$lib/orpc";
	import { createQuery } from "@tanstack/svelte-query";
	import AuditForm from "$lib/components/AuditForm.svelte";
	import FindingForm from "$lib/components/FindingForm.svelte";

	const auditsQuery = createQuery(() =>
		orpc.audits.getAudits.queryOptions({ limit: 50 })
	);

	let showAuditForm = false;
	let selectedAudit = null;
	let showFindingForm = false;
	let selectedAuditId = null;

	const openAuditForm = (audit = null) => {
		selectedAudit = audit;
		showAuditForm = true;
	};

	const openFindingForm = (auditId = null) => {
		selectedAuditId = auditId;
		showFindingForm = true;
	};

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

<div class="bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex justify-between items-center mb-8">
			<div>
				<h2 class="text-3xl font-bold text-gray-900">All Audits</h2>
				<p class="mt-2 text-gray-600">Manage and track your IT audits</p>
			</div>
			<div class="flex space-x-3">
				<button
					on:click={() => openFindingForm()}
					class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
				>
					New Finding
				</button>
				<button
					on:click={() => openAuditForm()}
					class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					New Audit
				</button>
			</div>
		</div>

		<!-- Filters (placeholder for future implementation) -->
		<div class="bg-white rounded-lg shadow p-4 mb-8">
			<div class="flex flex-wrap gap-4">
				<select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
					<option value="">All Status</option>
					<option value="planned">Planned</option>
					<option value="in_progress">In Progress</option>
					<option value="completed">Completed</option>
					<option value="overdue">Overdue</option>
				</select>
				<select class="border border-gray-300 rounded-md px-3 py-2 text-sm">
					<option value="">All Types</option>
					<option value="internal">Internal</option>
					<option value="external">External</option>
					<option value="compliance">Compliance</option>
					<option value="security">Security</option>
				</select>
				<input
					type="text"
					placeholder="Search audits..."
					class="border border-gray-300 rounded-md px-3 py-2 text-sm flex-1"
				/>
			</div>
		</div>

		<!-- Audits Table -->
		<div class="bg-white shadow rounded-lg overflow-hidden">
			{#if $auditsQuery.isLoading}
				<div class="p-8 text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p class="mt-4 text-gray-600">Loading audits...</p>
				</div>
			{:else if $auditsQuery.data?.length === 0}
				<div class="p-8 text-center text-gray-500">
					<p>No audits found. Create your first audit to get started.</p>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each $auditsQuery.data as audit}
								<tr class="hover:bg-gray-50">
									<td class="px-6 py-4 whitespace-nowrap">
										<div>
											<div class="text-sm font-medium text-gray-900">{audit.title}</div>
											{#if audit.description}
												<div class="text-sm text-gray-500 truncate max-w-xs">{audit.description}</div>
											{/if}
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-sm text-gray-900 capitalize">{audit.type}</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(audit.status)}">
											{audit.status.replace("_", " ")}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-sm font-medium {getPriorityColor(audit.priority)} capitalize">{audit.priority}</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{audit.department || "N/A"}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{audit.dueDate ? formatDate(audit.dueDate) : "N/A"}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div class="flex space-x-2">
											<a
												href="/audits/{audit.id}"
												class="text-blue-600 hover:text-blue-900"
											>
												View
											</a>
											<button
												on:click={() => openAuditForm(audit)}
												class="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</button>
											<button
												on:click={() => openFindingForm(audit.id)}
												class="text-orange-600 hover:text-orange-900"
											>
												Add Finding
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>

	<!-- Forms -->
	<AuditForm bind:isOpen={showAuditForm} audit={selectedAudit} />
	<FindingForm bind:isOpen={showFindingForm} auditId={selectedAuditId} />
</div>