"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "../components/Header";
import ProductPreview from "../components/ProductPreview";
import Footer from "../components/Footer";
import ProductPreviewSkeleton from "../components/skeletons/ProductPreviewSkeleton";

interface ProductData {
	id: number;
	title: string;
	description: string;
	thumbnail: string;
	images: string[];
	price: number;
	category: string;
	rating: number;
	brand: string;
}

export default function CartPage() {
	const user = useSelector((state: RootState) => state.auth.user);
	const params = useSearchParams();
	const [product, setProduct] = useState<ProductData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const category = params.get("category");
	const productId = params.get("id");

	useEffect(() => {
		if (!category || !productId) return;

		const fetchProduct = async () => {
			try {
				const res = await fetch(
					`https://dummyjson.com/products/category/${category}`
				);
				if (!res.ok) throw new Error("Failed to fetch product");

				const data = await res.json();
				const matched = data.products.find(
					(p: ProductData) => String(p.id) === productId
				);
				setProduct(matched || null);
			} catch (err) {
				setError(true);
				console.log(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [category, productId]);

	if (!user || !user.email) {
		return (
			<div className="h-screen flex items-center justify-center">
				<h2 className="text-xl font-semibold">
					Please login to view your cart.
				</h2>
			</div>
		);
	}

	return (
		<div>
			<Header />

			<div className="md:px-12 px-6 pt-24 min-h-[60vh]">
				{loading ? (
					<ProductPreviewSkeleton />
				) : error ? (
					<p className="text-center text-red-500">
						Something went wrong. Try again later.
					</p>
				) : product ? (
					<ProductPreview
						id={product.id}
						title={product.title}
						description={product.description}
						price={product.price}
						thumbnail={product.images[0]}
						rating={product.rating}
						brand={product.brand}
						category={product.category}
					/>
				) : (
					<div className="text-center text-muted-foreground">
						<p>Product not found or invalid query parameters.</p>
					</div>
				)}
			</div>

			{!productId && (
				<div className="flex justify-center items-center h-[70vh] bg-[url('/images/cart.svg')] bg-no-repeat bg-contain md:bg-cover" />
			)}

			<Footer />
		</div>
	);
}
