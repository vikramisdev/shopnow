"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface Order {
	_id: string;
	products: {
		productId: number;
		title: string;
		price: number;
		quantity: number;
		image: string;
	}[];
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

export default function OrdersPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!session?.user?.email) return;

		const fetchOrders = async () => {
			try {
				const res = await fetch("/api/order");
				if (!res.ok) throw new Error("Failed to fetch orders");

				const data = await res.json();
				setOrders(data || []); // ✅ Fix here
			} catch (err) {
				console.error("Error loading orders:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [session]);

	if (status === "loading" || loading) {
		return (
			<div className="min-h-screen p-10 space-y-4">
				<Skeleton className="h-10 w-40" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
			</div>
		);
	}

	if (!session?.user?.email) {
		return (
			<div className="h-screen flex flex-col justify-center items-center gap-4 text-center px-4">
				<h2 className="text-xl font-semibold">
					Please login to view your orders.
				</h2>
				<Button onClick={() => router.push("/login")}>
					Go to Login
				</Button>
			</div>
		);
	}

	if (!orders.length) {
		return (
			<div className="h-screen flex flex-col justify-center items-center gap-4 text-center px-4">
				<Image
					src="/images/empty-box.svg"
					alt="Empty Orders"
					width={200}
					height={200}
				/>
				<h2 className="text-lg text-muted-foreground">
					You have no orders yet.
				</h2>
				<Button onClick={() => router.push("/products")}>
					Start Shopping
				</Button>
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="max-w-5xl mx-auto px-4 py-12">
				<h1 className="text-3xl font-bold mb-8">My Orders</h1>

				<div className="space-y-6">
					{orders.map((order) => (
						<div
							key={order._id}
							className="border rounded-lg p-6 shadow-sm bg-white space-y-4"
						>
							<div className="flex justify-between items-center">
								<p className="text-sm text-muted-foreground">
									Ordered on{" "}
									{new Date(
										order.createdAt
									).toLocaleDateString()}
								</p>
								<span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
									{order.status}
								</span>
							</div>

							{order.products.map((product, idx) => (
								<div
									key={idx}
									className="flex gap-4 items-center"
								>
									<Image
										src={product.image}
										alt={product.title}
										width={80}
										height={80}
										className="rounded object-cover"
									/>
									<div className="flex-1">
										<h2 className="font-medium">
											{product.title}
										</h2>
										<p className="text-sm text-muted-foreground">
											Quantity: {product.quantity}
										</p>
										<p className="text-sm">
											₹
											{(
												product.price * product.quantity
											).toFixed(2)}
										</p>
									</div>
								</div>
							))}

							<div className="flex justify-between pt-2 text-sm">
								<div>
									<p>Shipping to:</p>
									<p className="text-muted-foreground">
										{order.address}
									</p>
								</div>
								<div className="text-right">
									<p>
										Total: ₹{order.totalAmount.toFixed(2)}
									</p>
									<p className="text-muted-foreground">
										Payment: {order.paymentMethod}
									</p>
								</div>
							</div>

							<p className="text-xs text-muted-foreground">
								Estimated Delivery:{" "}
								{new Date(
									order.deliveryEstimate.start
								).toLocaleDateString()}{" "}
								-{" "}
								{new Date(
									order.deliveryEstimate.end
								).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}
