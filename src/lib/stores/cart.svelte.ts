import type { CartItem } from '$lib/types';
import { get, set } from 'idb-keyval';

const KEY = 'cart';

function createCartStore() {
	let cart = $state<CartItem[]>([]);
	const totalItems = $derived(cart.reduce((acc, item) => acc + item.amount, 0));
	const totalPrice = $derived(cart.reduce((acc, item) => acc + item.amount * item.price, 0));

	const cleanup = $effect.root(() => {
		$effect(() => {
			rehydrate();
		});

		$effect(() => {
			persist(cart);
		});

		return () => {
			cleanup();
		};
	});

	async function rehydrate() {
		const persisted = await get(KEY);
		if (persisted) {
			cart = JSON.parse(persisted);
		}
	}

	function persist(cart: CartItem[]) {
		set(KEY, JSON.stringify(cart));
	}

	function add(item: CartItem) {
		if (!item.amount) return;
		const index = cart.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			cart[index] = { ...cart[index], amount: cart[index].amount + item.amount };
		} else {
			cart = [...cart, item];
		}
	}

	function remove(item: CartItem) {
		const index = cart.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			cart.splice(index, 1);
		}
	}

	function increment(item: CartItem) {
		const index = cart.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			cart[index] = { ...cart[index], amount: cart[index].amount + 1 };
		}
	}

	function decrement(item: CartItem) {
		const index = cart.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			cart[index] = { ...cart[index], amount: cart[index].amount - 1 };
			if (cart[index].amount === 0) {
				cart.splice(index, 1);
			}
		}
	}

	return {
		get cart() {
			return cart;
		},
		get totalItems() {
			return totalItems;
		},
		get totalPrice() {
			return totalPrice;
		},
		add,
		remove,
		increment,
		decrement
	};
}

export const cartStore = createCartStore();
