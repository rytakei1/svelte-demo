<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import '../app.css';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PageData } from './$types';
	import { storePopup, initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import MovieDetailsModal from '../components/MovieDetailsModal.svelte';
	import type { Rating } from '../types';
	import { ratingsStore } from '../stores/ratingsStore';
	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let { children }: { data: PageData; children: Snippet } = $props();
	const modalRegistry: Record<string, ModalComponent> = {
		movieDetailsModal: { ref: MovieDetailsModal }
	};

	const fetchInitialRatings = async () => {
		const res = await fetch('/api/ratings');
		const userRatings = (await res.json()) as Rating[];
		$ratingsStore = userRatings;
	};

	onMount(async () => {
		await fetchInitialRatings();
	});
</script>

<Modal components={modalRegistry} />
{@render children?.()}
