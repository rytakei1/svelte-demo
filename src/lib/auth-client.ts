import { PUBLIC_URL } from '$env/static/public';
import { createAuthClient } from 'better-auth/svelte';
// import { GOOGLE_CLIENT_ID } from '$env/static/private';
import { oneTapClient } from 'better-auth/client/plugins';
export const authClient = createAuthClient({
	baseURL: PUBLIC_URL,
	plugins: [
		oneTapClient({
			clientId: '72950970700-g40ee8il3t0in0hbkorrlc3eg9vo4im3.apps.googleusercontent.com'
		})
	]
});
