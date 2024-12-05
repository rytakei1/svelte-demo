import type { RequestHandler } from './$types';
import { PUBLIC_TMDB_READ_TOKEN } from '$env/static/public';

export interface TMDB_MOVIE {
	original_title: string;
	vote_average: number;
	id: number;
	genre_ids: number[];
	poster_path: string;
	release_date: string;
	title: string;
	backdrop_path: string;
	overview: string;
}
interface TMDB_RESPONSE {
	page: number;
	results: TMDB_MOVIE[];
	total_pages: number;
	total_results: number;
}

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url);
	const params = url.searchParams;
	const page = params.get('page') || 1;
	let apiUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=${page}`;
	if (params.has('search')) {
		apiUrl += `&query=${params.get('search')}`;
	} else {
		apiUrl = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=200&page=${page}`;
	}
	const res = await fetch(apiUrl, {
		headers: { Authorization: `Bearer ${PUBLIC_TMDB_READ_TOKEN}` }
	});

	const response = (await res.json()) as TMDB_RESPONSE;

	return new Response(JSON.stringify(response.results));
};
