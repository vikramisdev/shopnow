"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductPreview from "../components/ProductPreview";
import ProductPreviewSkeleton from "../components/skeletons/ProductPreviewSkeleton";

interface ProductData {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	images: string[];
	price: string | number;
	category: string;
	rating: number;
	brand: string;
}

export default function ProductsPage() {
	const [products, setProducts] = useState<ProductData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const res = await fetch("https://dummyjson.com/products");
				const data = await res.json();
				setProducts(data.products || []);
			} catch (err) {
				console.error("Error fetching products:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchAllProducts();
	}, []);

	return (
		<div>
			<Header />

			<div className="md:px-12 px-6 pt-24 min-h-[70vh]">
				{loading ? (
					<ProductPreviewSkeleton />
				) : error ? (
					<p className="text-center text-red-500">
						Failed to load products. Try again later.
					</p>
				) : products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductPreview
								key={product.id}
								id={product.id}
								title={product.title}
								description={product.description}
								price={String(product.price)}
								thumbnail={
									product.images[0] || product.thumbnail
								}
								rating={product.rating}
								brand={product.brand}
								category={product.category}
							/>
						))}
					</div>
				) : (
					<p className="text-center text-muted-foreground">
						No products found.
					</p>
				)}
			</div>

			<Footer />
		</div>
	);
}
