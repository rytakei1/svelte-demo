<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PageData } from './$types';
	import { storePopup, initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import MovieDetailsModal from '../components/MovieDetailsModal.svelte';
	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let { data, children }: { data: PageData; children: Snippet } = $props();
	const { session, supabase } = data;
	const modalRegistry: Record<string, ModalComponent> = {
		movieDetailsModal: { ref: MovieDetailsModal }
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Modal components={modalRegistry} />
{@render children?.()}
