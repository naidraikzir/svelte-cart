<script lang="ts">
	import { cart } from '$lib/stores/cart';

	$: totalItems = $cart.reduce((acc, item) => acc + item.amount, 0);
</script>

<div style="margin-bottom: 10px;">
	<a href="/">Products</a>
	<a href="/cart">🛒 Cart ({totalItems})</a>
</div>

<slot />
