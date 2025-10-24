<script lang="ts">
	import { page } from '$app/state';
	import { orpc } from '$lib/orpc';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount, createEventDispatcher } from 'svelte';

	const healthCheck = createQuery(orpc.healthCheck.queryOptions());
	const dispatch = createEventDispatcher();

	interface NavigationItem {
		name: string;
		href: string;
		icon: string;
		description?: string;
	}

	const navigation: NavigationItem[] = [
		{ name: 'Dashboard', href: '/', icon: 'dashboard', description: 'Overview and analytics' },
		{ name: 'Audits', href: '/audits', icon: 'search', description: 'Audit management' },
		{ name: 'Reports', href: '/reports', icon: 'reports', description: 'Generate reports' }
	];

	let mobileMenuOpen = false;
	let searchQuery = '';
	let userMenuOpen = false;
	let notificationsOpen = false;

	onMount(() => {
		// Close dropdowns when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.user-menu')) {
				userMenuOpen = false;
			}
			if (!target.closest('.notifications-menu')) {
				notificationsOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
		// Close other menus when mobile menu opens
		if (mobileMenuOpen) {
			userMenuOpen = false;
			notificationsOpen = false;
		}
	};

	const handleSearch = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && searchQuery.trim()) {
			dispatch('search', { query: searchQuery.trim() });
			searchQuery = '';
		}
	};

	
	// Mock notifications (can be connected to real data later)
	const mockNotifications = [
		{ id: 1, message: 'New audit completed', type: 'success', time: '5 min ago' },
		{ id: 2, message: 'System update available', type: 'info', time: '1 hour ago' },
		{ id: 3, message: 'Report generation failed', type: 'error', time: '2 hours ago' }
	];
</script>

<!-- SVG Icon Components -->

