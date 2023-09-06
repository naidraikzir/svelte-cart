<script lang="ts">
	import { cart, increment, decrement, remove, totalItems, totalPrice } from '$lib/stores/cart';
</script>

<h2>Cart</h2>

{#each $cart as item}
	<div style="margin-bottom: 20px;">
		<div>{item.name}</div>
		<div>${item.price}</div>
		<div>
			<button on:click={() => item.amount > 1 && decrement(item)} disabled={item.amount === 1}>
				-
			</button>
			<input type="number" bind:value={item.amount} min="1" />
			<button on:click={() => increment(item)}>+</button>
			<button on:click={() => remove(item)}>🗑️</button>
		</div>
	</div>
{/each}

<div>
	Total: ${$totalPrice}
</div>

<button>Buy ({$totalItems})</button>
