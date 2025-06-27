"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetOrdersQuery } from "../../../store/services/userApi";
import { PackageSearch } from "lucide-react";
import USDToINR from "@/app/utils/USDToINR";

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
			<div className="text-center space-y-4 mt-16">
				<Image
					src="/images/empty-box.svg"
					alt="No orders"
					width={200}
					height={200}
				/>
				<h2 className="text-xl font-semibold">No orders yet</h2>
				<p className="text-muted-foreground">
					Looks like you havent made any purchases.
				</p>
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
					<PackageSearch className="text-black w-6 h-6" />
					<h1 className="text-2xl font-bold">My Orders</h1>
					<span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">
						{orders.length} {orders.length === 1 ? "item" : "items"}
					</span>
				</div>
			</div>

			{/* Orders List */}
			{orders.map((order: Order) => (
				<Card
					key={order._id}
					className="border rounded-xl p-6 shadow-sm bg-white space-y-4"
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
							{/* Status */}
							<span
								className={`text-xs px-2 py-1 rounded-full capitalize ${
									order.status === "delivered"
										? "bg-green-100 text-green-700"
										: order.status === "pending"
										? "bg-yellow-100 text-yellow-700"
										: "bg-gray-100 text-gray-600"
								}`}
							>
								{order.status}
							</span>

							{/* Payment Method */}
							<span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
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
								className="rounded object-cover bg-gray-100"
							/>
							<div className="flex-1">
								<h2 className="font-medium">{product.title}</h2>
								<p className="text-sm text-muted-foreground">
									Quantity: {product.quantity}
								</p>
								<p className="text-sm font-medium">
									₹
									{(product.price * product.quantity).toFixed(
										2
									)}
								</p>
							</div>
						</div>
					))}

					{/* Address & Totals */}
					<div className="flex justify-between pt-2 text-sm">
						<div>
							<p className="font-medium">Shipping to</p>
							<p className="text-muted-foreground">
								{order.address}
							</p>
						</div>
						<div className="text-right">
							<p className="font-medium">
								Total: ₹
								{USDToINR(Number(order.totalAmount.toFixed(0)))}
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
				</Card>
			))}
		</div>
	);
}
