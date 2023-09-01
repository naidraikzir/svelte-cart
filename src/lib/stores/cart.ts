import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export type CartItem = {
	id: string;
	name: string;
	price: number;
	amount: number;
};

const cart = persist(writable<CartItem[]>([]), createIndexedDBStorage(), 'cart');

function add(item: CartItem) {
	if (!item.amount) return;

	cart.update((items) => {
		const index = items.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			items[index] = { ...items[index], amount: items[index].amount + item.amount };
		} else {
			items = [...items, item];
		}
		return items;
	});
}

function remove(item: CartItem) {
	cart.update((items) => {
		const index = items.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			items.splice(index, 1);
		}
		return items;
	});
}

function increment(item: CartItem) {
	cart.update((items) => {
		const index = items.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			items[index] = { ...items[index], amount: items[index].amount + 1 };
		}
		return items;
	});
}

function decrement(item: CartItem) {
	cart.update((items) => {
		const index = items.findIndex((i) => i.id === item.id);
		if (index >= 0) {
			items[index] = { ...items[index], amount: items[index].amount - 1 };
			if (items[index].amount === 0) {
				items.splice(index, 1);
			}
		}
		return items;
	});
}

export { add, remove, increment, decrement, cart };
