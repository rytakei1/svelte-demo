<script lang="ts">
	import MovieCard from '../../../components/MovieCard.svelte';
	import IconSearch from '~icons/mdi/search';
	import IconFilter from '~icons/mdi/filter';
	import { type PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import InfiniteScroll from '../../../components/InfiniteScroll.svelte';
	import { getContext } from 'svelte';
	import type { Rating } from '../../../types';
	let { data }: { data: PageData } = $props();
	let movies = $state(data.movies);
	let searchTerm = $state('');
	let loading = $state(false);
	let timer: NodeJS.Timeout;
	let currentPage = 1;
	const debounce = (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const target = e.target as HTMLInputElement;
			searchTerm = target.value;
		}, 500);
	};
	const fetchMovies = async (search: string, page = 1) => {
		let url = `/api/movies?page=${page}`;
		if (search) url += `&search=${search}`;
		loading = true;
		const res = await fetch(url);
		loading = false;
		const response = await res.json();
		if (page !== 1) {
			movies = [...movies, ...response];
		} else {
			movies = response;
		}
	};
	$effect(() => {
		currentPage = 1;
		fetchMovies(searchTerm, 1);
	});
	let ratings = $state<Rating[]>([]);
	const ratingsContext = getContext('ratings');
	$effect(() => {
		if ($ratingsContext) {
			ratings = [...$ratingsContext];
		}
	});
</script>

<div class="p-8">
	<div class="input-group input-group-divider mb-8 grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><IconSearch /></div>
		<input type="search" placeholder="Search..." oninput={debounce} />
		{#if loading}
			<div class="input-group-shim">
				<ProgressRadial stroke={40} width="w-5" />
			</div>
		{:else}
			<div class="input-group-shim">
				<IconFilter />
			</div>
		{/if}
	</div>

	<div class="flex flex-wrap justify-between gap-4">
		{#each movies as movie}
			<MovieCard {movie} rating={ratings.find((r) => r.movieId === movie.id)} />
		{/each}
	</div>
	<InfiniteScroll
		hasMore={true}
		threshold={20}
		{loading}
		loadMore={() => {
			currentPage++;
			fetchMovies(searchTerm, currentPage);
		}}
	/>
</div>
