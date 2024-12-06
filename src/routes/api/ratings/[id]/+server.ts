import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { ratings } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

const validateSession = async (request: Request) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	if (!session) {
		throw new Response(JSON.stringify({ message: 'Unauthenticated' }), { status: 403 });
	}
	return session;
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	const session = await validateSession(request);
	const userId = session.user.id;
	const movieId = parseInt(params.id);
	await db.delete(ratings).where(and(eq(ratings.userId, userId), eq(ratings.movieId, movieId)));
	const userRatings = await db.query.ratings.findMany({
		where: (ratings, { eq }) => eq(ratings.userId, userId)
	});
	return new Response(JSON.stringify(userRatings));
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	const session = await validateSession(request);
	const userId = session.user.id;
	const movieId = parseInt(params.id);
	const { rating } = await request.json();
	await db
		.update(ratings)
		.set({ rating })
		.where(and(eq(ratings.userId, userId), eq(ratings.movieId, movieId)));

	const userRatings = await db.query.ratings.findMany({
		where: (ratings, { eq }) => eq(ratings.userId, userId)
	});
	return new Response(JSON.stringify(userRatings));
};
