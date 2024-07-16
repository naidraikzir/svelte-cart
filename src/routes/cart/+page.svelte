<script lang="ts">
	import { cartStore } from '$lib/stores/cart.svelte';
</script>

<h2>Cart</h2>

<table>
	<tbody>
		{#each cartStore.cart as item}
			<tr>
				<td>{item.name}</td>
				<td>${item.price}</td>
				<td>
					<button
						onclick={() => item.amount > 1 && cartStore.decrement(item)}
						disabled={item.amount === 1}
					>
						-
					</button>
					<input type="number" bind:value={item.amount} min="1" style="text-align: center;" />
					<button onclick={() => cartStore.increment(item)}>+</button>
					<button onclick={() => cartStore.remove(item)}>🗑️</button>
				</td>
				<td align="right">${item.amount * item.price}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td colspan="3">Total:</td>
			<td align="right">${cartStore.totalPrice}</td>
		</tr>
		<tr>
			<td colspan="4" align="center">
				<button>Buy ({cartStore.totalItems})</button>
			</td>
		</tr>
	</tfoot>
</table>
