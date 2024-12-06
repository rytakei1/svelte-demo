<script lang="ts">
	import { getContext } from 'svelte';
	import IconTrash from '~icons/mdi/trash-can';
	const ratingsContext = getContext('ratings');
	const handleDeleteEntry = async (movieId: number) => {
		const res = await fetch(`/api/ratings/${movieId}`, {
			method: 'DELETE'
		});
		const userRatings = await res.json();
		$ratingsContext = userRatings;
	};
</script>

<div class="table-container p-16">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Rating</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $ratingsContext || [] as row, i}
				<tr>
					<td class="align-middle">{row.movieName}</td>
					<td>{row.rating}</td>
					<td
						><IconTrash class="cursor-pointer" onclick={() => handleDeleteEntry(row.movieId)} /></td
					>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>Total Movies</th>
				<td colspan="2">{$ratingsContext?.length}</td>
			</tr>
		</tfoot>
	</table>
</div>