<style>
	:global(.fade-in) {
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	:global(.slide-down) {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from { opacity: 0; transform: translateY(-100%); }
		to { opacity: 1; transform: translateY(0); }
	}

	:global(.gradient-border) {
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		padding: 1px;
	}

	:global(.hover-lift) {
		transition: all 0.3s ease;
	}

	:global(.hover-lift:hover) {
		transform: translateY(-2px);
	}

	:global(.notification-badge) {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
		70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
		100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
	}
</style>

<header class="bg-white shadow-lg border-b border-gray-200 relative">
	<!-- Gradient accent line -->
	<div class="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Main header content -->
		<div class="flex justify-between items-center h-16">
			<!-- Logo and Brand -->
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<a href="/" class="flex items-center space-x-3 group">
						<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
							<span class="text-white font-bold text-lg">A</span>
						</div>
						<span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							AuditTracker
						</span>
					</a>
				</div>
			</div>

			<!-- Search Bar (Desktop) -->
			<div class="hidden lg:flex flex-1 max-w-md mx-8">
				<div class="relative w-full">
					<input
						type="text"
						placeholder="Search audits, reports, or settings..."
						bind:value={searchQuery}
						on:keydown={handleSearch}
						class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
					/>
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center space-x-1">
				{#each navigation as item}
					<a
						href={item.href}
						class="relative group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 {page.url.pathname === item.href
							? 'bg-blue-50 text-blue-700'
							: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
						}"
						title={item.description}
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if item.icon === 'dashboard'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
							{:else if item.icon === 'search'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							{:else if item.icon === 'reports'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m3-2h6"></path>
							{/if}
						</svg>
						{item.name}
						{#if page.url.pathname === item.href}
							<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- Right side items -->
			<div class="flex items-center space-x-3">
				<!-- API Status Indicator -->
				{#if $healthCheck.data}
					<div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50">
						<div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
						<span class="text-sm font-medium text-green-700">API Connected</span>
					</div>
				{:else if $healthCheck.isLoading}
					<div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-50">
						<div class="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
						<span class="text-sm font-medium text-yellow-700">Checking...</span>
					</div>
				{:else}
					<div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50">
						<div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
						<span class="text-sm font-medium text-red-700">API Offline</span>
					</div>
				{/if}

				<!-- Notifications -->
				<div class="relative notifications-menu">
					<button
						type="button"
						class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 relative"
						on:click|preventDefault={() => notificationsOpen = !notificationsOpen}
						aria-label="Notifications"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
						</svg>
						<span class="notification-badge absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
					</button>

					{#if notificationsOpen}
						<div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 fade-in">
							<div class="p-4 border-b border-gray-200">
								<h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
							</div>
							<div class="max-h-96 overflow-y-auto">
								{#each mockNotifications as notification}
									<div class="p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
										<div class="flex items-start">
											<div class="flex-shrink-0">
												<div class={`w-2 h-2 rounded-full mt-1.5 {notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
											</div>
											<div class="ml-3 flex-1">
												<p class="text-sm text-gray-900">{notification.message}</p>
												<p class="text-xs text-gray-500 mt-1">{notification.time}</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- User Menu -->
				<div class="relative user-menu">
					<button
						type="button"
						class="flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
						on:click|preventDefault={() => userMenuOpen = !userMenuOpen}
						aria-label="User menu"
					>
						<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
							<span class="text-white font-medium text-sm">U</span>
						</div>
						<svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</button>

					{#if userMenuOpen}
						<div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 fade-in">
							<div class="p-3 border-b border-gray-200">
								<p class="text-sm font-medium text-gray-900">Admin User</p>
								<p class="text-xs text-gray-500">admin@example.com</p>
							</div>
							<div class="py-1">
								<a href="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
									<svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
									</svg>
									Profile
								</a>
								<a href="/settings" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
									<svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
									Settings
								</a>
								<hr class="my-1 border-gray-200" />
								<a href="/logout" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
									<svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
									</svg>
									Logout
								</a>
							</div>
						</div>
					{/if}
				</div>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
					on:click={toggleMobileMenu}
					aria-expanded={mobileMenuOpen ? 'true' : 'false'}
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
		<div class="md:hidden slide-down">
			<div class="pt-2 pb-3 space-y-1 px-4">
				<!-- Mobile Search -->
				<div class="relative mb-4">
					<input
						type="text"
						placeholder="Search..."
						bind:value={searchQuery}
						on:keydown={handleSearch}
						class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>

				<!-- Mobile Navigation -->
				{#each navigation as item}
					<a
						href={item.href}
						class="flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 {page.url.pathname === item.href
							? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
							: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
						}"
						on:click={() => mobileMenuOpen = false}
					>
						<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if item.icon === 'dashboard'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
							{:else if item.icon === 'search'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							{:else if item.icon === 'reports'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m3-2h6"></path>
							{/if}
						</svg>
						<div>
							<div>{item.name}</div>
							{#if item.description}
								<div class="text-sm text-gray-500">{item.description}</div>
							{/if}
						</div>
					</a>
				{/each}

				<!-- Mobile API Status -->
				<div class="pt-4 pb-3 border-t border-gray-200">
					<div class="flex items-center px-3">
						{#if $healthCheck.data}
							<div class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
							<span class="ml-2 text-sm font-medium text-green-700">API Connected</span>
						{:else if $healthCheck.isLoading}
							<div class="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
							<span class="ml-2 text-sm font-medium text-yellow-700">Checking...</span>
						{:else}
							<div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
							<span class="ml-2 text-sm font-medium text-red-700">API Offline</span>
						{/if}
					</div>
				</div>

				<!-- Mobile User Section -->
				<div class="pt-3 pb-4 border-t border-gray-200">
					<div class="flex items-center px-3">
						<div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
							<span class="text-white font-medium text-sm">U</span>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-gray-900">Admin User</p>
							<p class="text-xs text-gray-500">admin@example.com</p>
						</div>
					</div>
					<div class="mt-3 space-y-1">
						<a href="/profile" class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
							Profile
						</a>
						<a href="/settings" class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
							Settings
						</a>
						<a href="/logout" class="block px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md">
							Logout
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>