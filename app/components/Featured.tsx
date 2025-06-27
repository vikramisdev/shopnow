"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useRouter } from "next/navigation";
import FeaturedSkeleton from "./skeletons/FeaturedSkeleton";

// --- Product type from DummyJSON
interface ProductData {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	price: number;
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

		fetchFeatured();
	}, []);

	if (loading) {
		return <FeaturedSkeleton />;
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
		<div className="px-4 sm:px-6 lg:px-10 py-24 bg-white dark:bg-black">
			<h1 className="font-semibold text-3xl py-5 px-2">Featured</h1>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<Product
						key={product.id}
						id={product.id}
						title={product.title}
						thumbnail={product.thumbnail}
						price={product.price}
						description={product.description}
						category={product.category}
						onClick={() =>
							router.push(
								`/products/${encodeURIComponent(
									product.category
								)}/${product.id}`
							)
						}
					/>
				))}
			</div>
		</div>
	);
}
