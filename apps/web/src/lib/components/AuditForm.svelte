<script lang="ts">
	import { orpc } from "$lib/orpc";
	import { createMutation } from "@tanstack/svelte-query";

	export let audit: any = null;
	export let isOpen: boolean = false;

	let title = "";
	let description = "";
	let type = "internal";
	let status = "planned";
	let priority = "medium";
	let department = "";
	let scope = "";
	let startDate = "";
	let endDate = "";
	let dueDate = "";

	// Initialize form data if editing an existing audit
	$: if (audit && isOpen) {
		title = audit.title || "";
		description = audit.description || "";
		type = audit.type || "internal";
		status = audit.status || "planned";
		priority = audit.priority || "medium";
		department = audit.department || "";
		scope = audit.scope || "";
		startDate = audit.startDate ? new Date(audit.startDate).toISOString().split('T')[0] : "";
		endDate = audit.endDate ? new Date(audit.endDate).toISOString().split('T')[0] : "";
		dueDate = audit.dueDate ? new Date(audit.dueDate).toISOString().split('T')[0] : "";
	}

	const createAuditMutation = createMutation({
		mutationFn: (data: any) => orpc.audits.createAudit.mutate(data),
		onSuccess: () => {
			isOpen = false;
			resetForm();
			// Invalidate queries to refresh the data
			window.location.reload();
		},
	});

	const updateAuditMutation = createMutation({
		mutationFn: ({ id, data }: { id: number; data: any }) => orpc.audits.updateAudit.mutate({ id, data }),
		onSuccess: () => {
			isOpen = false;
			resetForm();
			window.location.reload();
		},
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		const auditData = {
			title,
			description,
			type,
			status,
			priority,
			department,
			scope,
			startDate: startDate ? new Date(startDate).getTime() : undefined,
			endDate: endDate ? new Date(endDate).getTime() : undefined,
			dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
		};

		if (audit) {
			updateAuditMutation.mutate({ id: audit.id, data: auditData });
		} else {
			createAuditMutation.mutate(auditData);
		}
	};

	const resetForm = () => {
		title = "";
		description = "";
		type = "internal";
		status = "planned";
		priority = "medium";
		department = "";
		scope = "";
		startDate = "";
		endDate = "";
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
					{audit ? "Edit Audit" : "Create New Audit"}
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
						<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							id="description"
							bind:value={description}
							rows="3"
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="type" class="block text-sm font-medium text-gray-700">Type</label>
							<select
								id="type"
								bind:value={type}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="internal">Internal</option>
								<option value="external">External</option>
								<option value="compliance">Compliance</option>
								<option value="security">Security</option>
								<option value="financial">Financial</option>
								<option value="operational">Operational</option>
							</select>
						</div>

						<div>
							<label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
							<select
								id="priority"
								bind:value={priority}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
								<option value="critical">Critical</option>
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
								<option value="planned">Planned</option>
								<option value="in_progress">In Progress</option>
								<option value="completed">Completed</option>
								<option value="overdue">Overdue</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>

						<div>
							<label for="department" class="block text-sm font-medium text-gray-700">Department</label>
							<input
								type="text"
								id="department"
								bind:value={department}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>
					</div>

					<div>
						<label for="scope" class="block text-sm font-medium text-gray-700">Scope</label>
						<textarea
							id="scope"
							bind:value={scope}
							rows="2"
							class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						></textarea>
					</div>

					<div class="grid grid-cols-3 gap-4">
						<div>
							<label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
							<input
								type="date"
								id="startDate"
								bind:value={startDate}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
						</div>

						<div>
							<label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
							<input
								type="date"
								id="endDate"
								bind:value={endDate}
								class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							/>
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
							disabled={createAuditMutation.isPending || updateAuditMutation.isPending}
							class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
						>
							{createAuditMutation.isPending || updateAuditMutation.isPending
								? "Saving..."
								: audit ? "Update Audit" : "Create Audit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}