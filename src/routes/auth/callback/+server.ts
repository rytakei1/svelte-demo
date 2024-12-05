import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';
	if (code) {
		const res = await supabase.auth.exchangeCodeForSession(code);
		if (!res.error) {
			const googleId = res.data.user.id;
			const { email, full_name } = res.data.user.user_metadata;
			const userInDb = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.googleId, googleId)
			});
			if (!userInDb) {
				await db.insert(users).values({ email, name: full_name, googleId });
			}
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with instructions
	throw redirect(303, '/auth/auth-code-error');
};
