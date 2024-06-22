export type Product = {
	id: string;
	name: string;
	price: number;
};

export type CartItem = Product & {
	amount: number;
};
