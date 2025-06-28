"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePlaceOrderMutation } from "@/store/services/userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BillPageSkeleton from "../components/skeletons/BillPageSkeleton";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	thumbnail: string;
}

function Bill() {
	const router = useRouter();
	const params = useSearchParams();
	const id = params.get("id");

	const { data: session } = useSession();

	const [product, setProduct] = useState<Product | null>(null);
	const [qty, setQty] = useState(1);
	const [address, setAddress] = useState("");
	const [payment, setPayment] = useState("cashOnDelivery");
	const [loading, setLoading] = useState(true);
	const [placeOrder, { isLoading: ordering }] = usePlaceOrderMutation();

	useEffect(() => {
		if (!id) return;

		setLoading(true);

		axiosInstance
			.get(`/products/${id}`)
			.then((res) => {
				const data = res.data;
				setProduct({
					id: data.id,
					title: data.title,
					description: data.description,
					price: data.price,
					thumbnail: data.thumbnail,
				});
			})
			.catch((err) => {
				console.error(err);
				toast.error("Product loading failed.");
			})
			.finally(() => setLoading(false));
	}, [id]);

	const total = product ? product.price * qty : 0;

	const handleOrder = async () => {
		if (!session) {
			toast.error("Please login or Sign Up first");
			return;
		}

		if (!product) return;

		if (!address.trim()) {
			toast.error("Please enter a shipping address");
			return;
		}

		try {
			await placeOrder({
				products: [
					{
						productId: product.id,
						title: product.title,
						price: product.price,
						quantity: qty,
						image: product.thumbnail,
					},
				],
				totalAmount: total,
				address,
				paymentMethod: payment,
				deliveryEstimate: {
					start: new Date().toISOString(),
					end: new Date(
						Date.now() + 5 * 24 * 60 * 60 * 1000
					).toISOString(),
				},
			}).unwrap();

			toast.success("Order placed successfully 🎉");
			setTimeout(() => router.push("/"), 1500);
		} catch (err) {
			console.error(err);
			toast.error("Failed to place order");
		}
	};

	if (!id || loading || !product) return <BillPageSkeleton />;

	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
			<Header />

			<main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-36">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
					<div className="w-full">
						<Image
							src={product.thumbnail}
							alt={product.title}
							width={600}
							height={600}
							className="rounded-xl object-cover w-full h-auto max-h-[500px]"
						/>
					</div>

					<div className="space-y-6">
						<h1 className="text-3xl font-semibold">
							Checkout: {product.title}
						</h1>
						<p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
							{product.description}
						</p>
						<p className="text-2xl font-bold text-black dark:text-white">
							₹{(total * 83).toFixed(0)}
						</p>

						<div className="space-y-4">
							<div>
								<Label className="mb-1 block">Quantity</Label>
								<Input
									type="number"
									min={1}
									value={qty}
									onChange={(e) =>
										setQty(
											Math.max(
												1,
												parseInt(e.target.value) || 1
											)
										)
									}
								/>
							</div>

							<div>
								<Label className="mb-1 block">
									Shipping Address
								</Label>
								<Input
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									placeholder="123 Main St, City, Country"
								/>
							</div>

							<div>
								<Label className="mb-1 block">
									Payment Method
								</Label>
								<select
									value={payment}
									onChange={(e) => setPayment(e.target.value)}
									className="w-full border px-3 py-2 rounded-md text-sm dark:bg-zinc-800 dark:text-white"
								>
									<option value="cashOnDelivery">
										Cash on Delivery
									</option>
									<option value="upi">UPI</option>
									<option value="creditCard">
										Credit/Debit Card
									</option>
								</select>
							</div>

							{payment === "upi" && (
								<div className="space-y-2 mt-2">
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Scan to pay <strong>vikram@upi</strong>
									</p>
									<Image
										src="/images/upi-placeholder-qr.png"
										alt="UPI QR Code"
										width={200}
										height={200}
										className="rounded-md border w-40"
									/>
								</div>
							)}

							{payment === "creditCard" && (
								<div className="space-y-2 mt-2">
									<Input
										type="text"
										placeholder="Card Number"
										className="text-sm"
										maxLength={19}
									/>
									<div className="flex gap-2">
										<Input
											type="text"
											placeholder="MM/YY"
											className="text-sm"
											maxLength={5}
										/>
										<Input
											type="text"
											placeholder="CVV"
											className="text-sm"
											maxLength={3}
										/>
									</div>
								</div>
							)}
						</div>

						<Button
							onClick={handleOrder}
							disabled={ordering}
							className="w-full bg-black text-white py-2 text-md rounded-lg hover:bg-gray-900 dark:hover:bg-gray-800 transition"
						>
							{ordering
								? "Processing..."
								: payment === "cashOnDelivery"
								? "Place Order"
								: `Pay ₹${total.toFixed(2)}`}
						</Button>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default function BillPage() {
	return (
		<Suspense>
			<Bill />
		</Suspense>
	);
}
