<script>
	import { goto } from '$app/navigation';
	import { AppShell, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import IconMovie from '~icons/icon-park-outline/movie';
	import IconList from '~icons/cuida/list-outline';
	let currentTile = 0;
	export let data;
	const { supabase } = data;
	const handleLogout = async () => {
		await supabase.auth.signOut();
		goto('/');
	};
</script>

<AppShell class="bg-surface-500">
	<!-- <svelte:fragment slot="header"><AppBar>Skeleton</AppBar></svelte:fragment> -->
	<svelte:fragment slot="sidebarLeft">
		<AppRail background="bg-surface-800 text-white">
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/movies">Movie Tracker</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead"><IconMovie class="mx-auto" /></svelte:fragment>
				<span>Movies</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead"><IconList class="mx-auto" /></svelte:fragment>
				<span>Your List</span>
			</AppRailTile>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor title="Logout">
					<button type="button" onclick={handleLogout}>Logout</button>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
</AppShell>
