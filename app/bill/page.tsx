"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Bill from "../components/Bill";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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

export default function BillPage() {
	const { data: session, status } = useSession();
	const isLoadingSession = status === "loading";

	const params = useSearchParams();
	const productId = params.get("id");
	const category = params.get("category");

	const [products, setProducts] = useState<ProductData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!category || !productId) return;

		setLoading(true);
		fetch(`https://dummyjson.com/products/category/${category}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products || []);
			})
			.catch((err) => {
				console.error("Failed to fetch product data", err);
				setError(true);
			})
			.finally(() => setLoading(false));
	}, [category, productId]);

	const selectedProduct = useMemo(
		() => products.find((p) => String(p.id) === productId),
		[products, productId]
	);

	// Loading state
	if (isLoadingSession || loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
				<Skeleton className="w-[300px] h-[40px] rounded-md" />
				<Skeleton className="w-full max-w-xl h-[400px] rounded-md" />
			</div>
		);
	}

	// Not logged in
	if (!session?.user?.email) {
		return (
			<div className="h-screen flex flex-col items-center justify-center gap-y-4 text-center px-4">
				<h2 className="text-xl font-semibold">
					Please login to continue to billing.
				</h2>
				<Button onClick={() => (window.location.href = "/login")}>
					Go to Login
				</Button>
			</div>
		);
	}

	return (
		<div>
			<Header />

			<div className="md:px-12 px-6 pt-24 min-h-[60vh]">
				{/* No product ID */}
				{!productId ? (
					<div className="flex flex-col justify-center items-center h-[70vh] text-center gap-y-6">
						<img
							src="/images/cart.svg"
							alt="Empty Cart"
							className="max-w-sm w-full"
						/>
						<p className="text-muted-foreground text-lg">
							No product selected. Browse and add items to your
							cart.
						</p>
						<Button
							onClick={() => (window.location.href = "/products")}
						>
							Go to Products
						</Button>
					</div>
				) : error ? (
					<div className="text-center mt-10 space-y-4">
						<p className="text-red-500 font-medium">
							Failed to load product. Try again later.
						</p>
						<Button
							variant="secondary"
							onClick={() => window.location.reload()}
						>
							Retry
						</Button>
					</div>
				) : selectedProduct ? (
					<Bill
						id={selectedProduct.id} // ✅ REQUIRED
						title={selectedProduct.title}
						images={selectedProduct.images}
						price={selectedProduct.price}
						description={selectedProduct.description}
					/>
				) : (
					<p className="text-center text-muted-foreground mt-20">
						Product not found or invalid query.
					</p>
				)}
			</div>

			<Footer />
		</div>
	);
}
