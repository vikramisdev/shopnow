"use client";

import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useRouter } from "next/navigation";
import NewCollectionSkeleton from "./skeletons/NewCollectionSkeleton";

interface ProductData {
	id: number;
	title: string;
	description: string;
	price: string;
	category: string;
	thumbnail: string;
}

const NewCollection: React.FC = () => {
	const router = useRouter();
	const [products, setProducts] = useState<ProductData[] | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(
					"https://dummyjson.com/products/category/mens-shoes"
				);
				const data = await res.json();
				setProducts(data.products);
			} catch (error) {
				console.error("Failed to fetch products:", error);
				setProducts([]); // empty fallback
			}
		};

		fetchProducts();
	}, []);

	if (products === null) return <NewCollectionSkeleton />;

	if (products.length === 0)
		return (
			<div className="px-10 py-24 text-center text-gray-500">
				<h2 className="text-xl">No new products found.</h2>
			</div>
		);

	return (
		<section className="px-4 sm:px-8 md:px-10 py-24 bg-white dark:bg-black">
			<h1 className="font-semibold text-3xl py-5 px-2">New Collection</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<Product
						key={product.id}
						id={product.id}
						title={product.title}
						thumbnail={product.thumbnail}
						price={Number(product.price)}
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
		</section>
	);
};

export default NewCollection;
