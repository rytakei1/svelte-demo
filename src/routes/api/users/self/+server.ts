import { auth } from '$lib/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	// console.log(session);
	return new Response(JSON.stringify({ message: 'Hello World!' }));
};
