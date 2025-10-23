<script lang="ts">
	import { orpc } from "$lib/orpc";
	import { createMutation } from "@tanstack/svelte-query";

	export let finding: any = null;
	export let auditId: number | null = null;
	export let isOpen: boolean = false;

	let title = "";
	let description = "";
	let riskLevel = "medium";
	let category = "control_deficiency";
	let status = "open";
	let recommendation = "";
	let assignedTo = "";
	let dueDate = "";

	$: if (finding && isOpen) {
		title = finding.title || "";
		description = finding.description || "";
		riskLevel = finding.riskLevel || "medium";
		category = finding.category || "control_deficiency";
		status = finding.status || "open";
		recommendation = finding.recommendation || "";
		assignedTo = finding.assignedTo || "";
		dueDate = finding.dueDate ? new Date(finding.dueDate).toISOString().split('T')[0] : "";
	}

	const createFindingMutation = createMutation({
		mutationFn: (data: any) => orpc.findings.createFinding.mutate(data),
		onSuccess: () => {
			isOpen = false;
			resetForm();
			window.location.reload();
		},
	});

	const updateFindingMutation = createMutation({
		mutationFn: ({ id, data }: { id: number; data: any }) => orpc.findings.updateFinding.mutate({ id, data }),
		onSuccess: () => {
			isOpen = false;
			resetForm();
			window.location.reload();
		},
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		const findingData = {
			title,
			description,
			riskLevel,
			category,
			status,
			recommendation,
			assignedTo,
			dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
			auditId: auditId || finding?.auditId,
		};

		if (finding) {
			updateFindingMutation.mutate({ id: finding.id, data: findingData });
		} else {
			createFindingMutation.mutate(findingData);
		}
	};

	const resetForm = () => {
		title = "";
		description = "";
		riskLevel = "medium";
		category = "control_deficiency";
		status = "open";
		recommendation = "";
		assignedTo = "";
		dueDate = "";
	};

	const closeModal = () => {
		isOpen = false;
		resetForm();
	};
</script>

{#if isOpen}
	<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
		<div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
			<div class="mt-3">
				<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
					{finding ? "Edit Finding" : "Create New Finding"}
				</h3>

				<form on:submit={handleSubmit} class="space-y-4">
					<div>
						<label for="title" class="block text-sm font-medium text-gray-700">Title *</label>
						<input
							type="text"
							id="title"
							bind:value={title}
							required
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>

					<div>
						<label for="description" class="block text-sm font-medium text-gray-700">Description *</label>
						<textarea
							id="description"
							bind:value={description}
							rows="3"
							required
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="riskLevel" class="block text-sm font-medium text-gray-700">Risk Level</label>
							<select
								id="riskLevel"
								bind:value={riskLevel}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
								<option value="critical">Critical</option>
							</select>
						</div>

						<div>
							<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
							<select
								id="category"
								bind:value={category}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="control_deficiency">Control Deficiency</option>
								<option value="process_gap">Process Gap</option>
								<option value="violation">Violation</option>
								<option value="weakness">Weakness</option>
								<option value="non_compliance">Non-Compliance</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="status" class="block text-sm font-medium text-gray-700">Status</label>
							<select
								id="status"
								bind:value={status}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="open">Open</option>
								<option value="in_progress">In Progress</option>
								<option value="resolved">Resolved</option>
								<option value="closed">Closed</option>
								<option value="accepted_risk">Accepted Risk</option>
							</select>
						</div>

						<div>
							<label for="assignedTo" class="block text-sm font-medium text-gray-700">Assigned To</label>
							<input
								type="text"
								id="assignedTo"
								bind:value={assignedTo}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>
					</div>

					<div>
						<label for="recommendation" class="block text-sm font-medium text-gray-700">Recommendation</label>
						<textarea
							id="recommendation"
							bind:value={recommendation}
							rows="3"
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						></textarea>
					</div>

					<div>
						<label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
						<input
							type="date"
							id="dueDate"
							bind:value={dueDate}
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
					</div>

					<div class="flex justify-end space-x-3 pt-4">
						<button
							type="button"
							on:click={closeModal}
							class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={createFindingMutation.isPending || updateFindingMutation.isPending}
							class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
						>
							{createFindingMutation.isPending || updateFindingMutation.isPending
								? "Saving..."
								: finding ? "Update Finding" : "Create Finding"}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}