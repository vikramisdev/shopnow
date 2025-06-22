"use client";

import { useRouter } from "next/navigation";
import {
	ArrowRight,
	CheckSquare,
	Heart,
	Loader2,
	ShoppingBagIcon,
} from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "./Button";

interface ItemProps {
	id: string;
	thumbnail: string;
	title: string;
	description: string;
	price: number;
	category: string;
	onClick?: () => void;
	isInCart?: boolean;
	isFavorite?: boolean;
}

export default function Product(props: ItemProps) {
	const router = useRouter();
	const [inCart, setInCart] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const [cartLoading, setCartLoading] = useState(false);
	const [favoriteLoading, setFavoriteLoading] = useState(false);

	useEffect(() => {
		setInCart(props.isInCart ?? false);
		setFavorite(props.isFavorite ?? false);
	}, [props.isInCart, props.isFavorite]);

	const handleBuyNow = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/bill?category=${props.category}&id=${props.id}`);
	};

	const toggleCart = async (e: MouseEvent) => {
		e.stopPropagation();
		setCartLoading(true);

		try {
			const res = await fetch("/api/cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					productId: Number(props.id),
					title: props.title,
					price: props.price,
					thumbnail: props.thumbnail,
					category: props.category,
				}),
			});

			if (res.ok) {
				const { message } = await res.json();
				setInCart((prev) => !prev);
				toast.success(message);
			} else {
				toast.error("Cart action failed");
			}
		} catch (err) {
			toast.error(`Something went wrong ${err}`);
		} finally {
			setCartLoading(false);
		}
	};

	const toggleFavorite = async (e: MouseEvent) => {
		e.stopPropagation();
		setFavoriteLoading(true);

		try {
			const res = await fetch("/api/favorite", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					productId: Number(props.id),
					title: props.title,
					price: props.price,
					thumbnail: props.thumbnail,
					category: props.category,
				}),
			});

			if (res.ok) {
				const { message } = await res.json();
				setFavorite((prev) => !prev);
				toast.success(message);
			} else {
				toast.error("Favorite action failed");
			}
		} catch (err) {
			toast.error(`Something went wrong ${err}`);
		} finally {
			setFavoriteLoading(false);
		}
	};

	return (
		<div
			onClick={props.onClick}
			className="p-2 w-72 flex flex-col rounded-2xl gap-y-3 shadow-md transition-transform hover:-translate-y-2 cursor-pointer"
		>
			{/* Image Background with Actions */}
			<div
				className="h-96 bg-slate-100 bg-center bg-cover rounded-2xl p-4 flex flex-col justify-between"
				style={{ backgroundImage: `url(${props.thumbnail})` }}
			>
				{/* Favorite Button */}
				<div className="flex justify-end">
					<Button onClick={toggleFavorite}>
						{favoriteLoading ? (
							<Loader2 className="animate-spin text-gray-500" />
						) : (
							<Heart
								className={`transition-colors ${
									favorite ? "text-red-500" : "text-gray-500"
								}`}
								strokeWidth={2}
								fill={favorite ? "currentColor" : "none"}
							/>
						)}
					</Button>
				</div>

				{/* Bottom Row: Buy, Cart, Price */}
				<div className="flex items-center justify-between mt-auto gap-2">
					{/* Buy Now */}
					<div
						onClick={handleBuyNow}
						className="group flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-full text-white text-sm transition"
					>
						<span>Buy Now</span>
						<ArrowRight className="bg-white text-black h-6 w-6 p-1 rounded-full group-hover:rotate-90 transition-transform duration-500" />
					</div>

					{/* Add to Cart */}
					<Button onClick={toggleCart}>
						{cartLoading ? (
							<Loader2 className="animate-spin text-gray-500" />
						) : inCart ? (
							<CheckSquare className="text-blue-500" />
						) : (
							<ShoppingBagIcon className="text-gray-500" />
						)}
					</Button>

					{/* Price */}
					<div className="bg-black text-white px-3 py-2 rounded-full text-sm h-10 flex items-center">
						₹{props.price}
					</div>
				</div>
			</div>

			{/* Product Details */}
			<div className="bg-gray-200 rounded-2xl p-4 h-20">
				<h2 className="text-lg font-semibold truncate">
					{props.title}
				</h2>
				<p className="text-sm text-gray-700 truncate">
					{props.description}
				</p>
			</div>
		</div>
	);
}
