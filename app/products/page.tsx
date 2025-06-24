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

			try {
				const res = await fetch(`https://dummyjson.com/products/${id}`);
				const data = await res.json();
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
		<div>
			<Header />
			<div className="md:px-12 px-6 pt-24 min-h-[70vh]">
				{loading ? (
					<ProductPreviewSkeleton />
				) : error ? (
					<p className="text-center text-red-500">
						Failed to load product. Try again later.
					</p>
				) : product ? (
					<div>
						<ProductPreview
							id={product.id}
							title={product.title}
							description={product.description}
							price={String(product.price)}
							thumbnail={product.images[0] || product.thumbnail}
							rating={product.rating}
							brand={product.brand}
							category={product.category}
						/>
					</div>
				) : (
					<p className="text-center text-muted-foreground">
						Product not found.
					</p>
				)}
			</div>

			<Footer />
		</div>
	);
}

export default function ProductsPage() {
	return (
		<Suspense>
			<Products />
		</Suspense>
	);
}
