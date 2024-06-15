<script lang="ts">
	import { cart, increment, decrement, remove, totalItems, totalPrice } from '$lib/stores/cart';
</script>

<h2>Cart</h2>

{#each $cart as item}
	<div style="margin-bottom: 10px;">
		<span>{item.name}</span>
		<span>${item.price}</span>
		<span>
			<button on:click={() => item.amount > 1 && decrement(item)} disabled={item.amount === 1}>
				-
			</button>
			<input type="number" bind:value={item.amount} min="1" />
			<button on:click={() => increment(item)}>+</button>
			<button on:click={() => remove(item)}>🗑️</button>
		</span>
		<span>${item.amount * item.price}</span>
	</div>
{/each}

<div>
	Total: ${$totalPrice}
	<button>Buy ({$totalItems})</button>
</div>
