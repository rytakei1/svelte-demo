<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppShell, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import IconMovie from '~icons/icon-park-outline/movie';
	import IconList from '~icons/cuida/list-outline';
	import { authClient } from '$lib/auth-client.js';
	import { page } from '$app/stores';
	let currentTile = 0;
	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto('/');
				}
			}
		});
	};
</script>

<AppShell class="bg-surface-500">
	<svelte:fragment slot="sidebarLeft">
		<AppRail background="bg-surface-800 text-white">
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/movies">Movie Tracker</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailAnchor href="/movies" title="Movies" selected={$page.url.pathname === '/movies'}>
				<svelte:fragment slot="lead"><IconMovie class="mx-auto" /></svelte:fragment>
				<span>Movies</span>
			</AppRailAnchor>
			<AppRailAnchor href="/list" title="List" selected={$page.url.pathname === '/list'}>
				<svelte:fragment slot="lead"><IconList class="mx-auto" /></svelte:fragment>
				<span>Your List</span>
			</AppRailAnchor>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor title="Logout">
					<button type="button" onclick={handleLogout}>Logout</button>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<slot />
</AppShell>
