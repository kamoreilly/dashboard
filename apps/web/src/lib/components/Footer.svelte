<script lang="ts">
	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{
			title: 'Product',
			links: [
				{ name: 'Dashboard', href: '/' },
				{ name: 'Audit Management', href: '/audits' },
				{ name: 'Reports & Analytics', href: '/reports' },
				{ name: 'API Documentation', href: '/api-reference' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ name: 'Documentation', href: '/docs' },
				{ name: 'Best Practices', href: '/best-practices' },
				{ name: 'Support', href: '/support' },
				{ name: 'Status', href: '/status' }
			]
		},
		{
			title: 'Company',
			links: [
				{ name: 'About', href: '/about' },
				{ name: 'Privacy Policy', href: '/privacy' },
				{ name: 'Terms of Service', href: '/terms' },
				{ name: 'Contact', href: '/contact' }
			]
		}
	];

	const socialLinks = [
		{ name: 'GitHub', href: 'https://github.com', icon: '⚡' },
		{ name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
		{ name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
		{ name: 'Email', href: 'mailto:support@audittracker.com', icon: '✉️' }
	];
</script>

<footer class="bg-gray-900 text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand Section -->
			<div class="md:col-span-1">
				<div class="flex items-center space-x-3 mb-4">
					<div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-xl">A</span>
					</div>
					<span class="text-2xl font-bold">AuditTracker</span>
				</div>
				<p class="text-gray-300 text-sm mb-4">
					Professional IT audit management platform with real-time monitoring and comprehensive reporting.
				</p>
				<div class="flex space-x-4">
					{#each socialLinks as social}
						<a
							href={social.href}
							class="text-gray-400 hover:text-white transition-colors duration-200"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span class="text-xl" title="{social.name}">{social.icon}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Footer Links -->
			{#each footerLinks as column}
				<div>
					<h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
						{column.title}
					</h3>
					<ul class="space-y-2">
						{#each column.links as link}
							<li>
								<a
									href={link.href}
									class="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
								>
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom Section -->
		<div class="mt-8 pt-8 border-t border-gray-700">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<p class="text-gray-400 text-sm">
					&copy; {currentYear} AuditTracker. All rights reserved.
				</p>
				<div class="flex space-x-6 mt-4 md:mt-0">
					<a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
						Privacy Policy
					</a>
					<a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
						Terms of Service
					</a>
					<a href="/contact" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
						Contact
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>