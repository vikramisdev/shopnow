"use client";

import {
	ArrowRight,
	CheckSquare,
	Heart,
	Loader2,
	ShoppingBagIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useMemo } from "react";
import { toast } from "sonner";
import Button from "./Button";
import {
	useToggleCartItemMutation,
	useToggleFavoriteMutation,
	useGetCartQuery,
	useGetFavoritesQuery,
} from "@/store/services/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import USDToINR from "../utils/USDToINR";

interface ItemProps {
	id: number;
	thumbnail: string;
	title: string;
	description: string;
	price: number;
	category: string;
	onClick?: () => void;
	isInCart?: boolean;
	isFavorite?: boolean;
}

interface UserItem {
	productId: number;
	title: string;
	price: number;
	thumbnail: string;
	category: string;
}

export default function Product(props: ItemProps) {
	const router = useRouter();

	const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined);
	const { data: favoritesData, refetch: refetchFavorites } =
		useGetFavoritesQuery(undefined);
	const [toggleCartItem, { isLoading: cartLoading }] =
		useToggleCartItemMutation();
	const [toggleFavoriteItem, { isLoading: favoriteLoading }] =
		useToggleFavoriteMutation();

	const isInCart = useMemo(() => {
		if (typeof props.isInCart === "boolean") return props.isInCart;
		return cartData?.some((item: UserItem) => item.productId === props.id);
	}, [props.isInCart, cartData, props.id]);

	const isFavorite = useMemo(() => {
		if (typeof props.isFavorite === "boolean") return props.isFavorite;
		return favoritesData?.some(
			(item: UserItem) => item.productId === props.id
		);
	}, [props.isFavorite, favoritesData, props.id]);

	const productData: UserItem = {
		productId: props.id,
		title: props.title,
		price: props.price,
		thumbnail: props.thumbnail,
		category: props.category,
	};

	const handleBuyNow = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/bill?category=${props.category}&id=${props.id}`);
	};

	const toggleCart = async (e: MouseEvent) => {
		e.stopPropagation();
		try {
			await toggleCartItem(productData).unwrap();
			await refetchCart();
			toast.success(isInCart ? "Removed from cart" : "Added to cart");
		} catch (err) {
			const error = err as FetchBaseQueryError;
			if (error?.status === 401) {
				toast.error("Please log in to add items to cart", {
					id: "auth-cart",
				});
			} else {
				toast.error("Cart update failed", { id: "fail-cart" });
				console.error("Cart toggle error:", error);
			}
		}
	};

	const toggleFavorite = async (e: MouseEvent) => {
		e.stopPropagation();
		try {
			await toggleFavoriteItem(productData).unwrap();
			await refetchFavorites();
			toast.success(
				isFavorite ? "Removed from favorites" : "Added to favorites"
			);
		} catch (err) {
			const error = err as FetchBaseQueryError;
			if (error?.status === 401) {
				toast.error("Please log in to update favorites", {
					id: "auth-fav",
				});
			} else {
				toast.error("Favorite update failed", { id: "fail-fav" });
				console.error("Favorite toggle error:", error);
			}
		}
	};

	return (
		<div
			onClick={props.onClick}
			className="p-2 w-full sm:w-[48%] md:w-72 flex flex-col rounded-2xl gap-y-3 shadow-md transition-transform hover:-translate-y-2 cursor-pointer bg-white dark:bg-neutral-900"
		>
			{/* Image + Actions */}
			<div
				className="h-96 bg-slate-100 dark:bg-neutral-800 bg-center bg-cover rounded-2xl p-4 flex flex-col justify-between"
				style={{ backgroundImage: `url(${props.thumbnail})` }}
			>
				{/* Favorite Button */}
				<div className="flex justify-end">
					<Button onClick={toggleFavorite}>
						{favoriteLoading ? (
							<Loader2 className="animate-spin text-gray-500 dark:text-gray-300" />
						) : (
							<Heart
								className={`transition-colors ${
									isFavorite
										? "text-red-500"
										: "text-gray-500 dark:text-gray-300"
								}`}
								strokeWidth={2}
								fill={isFavorite ? "currentColor" : "none"}
							/>
						)}
					</Button>
				</div>

				{/* Bottom Buttons */}
				<div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-2 mt-auto">
					{/* Cart & Price */}
					<div className="flex items-center justify-between gap-2 w-full md:w-auto">
						{/* Add to Cart */}
						<Button onClick={toggleCart}>
							{cartLoading ? (
								<Loader2 className="animate-spin text-gray-500 dark:text-gray-300" />
							) : isInCart ? (
								<CheckSquare className="text-blue-500" />
							) : (
								<ShoppingBagIcon className="text-gray-500 dark:text-gray-300" />
							)}
						</Button>

						{/* Price */}
						<div className="bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded-full text-sm h-10 flex items-center">
							{USDToINR(props.price)}
						</div>
					</div>

					{/* Buy Now */}
					<div
						onClick={handleBuyNow}
						className="group flex items-center justify-center gap-2 bg-black bg-opacity-60 dark:bg-white dark:bg-opacity-80 px-4 py-2 rounded-full text-white dark:text-black text-sm transition w-full md:w-auto"
					>
						<span>Buy Now</span>
						<ArrowRight className="bg-white text-black dark:bg-black dark:text-white h-6 w-6 p-1 rounded-full group-hover:rotate-90 transition-transform duration-500" />
					</div>
				</div>
			</div>

			{/* Info Section */}
			<div className="bg-gray-200 dark:bg-neutral-800 rounded-2xl p-4 h-20">
				<h2 className="text-lg font-semibold text-black dark:text-white truncate">
					{props.title}
				</h2>
				<p className="text-sm text-gray-700 dark:text-neutral-300 truncate">
					{props.description}
				</p>
			</div>
		</div>
	);
}
