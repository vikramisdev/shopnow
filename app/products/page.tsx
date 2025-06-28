"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function Products() {
	const params = useSearchParams();
	const id = params.get("id");

	const [product, setProduct] = useState<ProductData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) return;

			setLoading(true);
			setError(false);

			try {
				const res = await fetch(`https://dummyjson.com/products/${id}`);
				if (!res.ok) throw new Error("Network response failed");

				const data = await res.json();
				if (!data?.id) throw new Error("Product data invalid");

				setProduct(data);
			} catch (err) {
				console.error("Error fetching product:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	return (
		<div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
			<Header />

			<main className="md:px-12 px-6 pt-24 min-h-[70vh]">
				{loading ? (
					<ProductPreviewSkeleton />
				) : error ? (
					<p className="text-center text-red-500 font-medium">
						⚠️ Failed to load product. Please try again later.
					</p>
				) : product ? (
					<ProductPreview
						id={product.id}
						title={product.title}
						description={product.description}
						price={product.price}
						thumbnail={
							product.images[0] ||
							product.thumbnail ||
							"/images/default.png"
						}
						rating={product.rating}
						brand={product.brand}
						category={product.category}
					/>
				) : (
					<p className="text-center text-gray-500 dark:text-gray-400 font-medium">
						Product not found.
					</p>
				)}
			</main>

			<Footer />
		</div>
	);
}

export default function ProductsPage() {
	return (
		<Suspense fallback={<ProductPreviewSkeleton />}>
			<Products />
		</Suspense>
	);
}
