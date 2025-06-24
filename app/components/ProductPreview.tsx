"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Accordian from "./Accordian";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ClothSizes from "./ClothSizes";
import { Button } from "@/components/ui/button";
import Review from "./Review";
import { Check, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
	useToggleCartItemMutation,
	useToggleFavoriteMutation,
	useGetCartQuery,
	useGetFavoritesQuery,
} from "@/store/services/userApi";

interface ProductPreviewProps {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	price: number | string;
	category?: string;
	rating: number;
	brand?: string;
}

interface UserItem {
	productId: number;
	title: string;
	price: number;
	thumbnail: string;
	category: string;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
	id,
	thumbnail,
	title,
	description,
	price,
	rating,
	brand,
	category,
}) => {
	const router = useRouter();
	const [selectedSize, setSelectedSize] = useState("S");
	const [itemInCart, setItemInCart] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined);
	const { data: favoritesData, refetch: refetchFavorites } =
		useGetFavoritesQuery(undefined);
	const [addToCart] = useToggleCartItemMutation();
	const [toggleFavorite] = useToggleFavoriteMutation();

	useEffect(() => {
		if (cartData) {
			setItemInCart(
				cartData.some((item: UserItem) => item.productId === id)
			);
		}
		if (favoritesData) {
			setFavorite(
				favoritesData.some((item: UserItem) => item.productId === id)
			);
		}
	}, [cartData, favoritesData, id]);

	const handleAddToCart = async () => {
		try {
			await addToCart({
				productId: id,
				title,
				price,
				thumbnail,
				category,
			}).unwrap();
			refetchCart();
			toast.success(itemInCart ? "Removed from cart" : "Added to cart");
		} catch {
			toast.error("Cart action failed");
		}
	};

	const handleFavorite = async () => {
		try {
			await toggleFavorite({
				productId: id,
				title,
				price,
				thumbnail,
				category,
			}).unwrap();
			refetchFavorites();
			toast.success(
				favorite ? "Removed from favorites" : "Added to favorites"
			);
		} catch {
			toast.error("Favorite action failed");
		}
	};

	return (
		<div className="flex flex-wrap-reverse md:py-12">
			<div className="flex-1 md:py-8 md:px-6">
				<h1 className="md:text-8xl text-3xl font-semibold mt-6 md:mt-0">
					{title}
				</h1>
				<h1 className="text-2xl pt-8 font-semibold">
					₹{(Number(price) * 83).toFixed(0)}
				</h1>
				<ClothSizes
					className="mt-8"
					defaultSize={selectedSize}
					onChange={(size) => setSelectedSize(size)}
				/>
				<p className="pt-4 md:pr-36">{description}</p>
				<p className="py-1 px-2 w-fit font-semibold bg-green-50 mt-6 text-green-950">
					Exchange & Return Available
				</p>
				<Accordian className="my-4">
					<h1>
						<b>Brand:</b> {brand}
					</h1>
					<h1 className="flex items-center gap-x-2">
						<b>Ratings:</b>
						{[1, 2, 3, 4, 5].map((n) => (
							<StarFilledIcon
								key={n}
								className={
									rating >= n
										? "text-yellow-500"
										: "text-gray-300"
								}
							/>
						))}
						{rating}
					</h1>
				</Accordian>
				<Accordian title="Payment Methods" className="my-4">
					<h1>Cash On Delivery</h1>
				</Accordian>
				<div className="flex gap-x-4 pt-6">
					<Button
						className="hover:text-red-600"
						variant="secondary"
						onClick={handleFavorite}
					>
						<Heart
							className={`transition-colors ${
								favorite ? "text-red-500" : "text-gray-500"
							}`}
							strokeWidth={2}
							fill={favorite ? "currentColor" : "none"}
						/>
					</Button>

					<Button
						onClick={handleAddToCart}
						variant="outline"
						className="rounded-none flex items-center gap-x-1"
					>
						{itemInCart ? "ADDED TO CART" : "ADD TO CART"}
						{itemInCart && <Check />}
					</Button>

					<Button
						onClick={() =>
							router.push(`/bill?category=${category}&id=${id}`)
						}
						className="rounded-none"
					>
						BUY NOW
					</Button>
				</div>
				<div className="pt-10">
					<h1 className="text-xl font-semibold">Reviews</h1>
					<Review />
					<Review />
				</div>
			</div>

			<div className="relative">
				{imageLoading && (
					<Skeleton className="size-[500px] absolute top-0 left-0" />
				)}

				<Image
					className={`bg-cover bg-gray-50 h-fit ${
						imageLoading ? "opacity-0" : "opacity-100"
					} transition-opacity duration-500`}
					height={500}
					width={500}
					alt="product"
					src={thumbnail}
					onLoadingComplete={() => {
						setImageLoading(false);
					}}
				/>
			</div>
		</div>
	);
};

export default ProductPreview;
