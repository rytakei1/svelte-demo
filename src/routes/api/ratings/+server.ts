import { auth } from '$lib/auth';
import { db } from '$lib/server/db';
import { ratings } from '$lib/server/db/schema';
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
export const GET: RequestHandler = async ({ request }) => {
	const session = await validateSession(request);
	const userId = session.user.id;
	const userRatings = await db.query.ratings.findMany({
		where: (ratings, { eq }) => eq(ratings.userId, userId)
	});
	return new Response(JSON.stringify(userRatings));
};

export const POST: RequestHandler = async ({ request }) => {
	const session = await validateSession(request);
	const { movie, posterPath, name } = (await request.json()) as {
		movie: number;
		posterPath: string;
		name: string;
	};
	if (!movie) return new Response(JSON.stringify({ message: 'Missing movie' }), { status: 400 });
	const userId = session.user.id;
	await db
		.insert(ratings)
		.values({
			userId: userId,
			movieId: movie,
			rating: 0,
			movieName: name,
			moviePosterPath: posterPath
		});
	const userRatings = await db.query.ratings.findMany({
		where: (ratings, { eq }) => eq(ratings.userId, userId)
	});
	return new Response(JSON.stringify(userRatings));
};
