"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Check, Heart, Loader, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import Accordian from "./Accordian";
import ClothSizes from "./ClothSizes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import {
	useToggleCartItemMutation,
	useToggleFavoriteMutation,
	useGetCartQuery,
	useGetFavoritesQuery,
	useGetReviewsQuery,
	useAddReviewMutation,
} from "@/store/services/userApi";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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

interface Review {
	_id: string;
	user: { name: string; image?: string } | string;
	comment: string;
	rating: number;
	date: string;
}

const isClothingCategory = (category?: string) => {
	if (!category) return false;
	const clothKeywords = [
		"shirt",
		"pant",
		"jean",
		"jacket",
		"t-shirt",
		"kurta",
		"dress",
	];
	return clothKeywords.some((keyword) =>
		category.toLowerCase().includes(keyword)
	);
};

export default function ProductPreview({
	id,
	title,
	description,
	thumbnail,
	price,
	category,
	rating,
	brand,
}: ProductPreviewProps) {
	const router = useRouter();
	const { data: session } = useSession();

	const [selectedSize, setSelectedSize] = useState("S");
	const [itemInCart, setItemInCart] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);
	const [reviewComment, setReviewComment] = useState("");
	const [reviewRating, setReviewRating] = useState(5);

	const { data: reviews, isFetching } = useGetReviewsQuery(id);
	const [addReview, { isLoading: posting }] = useAddReviewMutation();

	const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined);
	const { data: favoritesData, refetch: refetchFavorites } =
		useGetFavoritesQuery(undefined);
	const [toggleCart, { isLoading: cartLoading }] =
		useToggleCartItemMutation();
	const [toggleFavorite, { isLoading: favLoading }] =
		useToggleFavoriteMutation();

	useEffect(() => {
		setItemInCart(
			cartData?.some((i: UserItem) => i.productId === id) ?? false
		);
		setFavorite(
			favoritesData?.some((i: UserItem) => i.productId === id) ?? false
		);
	}, [cartData, favoritesData, id]);

	const handleAddToCart = async () => {
		try {
			await toggleCart({
				productId: id,
				title,
				price,
				thumbnail,
				category,
			}).unwrap();
			await refetchCart();
			toast.success(itemInCart ? "Removed from cart" : "Added to cart");
		} catch (err) {
			const msg =
				(err as FetchBaseQueryError)?.status === 401
					? "Please login to manage cart"
					: "Failed to update cart";
			toast.error(msg);
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
			await refetchFavorites();
			toast.success(
				favorite ? "Removed from favorites" : "Added to favorites"
			);
		} catch (err) {
			const msg =
				(err as FetchBaseQueryError)?.status === 401
					? "Please login to manage favorites"
					: "Failed to update favorites";
			toast.error(msg);
		}
	};

	const handleSubmitReview = async () => {
		if (!reviewComment.trim()) {
			toast.error("Comment cannot be empty");
			return;
		}

		const user = session?.user as {
			id: string;
			name: string;
			email: string;
			image?: string;
		};

		if (!user?.id) {
			toast.error("You must be logged in to submit a review.");
			return;
		}

		try {
			await addReview({
				productId: id,
				review: {
					user: user.id,
					comment: reviewComment.trim(),
					rating: reviewRating,
				},
			}).unwrap();

			setReviewComment("");
			setReviewRating(5);
			toast.success("Review submitted!");
		} catch {
			toast.error("Failed to submit review");
		}
	};

	return (
		<div className="flex flex-wrap-reverse md:py-12">
			{/* Info */}
			<div className="flex-1 md:py-8 md:px-6">
				<h1 className="md:text-8xl text-3xl font-semibold mt-6 md:mt-0">
					{title}
				</h1>
				<h2 className="text-2xl pt-8 font-semibold">
					₹{(Number(price) * 83).toFixed(0)}
				</h2>

				{isClothingCategory(category) && (
					<ClothSizes
						className="mt-8"
						defaultSize={selectedSize}
						onChange={setSelectedSize}
					/>
				)}

				<p className="pt-4 md:pr-36">{description}</p>
				<p className="py-1 px-2 w-fit font-semibold bg-green-50 mt-6 text-green-950">
					Exchange & Return Available
				</p>

				<Accordian className="my-4">
					<p>
						<b>Brand:</b> {brand}
					</p>
					<p className="flex items-center gap-x-2">
						<b>Ratings:</b>{" "}
						{[1, 2, 3, 4, 5].map((n) => (
							<StarFilledIcon
								key={n}
								className={
									rating >= n
										? "text-yellow-500"
										: "text-gray-300"
								}
							/>
						))}{" "}
						{rating}
					</p>
				</Accordian>

				<Accordian title="Payment Methods" className="my-4">
					<p>Cash On Delivery</p>
				</Accordian>

				{/* Actions */}
				<div className="flex gap-x-4 pt-6 flex-wrap">
					<Button
						onClick={handleFavorite}
						disabled={favLoading}
						variant="outline"
						className={cn(
							favLoading && "opacity-50 cursor-not-allowed"
						)}
					>
						{favLoading ? (
							<span className="animate-pulse text-sm">
								<Loader />
							</span>
						) : (
							<Heart
								className={
									favorite ? "text-red-500" : "text-gray-500"
								}
								strokeWidth={2}
								fill={favorite ? "currentColor" : "none"}
							/>
						)}
					</Button>
					<Button
						onClick={handleAddToCart}
						disabled={cartLoading}
						variant="outline"
						className={cn(
							"rounded-none flex items-center gap-x-1",
							cartLoading && "opacity-50 cursor-not-allowed"
						)}
					>
						{cartLoading ? (
							<span className="animate-pulse text-sm">
								<Loader />
							</span>
						) : (
							<>
								{itemInCart ? (
									<ShoppingCart className="text-blue-600" />
								) : (
									<ShoppingCart />
								)}
								{itemInCart && (
									<Check className="text-blue-600" />
								)}
							</>
						)}
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

				{/* Reviews */}
				<div className="pt-10">
					<h1 className="text-xl font-semibold mb-2">Reviews</h1>

					{isFetching ? (
						<div className="space-y-4">
							{Array(3)
								.fill(0)
								.map((_, idx) => (
									<div
										key={idx}
										className="bg-gray-100 rounded-lg p-3 flex gap-3 items-start"
									>
										<Skeleton className="w-10 h-10 rounded-full" />
										<div className="flex-1 space-y-2">
											<Skeleton className="w-1/3 h-4" />
											<Skeleton className="w-full h-4" />
											<Skeleton className="w-1/4 h-3" />
										</div>
									</div>
								))}
						</div>
					) : reviews?.length ? (
						<div className="space-y-4">
							{reviews.map((r: Review) => {
								const user =
									typeof r.user === "string"
										? { name: r.user }
										: r.user;
								return (
									<div
										key={r._id}
										className="bg-gray-100 rounded-lg p-3 flex gap-3 items-start"
									>
										{user?.image ? (
											<Image
												src={user.image}
												alt={user.name}
												width={40}
												height={40}
												className="rounded-full"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
												{user?.name[0]}
											</div>
										)}
										<div className="flex-1">
											<div className="flex justify-between">
												<span className="font-medium">
													{user?.name}
												</span>
												<span className="text-yellow-600">
													{r.rating} ★
												</span>
											</div>
											<p className="text-sm text-gray-700 mt-1">
												{r.comment}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												{new Date(
													r.date
												).toLocaleString()}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<p className="text-gray-500 text-sm mb-4">
							No reviews yet.
						</p>
					)}

					{/* Write Review */}
					<div className="mt-6">
						<h2 className="font-medium mb-2">Write a review</h2>
						<Input
							type="number"
							value={reviewRating}
							min={1}
							max={5}
							className="mb-2"
							onChange={(e) =>
								setReviewRating(Number(e.target.value))
							}
							placeholder="Rating (1-5)"
						/>
						<Textarea
							value={reviewComment}
							onChange={(e) => setReviewComment(e.target.value)}
							placeholder="Your comment..."
							className="mb-2"
						/>
						<Button onClick={handleSubmitReview} disabled={posting}>
							{posting ? "Submitting..." : "Submit Review"}
						</Button>
					</div>
				</div>
			</div>

			{/* Product Image */}
			<div className="relative">
				{imageLoading && (
					<Skeleton className="size-[500px] absolute top-0 left-0" />
				)}
				<Image
					src={thumbnail}
					height={500}
					width={500}
					alt="product"
					className={`bg-gray-50 transition-opacity duration-500 ${
						imageLoading ? "opacity-0" : "opacity-100"
					}`}
					onLoadingComplete={() => setImageLoading(false)}
				/>
			</div>
		</div>
	);
}
