import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/movies');
	const response = await res.json();
	return { movies: response };
};
