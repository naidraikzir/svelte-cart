<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { cartStore } from '$lib/stores/cart.svelte';
	import type { Product } from '$lib/types';

	let product = $state<Product>({
		id: '',
		name: '',
		price: 0
	});

	let amount = $state(1);

	$effect(() => {
		const params = [...$page.url.searchParams.keys()];
		if (!['id', 'name', 'price'].every((key) => params.includes(key))) {
			goto('/');
		} else {
			product = {
				id: $page.url.searchParams.get('id') || '',
				name: $page.url.searchParams.get('name') || '',
				price: Number($page.url.searchParams.get('price')) || 0
			};
		}
	});
</script>

<h2>Product</h2>

{#if product}
	<div>{product.name}</div>
	<div>${product.price}</div>
	<div>
		<button onclick={() => amount > 1 && amount--} disabled={amount === 1}>-</button>
		<input type="number" bind:value={amount} min="1" />
		<button onclick={() => amount++}>+</button>
	</div>
	<button style="margin-top: 10px;" onclick={() => cartStore.add({ ...product, amount })}>
		Add to cart
	</button>
{/if}
