"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetCartQuery } from "@/store/services/userApi";
import CompactProduct from "../CompactProduct";

interface CartData {
	id: number;
	productId: number;
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	category: string;
}

export default function CartTab() {
	const router = useRouter();
	const { data = [], isLoading } = useGetCartQuery(undefined);
	const cartItems = data as CartData[];

	const totalAmount = cartItems.reduce(
		(acc, item) => acc + item.price * 83,
		0
	);

	if (isLoading) {
		return (
			<div className="space-y-6">
				<Skeleton className="h-8 w-40" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<Skeleton className="h-48 w-full" />
					<Skeleton className="h-48 w-full" />
					<Skeleton className="h-48 w-full" />
				</div>
			</div>
		);
	}

	if (!cartItems.length) {
		return (
			<div className="text-center space-y-4 pt-10">
				<Image
					src="/images/empty-cart.svg"
					alt="Empty Cart"
					width={200}
					height={200}
					className="mx-auto"
				/>
				<p className="text-muted-foreground">Your cart is empty.</p>
				<Button onClick={() => router.push("/products")}>
					Continue Shopping
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header with cart count */}
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold flex items-center gap-x-2">
					Your Cart
					<span className="text-sm bg-black text-white rounded-full px-2 py-0.5">
						{cartItems.length} item{cartItems.length > 1 ? "s" : ""}
					</span>
				</h2>
			</div>

			{/* Product list */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{cartItems.map((item: CartData) => (
					<CompactProduct
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						productId={item.productId}
						thumbnail={item.thumbnail}
						description={item.description}
						category={item.category}
						onClick={() => router.push(`/product/${item.id}`)}
					/>
				))}
			</div>

			{/* Total summary & checkout */}
			<div className="flex justify-end flex-col items-end space-y-2">
				<p className="text-lg font-semibold">
					Total: ₹{totalAmount.toFixed(0)}
				</p>
				<p className="text-sm text-muted-foreground">
					(Inclusive of estimated taxes)
				</p>
				<Button
					className="rounded-md mt-2"
					onClick={() => router.push("/checkout")}
				>
					Go to Checkout
				</Button>
			</div>
		</div>
	);
}
