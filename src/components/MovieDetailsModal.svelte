<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { TMDB_MOVIE } from '../routes/api/movies/+server';
	import IconPlus from '~icons/mdi/plus';
	import IconX from '~icons/mdi/close';
	import IconSave from '~icons/material-symbols-light/save';
	import type { Rating } from '../types';
	import { getContext } from 'svelte';
	const modalStore = getModalStore();
	const { movie, onAddMovie, onRemoveMovie, onUpdateMovie } = $modalStore[0].meta as {
		movie: TMDB_MOVIE;
		onAddMovie: () => Promise<void>;
		onRemoveMovie: (movieId: number) => Promise<void>;
		onUpdateMovie: (movieId: number, rating: number) => Promise<void>;
	};
	const ratingsContext = getContext('ratings');
	let rating = $state(null);
	let localRating = $state(0);
	$effect(() => {
		rating = $ratingsContext?.find((r) => r.movieId === movie.id);
		localRating = rating?.rating;
	});
	const getImageUrl = (path: string) => {
		return `https://image.tmdb.org/t/p/w400${path}`;
	};
</script>

{#if $modalStore[0]}
	<div class="w-modal-wide rounded bg-white p-8">
		<div class="flex gap-8">
			<img src={getImageUrl(movie.poster_path)} alt={`${movie.title}-poster`} />
			<div class="flex flex-col gap-4 text-surface-900">
				<h2 class="h2 font-bold">{movie.title}</h2>
				<p>Release Date: {movie.release_date}</p>
				<p class="mb-8">{movie.overview}</p>
				{#if !rating}
					<button
						onclick={onAddMovie}
						class="variant-filled btn flex items-center bg-primary-400 font-bold uppercase text-surface-900"
					>
						<IconPlus />
						<span> Add to your list </span>
					</button>
				{:else}
					<div class="flex items-center gap-4">
						<input class="input" type="number" max="10" min="0" step="1" bind:value={localRating} />
						<button
							onclick={() => onUpdateMovie(movie.id, localRating)}
							class="variant-filled btn flex items-center bg-primary-700 font-bold uppercase text-white"
						>
							<IconSave />
							<span> Save </span>
						</button>
						<button
							onclick={() => onRemoveMovie(movie.id)}
							class="variant-filled btn flex items-center bg-error-500 font-bold uppercase text-white"
						>
							<IconX />
							<span> Remove from your list </span>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
