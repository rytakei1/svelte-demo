<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { TMDB_MOVIE } from '../routes/api/movies/+server';
	const modalStore = getModalStore();
	const { movie } = $modalStore[0].meta as { movie: TMDB_MOVIE };
	console.log(movie);
	const getImageUrl = (path: string) => {
		return `https://image.tmdb.org/t/p/w400${path}`;
	};
</script>

{#if $modalStore[0]}
	<div class="w-modal-wide rounded bg-white p-8">
		<div class="flex gap-8">
			<img src={getImageUrl(movie.poster_path)} alt={`${movie.title}-poster`} />
			<div class="flex flex-col gap-4">
				<h2 class="h2 font-bold">{movie.title}</h2>
				<p>Release Date: {movie.release_date}</p>
				<p>{movie.overview}</p>
			</div>
		</div>
	</div>
{/if}
