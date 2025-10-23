<script lang="ts">
    import { QueryClientProvider } from '@tanstack/svelte-query';
    import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
	import '../app.css';
    import { queryClient } from '$lib/orpc';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
    <div class="min-h-screen flex flex-col">
        <Header />
        <main class="flex-1">
            {@render children()}
        </main>
        <Footer />
    </div>
    <SvelteQueryDevtools />
</QueryClientProvider>
