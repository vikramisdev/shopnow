"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Quantity from "./Quantity";
import RadioAccordian from "./RadioAccordian";
import PaymentMethods from "./other";
import CreditCard from "./CreditCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductData {
	id?: number;
	title: string;
	description?: string;
	price: number;
	category?: string;
	thumbnail?: string;
	images: string[];
}

function Bill({ title, images, description, price, id }: ProductData) {
	const { data: session } = useSession();
	const router = useRouter();

	const user = session?.user as {
		id: string;
		name: string;
		email: string;
		image: string;
	}; // 🔥 FIXED

	const [quantity, setQuantity] = useState(1);
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethods | null>(
		null
	);
	const [isPlacing, setIsPlacing] = useState(false);

	const handleSelect = (method: PaymentMethods) => {
		setSelectedMethod((prev) => (prev === method ? null : method));
	};

	const today = new Date();
	const arrivalStart = new Date(today);
	arrivalStart.setDate(today.getDate() + 5);
	const arrivalEnd = new Date(today);
	arrivalEnd.setDate(today.getDate() + 10);

	const formatDate = (date: Date) =>
		`${date.toLocaleString("default", {
			weekday: "short",
		})}, ${date.getDate()} ${date.toLocaleString("default", {
			month: "short",
		})}`;

	const deliveryFee = 5;
	const total = price * quantity + deliveryFee;

	const placeOrder = async () => {
		if (!session || !session.user) {
			alert("⚠️ You must be logged in to place an order.");
			return;
		}

		if (!selectedMethod) {
			alert("❌ Please select a payment method.");
			return;
		}

		setIsPlacing(true);

		try {
			const res = await fetch("/api/order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					products: [
						{
							productId: id,
							title,
							price,
							quantity,
							image: images[0],
						},
					],
					totalAmount: total,
					address:
						"Santaji Chowk, Abhona 423502, Tal. Kalwan, Dist. Nashik, Maharashtra",
					paymentMethod: PaymentMethods[selectedMethod],
					deliveryEstimate: {
						start: arrivalStart,
						end: arrivalEnd,
					},
				}),
			});

			if (res.ok) {
				alert("✅ Order placed successfully!");
				router.push("/orders");
			} else {
				alert("❌ Failed to place order.");
			}
		} catch (error) {
			console.error("Order error:", error);
			alert("❌ Something went wrong.");
		} finally {
			setIsPlacing(false);
		}
	};

	return (
		<div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
			<div className="w-full max-w-5xl space-y-12">
				<h1 className="text-3xl font-semibold text-gray-900">
					Order Summary
				</h1>

				{/* Product Card */}
				<div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
					<Image
						className="w-full lg:w-80 h-auto object-cover"
						src={images[0]}
						height={400}
						width={400}
						alt="product"
					/>

					<div className="flex-1 p-6 space-y-4">
						<h2 className="text-2xl font-bold text-gray-800">
							{title}
						</h2>
						<p className="text-gray-600">{description}</p>

						<Quantity
							itemCount={quantity}
							setItemCount={setQuantity}
						/>

						<p className="text-sm text-green-700 bg-green-100 inline-block px-2 py-1 rounded">
							Delivery estimate: {formatDate(arrivalStart)} –{" "}
							{formatDate(arrivalEnd)}
						</p>

						<div className="pt-4 space-y-2 text-base">
							<div className="flex justify-between text-gray-700">
								<span>Subtotal</span>
								<span>₹{(price * quantity).toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-gray-700">
								<span>Shipping</span>
								<span>₹{deliveryFee.toFixed(2)}</span>
							</div>
							<hr />
							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span>₹{total.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Address */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Shipping Address
					</h3>
					<p className="text-gray-700 mb-4">
						Santaji Chowk, Abhona 423502, Tal. Kalwan, Dist. Nashik,
						Maharashtra
					</p>
					<Button variant="outline" className="text-sm">
						Change Address
					</Button>
				</div>

				{/* Payment */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						Payment Method
					</h3>
					<div className="space-y-4">
						<RadioAccordian
							name="credit"
							title="Credit/Debit Card"
							isOpen={
								selectedMethod === PaymentMethods.creditCard
							}
							onSelect={() =>
								handleSelect(PaymentMethods.creditCard)
							}
						>
							<CreditCard />
						</RadioAccordian>

						<RadioAccordian
							name="upi"
							title="UPI"
							isOpen={selectedMethod === PaymentMethods.upi}
							onSelect={() => handleSelect(PaymentMethods.upi)}
						>
							<input
								type="text"
								placeholder="example@upi"
								className="w-full px-3 py-2 border rounded-md"
							/>
						</RadioAccordian>

						<RadioAccordian
							name="cod"
							title="Cash on Delivery"
							isOpen={
								selectedMethod === PaymentMethods.cashOnDelivery
							}
							onSelect={() =>
								handleSelect(PaymentMethods.cashOnDelivery)
							}
						>
							<p className="text-sm text-gray-600 px-2">
								Please note: COD may increase delivery time by
								1–2 days.
							</p>
						</RadioAccordian>
					</div>
				</div>

				{/* Confirm */}
				<div className="flex justify-end">
					<Button
						className="w-full sm:w-auto px-8 py-2 text-base"
						onClick={placeOrder}
						disabled={isPlacing}
					>
						{isPlacing ? "Placing..." : "Place Order"}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Bill;
