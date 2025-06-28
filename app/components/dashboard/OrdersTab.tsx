"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetOrdersQuery } from "../../../store/services/userApi";
import { PackageSearch, X } from "lucide-react";
import USDToINR from "@/app/utils/USDToINR";
import { toast } from "sonner";

interface ProductInOrder {
	productId: number;
	title: string;
	price: number;
	quantity: number;
	image: string;
}

interface Order {
	_id: string;
	products: ProductInOrder[];
	totalAmount: number;
	address: string;
	paymentMethod: string;
	status: string;
	deliveryEstimate: {
		start: string;
		end: string;
	};
	createdAt: string;
}

export default function OrdersTab() {
	const router = useRouter();
	const { data: orders = [], isLoading } = useGetOrdersQuery(undefined);

	const handleCancelOrder = (id: string) => {
		// You can connect this with your cancel API
		toast(`Order ${id} cancelled successfully`);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="h-10 w-40" />
				<Skeleton className="h-32 w-full" />
			</div>
		);
	}

	if (!orders.length) {
		return (
			<div className="text-center space-y-4 mt-16 text-muted-foreground">
				<Image
					src="/images/empty-box.svg"
					alt="No orders"
					width={200}
					height={200}
				/>
				<h2 className="text-xl font-semibold dark:text-white">
					No orders yet
				</h2>
				<p>Looks like you havent made any purchases.</p>
				<Button onClick={() => router.push("/products")}>
					Shop Now
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6 max-w-4xl">
			{/* My Orders Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<PackageSearch className="text-black dark:text-white w-6 h-6" />
					<h1 className="text-2xl font-bold dark:text-white">
						My Orders
					</h1>
					<span className="bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
						{orders.length} {orders.length === 1 ? "item" : "items"}
					</span>
				</div>
			</div>

			{/* Orders List */}
			{orders.map((order: Order) => (
				<Card
					key={order._id}
					className="border rounded-xl p-6 shadow-sm bg-white dark:bg-neutral-900 space-y-4"
				>
					{/* Order Meta Info */}
					<div className="flex justify-between items-center">
						<p className="text-sm text-muted-foreground">
							Ordered on{" "}
							{new Date(order.createdAt).toLocaleDateString(
								"en-IN",
								{
									day: "numeric",
									month: "long",
									year: "numeric",
								}
							)}
						</p>
						<div className="flex gap-2">
							<span
								className={`text-xs px-2 py-1 rounded-full capitalize ${
									order.status === "delivered"
										? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
										: order.status === "pending"
										? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
										: "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300"
								}`}
							>
								{order.status}
							</span>

							<span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
								{order.paymentMethod === "cash"
									? "Cash On Delivery"
									: order.paymentMethod.toUpperCase()}
							</span>
						</div>
					</div>

					{/* Product Items */}
					{order.products.map((product, idx) => (
						<div key={idx} className="flex gap-4 items-center">
							<Image
								src={product.image || "/images/default.png"}
								alt={product.title}
								width={80}
								height={80}
								className="rounded object-cover bg-gray-100 dark:bg-neutral-800"
							/>
							<div className="flex-1">
								<h2 className="font-medium dark:text-white">
									{product.title}
								</h2>
								<p className="text-sm text-muted-foreground">
									Quantity: {product.quantity}
								</p>
								<p className="text-sm font-medium dark:text-white">
									{USDToINR(
										Number(order.totalAmount.toFixed(0))
									)}
								</p>
							</div>
						</div>
					))}

					{/* Address & Totals */}
					<div className="flex justify-between pt-2 text-sm">
						<div>
							<p className="font-medium dark:text-white">
								Shipping to
							</p>
							<p className="text-muted-foreground">
								{order.address}
							</p>
						</div>
					</div>

					{/* Delivery Window */}
					<p className="text-xs text-muted-foreground">
						Estimated Delivery:{" "}
						{new Date(
							order.deliveryEstimate.start
						).toLocaleDateString()}{" "}
						–{" "}
						{new Date(
							order.deliveryEstimate.end
						).toLocaleDateString()}
					</p>

					{/* Cancel Button for pending orders */}
					{order.status === "pending" && (
						<div className="text-right">
							<Button
								variant="outline"
								className="text-red-600 border-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:border-red-400 dark:text-red-400"
								onClick={() => handleCancelOrder(order._id)}
							>
								<X className="w-4 h-4 mr-1" />
								Cancel Order
							</Button>
						</div>
					)}
				</Card>
			))}
		</div>
	);
}
