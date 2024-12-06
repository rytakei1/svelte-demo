<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import '../app.css';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PageData } from './$types';
	import { storePopup, initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import MovieDetailsModal from '../components/MovieDetailsModal.svelte';
	import { writable } from 'svelte/store';
	import type { Rating } from '../types';
	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let { children }: { data: PageData; children: Snippet } = $props();
	const modalRegistry: Record<string, ModalComponent> = {
		movieDetailsModal: { ref: MovieDetailsModal }
	};

	const ratings = writable<Rating[]>([]);
	const fetchInitialRatings = async () => {
		const res = await fetch('/api/ratings');
		const userRatings = (await res.json()) as Rating[];
		$ratings = userRatings;
	};
	onMount(async () => {
		await fetchInitialRatings();
	});
	setContext('ratings', ratings);
</script>

<Modal components={modalRegistry} />
{@render children?.()}
