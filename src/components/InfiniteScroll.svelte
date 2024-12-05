<script lang="ts">
	import { onDestroy } from 'svelte';

	let { loadMore, threshold = 0, horizontal = false, hasMore = true, loading = false } = $props();
	let isLoadMore = false;
	let component: any;

	$effect(() => {
		if (component) {
			const element = component?.parentNode?.parentNode?.parentNode;
			// element;
			element.addEventListener('scroll', onScroll);
			element.addEventListener('resize', onScroll);
		}
	});

	const onScroll = (e: any) => {
		const element = e.target;
		const offset = horizontal
			? element.scrollWidth - element.clientWidth - element.scrollLeft
			: element.scrollHeight - element.clientHeight - element.scrollTop;

		if (offset <= threshold) {
			if (!isLoadMore && hasMore && !loading) {
				loadMore();
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};

	onDestroy(() => {
		if (component) {
			const element = component?.parentNode?.parentNode?.parentNode;
			if (!element) return;
			element.removeEventListener('scroll', null);
			element.removeEventListener('resize', null);
		}
	});
</script>

<div bind:this={component} style="width:0px"></div>
