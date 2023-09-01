<script lang="ts">
	import { add } from '$lib/stores/cart';

	const products = [
		{ id: '151bc6b1-0f36-4d51-ba1c-b206175e5d99', name: 'Product A', price: 10 },
		{ id: 'ef76926a-dd1c-4a10-b77d-675b4865bc21', name: 'Product B', price: 20 },
		{ id: 'b2b09925-eab0-4bbf-a293-a0a16e98ab66', name: 'Product C', price: 30 },
		{ id: '70701d98-ace5-42a5-9787-29c74e61e7b5', name: 'Product D', price: 40 }
	];
</script>

<h2>Products</h2>

{#each products as product}
	<div style="margin-bottom: 20px;">
		<a href={`/product?id=${product.id}&name=${product.name}&price=${product.price}`}>
			{product.name}
		</a>
		<div>${product.price}</div>
		<button on:click={() => add({ ...product, amount: 1 })}>Add to cart</button>
	</div>
{/each}
