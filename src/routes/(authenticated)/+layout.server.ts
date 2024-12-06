import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load: LayoutServerLoad = async ({ request, fetch }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) {
		redirect(303, '/');
	} else {
		console.log('authenticated');
		await fetch('/api/login');
	}
};
