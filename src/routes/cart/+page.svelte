<script lang="ts">
	import { cart, increment, decrement, remove, totalItems, totalPrice } from '$lib/stores/cart';
</script>

<h2>Cart</h2>

<table>
	<tbody>
		{#each $cart as item}
			<tr>
				<td>{item.name}</td>
				<td>${item.price}</td>
				<td>
					<button onclick={() => item.amount > 1 && decrement(item)} disabled={item.amount === 1}>
						-
					</button>
					<input type="number" bind:value={item.amount} min="1" style="text-align: center;" />
					<button onclick={() => increment(item)}>+</button>
					<button onclick={() => remove(item)}>🗑️</button>
				</td>
				<td align="right">${item.amount * item.price}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td colspan="3">Total:</td>
			<td align="right">${$totalPrice}</td>
		</tr>
		<tr>
			<td colspan="4" align="center">
				<button>Buy ({$totalItems})</button>
			</td>
		</tr>
	</tfoot>
</table>
