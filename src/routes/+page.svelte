<script lang="ts">
	import '../app.css';
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
	import { type PageData } from './$types';
	import { authClient } from '$lib/auth-client';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	let { data }: { data: PageData } = $props();
	// const { supabase } = data;
	// export let data;
	// $: ({ supabase } = data);

	const handleLoginWithGoogle = async () => {
		// const res = await supabase.auth.signInWithOAuth({
		// 	provider: 'google',
		// 	options: { redirectTo: 'http://localhost:5173/auth/callback?next=/movies' }
		// });
		await authClient.oneTap({
			fetchOptions: {
				onSuccess: () => {
					console.log('OK')
					goto('/movies')
				}
			}
		})
		// await authClient.signIn.social({
		// 	provider: 'google'
		// })
	};
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-surface-500">
	<div class="-mt-16 w-1/2">
		<DotLottieSvelte src="/movie.lottie" loop autoplay />
	</div>
	<h1 class="h1 mb-8 text-center text-white">Movie Tracker</h1>
	<button
		type="button"
		class="variant-filled btn bg-white text-surface-500"
		onclick={handleLoginWithGoogle}>Login com Google</button
	>
</div>
