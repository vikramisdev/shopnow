"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const menuItems = [
	{ label: "Profile", id: "profile" },
	{ label: "Orders", id: "orders" },
	{ label: "Cart", id: "cart" },
	{ label: "Favorites", id: "favorites" },
	{ label: "Settings", id: "settings" },
];

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

export default function DashboardPage() {
	const searchParams = useSearchParams();
	const initialTab = searchParams.get("tab") || "profile";

	const router = useRouter();

	const [active, setActive] = useState(initialTab);
	const [name, setName] = useState("John Doe");
	const [email, setEmail] = useState("john@example.com");
	const [updating, setUpdating] = useState(false);

	const [orders, setOrders] = useState<Order[]>([]);
	const [loadingOrders, setLoadingOrders] = useState(true);

	useEffect(() => {
		if (active === "orders") {
			const fetchOrders = async () => {
				try {
					const res = await fetch("/api/order");
					if (!res.ok) throw new Error("Failed to fetch orders");
					const data = await res.json();
					setOrders(data || []);
				} catch (err) {
					console.error("Error loading orders:", err);
				} finally {
					setLoadingOrders(false);
				}
			};
			fetchOrders();
		}
	}, [active]);

	const handleProfileUpdate = async () => {
		setUpdating(true);
		try {
			const res = await fetch("/api/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to update");
			alert("Profile updated successfully");
		} catch (err) {
			alert("Update failed");
			console.error(err);
		} finally {
			setUpdating(false);
		}
	};

	const contentMap: Record<string, JSX.Element> = {
		profile: (
			<div className="space-y-6 max-w-xl">
				<h2 className="text-xl font-semibold">Your Profile</h2>
				<p className="text-sm text-muted-foreground">
					Manage your personal information.
				</p>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Name
						</label>
						<Input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="John Doe"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Email
						</label>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="john@example.com"
						/>
					</div>
					<Button
						onClick={handleProfileUpdate}
						disabled={updating}
						className="bg-black text-white hover:bg-gray-900"
					>
						{updating ? "Updating..." : "Update Profile"}
					</Button>
				</div>
			</div>
		),
		orders: loadingOrders ? (
			<div className="space-y-4">
				<Skeleton className="h-10 w-40" />
				<Skeleton className="h-32 w-full" />
			</div>
		) : !orders.length ? (
			<div className="text-center space-y-4">
				<Image
					src="/images/empty-box.svg"
					alt="No orders"
					width={200}
					height={200}
				/>
				<p className="text-muted-foreground">No orders yet.</p>
				<Button onClick={() => router.push("/products")}>
					Shop Now
				</Button>
			</div>
		) : (
			<div className="space-y-6 max-w-4xl">
				{orders.map((order) => (
					<div
						key={order._id}
						className="border rounded-lg p-6 shadow-sm bg-white space-y-4"
					>
						<div className="flex justify-between items-center">
							<p className="text-sm text-muted-foreground">
								Ordered on{" "}
								{new Date(order.createdAt).toLocaleDateString()}
							</p>
							<span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
								{order.status}
							</span>
						</div>

						{order.products.map((product, idx) => (
							<div key={idx} className="flex gap-4 items-center">
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
								<p>Total: ₹{order.totalAmount.toFixed(2)}</p>
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
		),
		cart: (
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Shopping Cart</h2>
				<Card>
					<CardContent className="p-4">
						You have 2 items in your cart.
					</CardContent>
				</Card>
			</div>
		),
		favorites: (
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Favorites</h2>
				<Card>
					<CardContent className="p-4">
						You have 3 favorite products.
					</CardContent>
				</Card>
			</div>
		),
		settings: (
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Settings</h2>
				<Card>
					<CardContent className="p-4">
						Notification settings, privacy options, etc.
					</CardContent>
				</Card>
			</div>
		),
	};

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<aside className="w-64 bg-gray-100 p-4 border-r">
				<div className="mb-6">
					<Link href="/">
						<Button
							variant="ghost"
							className="text-sm px-2 text-black hover:text-gray-700"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Home
						</Button>
					</Link>
				</div>
				<div className="space-y-2">
					{menuItems.map((item) => (
						<Button
							key={item.id}
							variant="ghost"
							className={cn(
								"w-full justify-start px-3 text-sm",
								active === item.id &&
									"bg-black text-white hover:bg-black"
							)}
							onClick={() => {
								setActive(item.id);
								router.push(`/dashboard?tab=${item.id}`);
							}}
						>
							{item.label}
						</Button>
					))}
				</div>
			</aside>

			{/* Main content */}
			<main className="flex-1 p-6 bg-white overflow-auto">
				{contentMap[active]}
			</main>
		</div>
	);
}
