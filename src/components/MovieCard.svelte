<script lang="ts">
	import { getModalStore, Ratings, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { TMDB_MOVIE } from '../routes/api/movies/+server';
	import IconStarEmpty from '~icons/ic/baseline-star-outline';
	import IconStarHalf from '~icons/ic/baseline-star-half';
	import IconStarFull from '~icons/ic/baseline-star';
	import type { Rating } from '../types';
	import { ratingsStore } from '../stores/ratingsStore';

	const { movie, rating }: { movie: TMDB_MOVIE; rating: Rating | undefined } = $props();
	const modalStore = getModalStore();
	const getPosterUrl = (posterPath: string) => {
		if (!posterPath) return 'https://placehold.co/200x300';
		return `https://image.tmdb.org/t/p/w200${posterPath}`;
	};
	const handleAddMovie = async () => {
		const res = await fetch(`/api/ratings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ movie: movie.id, posterPath: movie.poster_path, name: movie.title })
		});
		const userRatings = await res.json();
		$ratingsStore = userRatings;
	};
	const handleRemoveMovie = async (movieId: number) => {
		const res = await fetch(`/api/ratings/${movieId}`, {
			method: 'DELETE'
		});
		const userRatings = await res.json();
		$ratingsStore = userRatings;
		modalStore.close();
	};

	const handleUpdateMovie = async (movieId: number, rating: number) => {
		const res = await fetch(`/api/ratings/${movieId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ rating })
		});
		const userRatings = await res.json();
		$ratingsStore = userRatings;
		modalStore.close();
	};

	

	const handleClick = () => {
		const modal: ModalSettings = {
			type: 'component',
			component: 'movieDetailsModal',
			meta: {
				movie,
				onAddMovie: handleAddMovie,
				rating,
				onRemoveMovie: handleRemoveMovie,
				onUpdateMovie: handleUpdateMovie
			}
		};
		modalStore.trigger(modal);
	};
</script>

<button
	onclick={handleClick}
	class="group card w-[232px] cursor-pointer transition hover:bg-surface-300"
>
	<header class="card-header">
		<img src={getPosterUrl(movie.poster_path)} alt={`${movie.title}-poster`} />
	</header>
	<section class="p-4">
		<h5
			class="h6 mb-2 truncate font-bold text-primary-900 transition group-hover:text-secondary-900"
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
