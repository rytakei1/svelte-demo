<script lang="ts">
	import { getModalStore, Ratings, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { TMDB_MOVIE } from '../routes/api/movies/+server';
	import IconStarEmpty from '~icons/ic/baseline-star-outline';
	import IconStarHalf from '~icons/ic/baseline-star-half';
	import IconStarFull from '~icons/ic/baseline-star';
	const { movie }: { movie: TMDB_MOVIE } = $props();
	const getPosterUrl = (posterPath: string) => {
		return `https://image.tmdb.org/t/p/w200${posterPath}`;
	};
	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: 'movieDetailsModal',
		meta: { movie }
	};
	const handleClick = () => {
		modalStore.trigger(modal);
	};
</script>

<button
	onclick={handleClick}
	class="card hover:bg-surface-300 group w-[232px] cursor-pointer transition"
>
	<header class="card-header">
		<img src={getPosterUrl(movie.poster_path)} alt={`${movie.title}-poster`} />
	</header>
	<section class="p-4">
		<h5
			class="h6 text-primary-900 group-hover:text-secondary-900 mb-2 truncate font-bold transition"
		>
			{movie.title}
		</h5>
		<Ratings value={movie.vote_average / 2} max={5} justify="items-start">
			<svelte:fragment slot="empty"><IconStarEmpty /></svelte:fragment>
			<svelte:fragment slot="half"><IconStarHalf /></svelte:fragment>
			<svelte:fragment slot="full"><IconStarFull /></svelte:fragment>
		</Ratings>
	</section>
</button>
