<script lang="ts">
	import { cart, increment, decrement, remove } from '$lib/stores/cart';

	$: totalPrice = $cart.reduce((acc, item) => acc + item.price * item.amount, 0);
	$: totalItems = $cart.reduce((acc, item) => acc + item.amount, 0);
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
	Total: ${totalPrice}
</div>

<button>Buy ({totalItems})</button>
