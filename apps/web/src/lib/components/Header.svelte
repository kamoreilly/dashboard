<script lang="ts">
	import { page } from '$app/state';
	import { orpc } from '$lib/orpc';
	import { createQuery } from '@tanstack/svelte-query';

	const healthCheck = createQuery(orpc.healthCheck.queryOptions());

	const navigation = [
		{ name: 'Dashboard', href: '/', icon: '📊' },
		{ name: 'Audits', href: '/audits', icon: '🔍' },
		{ name: 'Reports', href: '/reports', icon: '📈' }
	];

	let mobileMenuOpen = false;

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};
</script>

<header class="bg-white shadow-sm border-b border-gray-200">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<a href="/" class="flex items-center space-x-3">
						<div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<span class="text-white font-bold text-lg">A</span>
						</div>
						<span class="text-xl font-bold text-gray-900">AuditTracker</span>
					</a>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex space-x-8">
				{#each navigation as item}
					<a
						href={item.href}
						class="inline-flex items-center px-1 pt-1 text-sm font-medium {page.url.pathname === item.href
							? 'text-blue-600 border-b-2 border-blue-600'
							: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
						} transition-colors duration-200"
					>
						<span class="mr-2">{item.icon}</span>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- Right side items -->
			<div class="flex items-center space-x-4">
				<!-- API Status Indicator -->
				<div class="hidden sm:flex items-center gap-2">
					<div
						class={`h-2 w-2 rounded-full ${$healthCheck.data ? "bg-green-500" : "bg-red-500"} animate-pulse`}
					></div>
					<span class="text-sm text-gray-600">
						{$healthCheck.isLoading
							? "Checking..."
							: $healthCheck.data
								? "API Connected"
								: "API Disconnected"}
					</span>
				</div>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
					on:click={toggleMobileMenu}
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed -->
					<svg
						class="{mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!-- Icon when menu is open -->
					<svg
						class="{mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden">
			<div class="pt-2 pb-3 space-y-1">
				{#each navigation as item}
					<a
						href={item.href}
						class="flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium {page.url.pathname === item.href
							? 'bg-blue-50 border-blue-500 text-blue-700'
							: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
						}"
						on:click={() => mobileMenuOpen = false}
					>
						<span class="mr-3">{item.icon}</span>
						{item.name}
					</a>
				{/each}
			</div>

			<!-- Mobile API Status -->
			<div class="pt-4 pb-3 border-t border-gray-200">
				<div class="flex items-center px-4">
					<div
						class={`h-2 w-2 rounded-full ${$healthCheck.data ? "bg-green-500" : "bg-red-500"} animate-pulse`}
					></div>
					<span class="ml-2 text-sm text-gray-600">
						{$healthCheck.isLoading
							? "Checking..."
							: $healthCheck.data
								? "API Connected"
								: "API Disconnected"}
					</span>
				</div>
			</div>
		</div>
	{/if}
</header>
