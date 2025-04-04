import { writable } from 'svelte/store';
import type { Rating } from '../types';

export const ratingsStore = writable<Rating[]>([]);
