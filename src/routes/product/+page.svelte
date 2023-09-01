<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { add } from '$lib/stores/cart';

	let product: { id: string; name: string; price: number };

	onMount(() => {
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

	let amount = 1;
</script>

<h2>Product</h2>

{#if product}
	<div>{product.name}</div>
	<div>${product.price}</div>
	<div>
		<button on:click={() => amount > 1 && amount--} disabled={amount === 1}>-</button>
		<input type="number" bind:value={amount} min="1" />
		<button on:click={() => amount++}>+</button>
	</div>
	<button style="margin-top: 10px;" on:click={() => add({ ...product, amount })}>
		Add to cart
	</button>
{/if}
