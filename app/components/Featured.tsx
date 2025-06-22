"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

// --- Product type from DummyJSON
interface ProductData {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	category: string;
}

// --- Your backend Cart/Favorite schema
interface CartOrFavoriteItem {
	_id: string;
	userId: string;
	productId: number;
	title: string;
	price: number;
	thumbnail: string;
	category: string;
}

interface APIResponse {
	products: ProductData[];
}

export default function Featured() {
	const router = useRouter();
	const [products, setProducts] = useState<ProductData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [cartIds, setCartIds] = useState<number[]>([]);
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchFeatured = async () => {
			try {
				const res = await fetch(
					"https://dummyjson.com/products/category/mens-shirts?limit=4"
				);
				if (!res.ok)
					throw new Error("Failed to fetch featured products");
				const data: APIResponse = await res.json();
				setProducts(data.products || []);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		const fetchUserData = async () => {
			try {
				const [cartRes, favRes] = await Promise.all([
					fetch("/api/cart"),
					fetch("/api/favorite"),
				]);

				const cartData: CartOrFavoriteItem[] = await cartRes.json();
				const favData: CartOrFavoriteItem[] = await favRes.json();

				setCartIds(cartData.map((item) => item.productId));
				setFavoriteIds(favData.map((item) => item.productId));
			} catch (err) {
				console.error("Error fetching cart/favorites", err);
			}
		};

		fetchFeatured();
		fetchUserData();
	}, []);

	if (loading) {
		return (
			<div className="px-10 py-24">
				<h1 className="font-semibold text-3xl py-5 px-2">Featured</h1>
				<div className="flex flex-wrap justify-between gap-y-12">
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="w-[220px]">
								<Skeleton className="h-48 w-full rounded-lg mb-3" />
								<Skeleton className="h-4 w-3/4 mb-1" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="px-10 py-24 text-center text-red-500">
				<h2>Failed to load featured products. Try again later.</h2>
			</div>
		);
	}

	if (products.length === 0) return null;

	return (
		<div className="px-10 py-24">
			<h1 className="font-semibold text-3xl py-5 px-2">Featured</h1>
			<div className="flex flex-wrap justify-between gap-y-12">
				{products.map((product) => (
					<Product
						key={product.id}
						id={String(product.id)}
						title={product.title}
						thumbnail={product.thumbnail}
						price={product.price}
						description={product.description}
						category={product.category}
						isInCart={cartIds.includes(product.id)}
						isFavorite={favoriteIds.includes(product.id)}
						onClick={() =>
							router.push(
								`/cart?category=${encodeURIComponent(
									product.category
								)}&id=${product.id}`
							)
						}
					/>
				))}
			</div>
		</div>
	);
}
