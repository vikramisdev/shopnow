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
import { Button } from "@/components/ui/button";
import {
	useToggleCartItemMutation,
	useToggleFavoriteMutation,
	useGetCartQuery,
	useGetFavoritesQuery,
} from "@/store/services/userApi";

interface ItemProps {
	id: number;
	productId?: number;
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

const toINR = (usd: number) =>
	`₹${Math.round(usd * 83).toLocaleString("en-IN")}`;

export default function CompactProduct(props: ItemProps) {
	const router = useRouter();
	const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined);
	const { data: favoritesData, refetch: refetchFavorites } =
		useGetFavoritesQuery(undefined);
	const [toggleCartItem, { isLoading: cartLoading }] =
		useToggleCartItemMutation();
	const [toggleFavoriteItem, { isLoading: favoriteLoading }] =
		useToggleFavoriteMutation();

	const resolvedProductId = props.productId ?? props.id;

	const isInCart = useMemo(
		() =>
			typeof props.isInCart === "boolean"
				? props.isInCart
				: cartData?.some(
						(item: UserItem) => item.productId === resolvedProductId
				  ),
		[props.isInCart, cartData, resolvedProductId]
	);

	const isFavorite = useMemo(
		() =>
			typeof props.isFavorite === "boolean"
				? props.isFavorite
				: favoritesData?.some(
						(item: UserItem) => item.productId === resolvedProductId
				  ),
		[props.isFavorite, favoritesData, resolvedProductId]
	);

	const productData: UserItem = {
		productId: resolvedProductId,
		title: props.title,
		price: props.price,
		thumbnail: props.thumbnail,
		category: props.category,
	};

	const handleBuyNow = (e: MouseEvent) => {
		e.stopPropagation();
		router.push(`/bill?category=${props.category}&id=${resolvedProductId}`);
	};

	const toggleCart = async (e: MouseEvent) => {
		e.stopPropagation();
		try {
			await toggleCartItem(productData).unwrap();
			await refetchCart();
			toast.success(isInCart ? "Removed from cart" : "Added to cart");
		} catch {
			toast.error("Cart update failed");
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
		} catch {
			toast.error("Favorite update failed");
		}
	};

	const handleProductClick = () => {
		router.push(
			`/products?category=${props.category}&id=${resolvedProductId}`
		);
	};

	return (
		<div
			onClick={handleProductClick}
			className="flex gap-4 p-4 bg-gradient-to-tr from-gray-50 via-white to-gray-100 shadow-lg rounded-2xl items-center transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
		>
			{/* Thumbnail */}
			<div
				className="w-24 h-24 bg-cover bg-center rounded-xl border border-gray-300"
				style={{ backgroundImage: `url(${props.thumbnail})` }}
			/>

			{/* Details & Actions */}
			<div className="flex-1 overflow-hidden space-y-1">
				<h3 className="text-base font-semibold truncate text-gray-800">
					{props.title}
				</h3>
				<p className="text-sm text-gray-500 truncate">
					{props.description}
				</p>
				<div className="flex items-center gap-2">
					<span className="text-green-600 font-bold text-sm">
						{toINR(props.price)}
					</span>
					<Button
						onClick={handleBuyNow}
						size="sm"
						variant="default"
						className="rounded-full text-xs h-8 px-3"
					>
						Buy <ArrowRight className="h-4 w-4 ml-1" />
					</Button>
				</div>
			</div>

			{/* Action Icons */}
			<div className="flex flex-col items-center gap-2 ml-2">
				<Button
					onClick={toggleFavorite}
					variant="ghost"
					className="w-8 h-8 p-0 rounded-full hover:bg-pink-100"
				>
					{favoriteLoading ? (
						<Loader2 className="animate-spin text-gray-500 h-4 w-4" />
					) : (
						<Heart
							className={`h-4 w-4 transition-colors ${
								isFavorite ? "text-red-500" : "text-gray-400"
							}`}
							fill={isFavorite ? "currentColor" : "none"}
						/>
					)}
				</Button>
				<Button
					onClick={toggleCart}
					variant="ghost"
					className="w-8 h-8 p-0 rounded-full hover:bg-blue-100"
				>
					{cartLoading ? (
						<Loader2 className="animate-spin text-gray-500 h-4 w-4" />
					) : isInCart ? (
						<CheckSquare className="text-blue-600 h-4 w-4" />
					) : (
						<ShoppingBagIcon className="text-gray-400 h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
}
