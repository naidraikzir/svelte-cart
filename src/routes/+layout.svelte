<script lang="ts">
	import { totalItems } from '$lib/stores/cart';
</script>

<div style="margin-bottom: 10px;">
	<a href="/">Products</a>
	<a href="/cart">🛒 Cart ({$totalItems})</a>
</div>

<slot />
