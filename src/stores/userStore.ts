import { writable } from 'svelte/store';

export const userData = writable({
	name: '',
	email: '',
	ratings: []
});

export const updateUserData = async () => {};
