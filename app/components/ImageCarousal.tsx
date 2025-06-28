"use client";

import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // assumes you're using shadcn/ui
import { Flame } from "lucide-react";

type Product = {
	id: number;
	title: string;
	images: string[];
	thumbnail: string;
};

const ImageCarousel = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const imageCount = 5;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axiosInstance.get("/products?limit=100");
				const allProducts: Product[] = res.data.products || [];

				const shuffled = allProducts.sort(() => 0.5 - Math.random());
				const selected = shuffled.slice(0, imageCount);

				setProducts(selected);
			} catch (error) {
				console.error("Failed to fetch products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="w-full py-4 bg-white dark:bg-black px-8">
			<h1 className="text-black dark:text-white font-semibold text-lg md:text-3xl flex items-center gap-x-3">
				<Flame />
				Explore Trending Picks
			</h1>
			<div className="flex gap-4 overflow-x-auto py-6">
				{isLoading
					? Array.from({ length: imageCount }).map((_, index) => (
							<div
								key={index}
								className="w-[250px] h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-md"
							>
								<Skeleton className="w-full h-full" />
							</div>
					  ))
					: products.map((product) => (
							<div
								key={product.id}
								className="w-[250px] md:w-full h-[250px] md:h-[350px] rounded-2xl md:hover:w-[3000px] hover:w-[2000px] overflow-hidden cursor-pointer border transition-[width] duration-700 ease-in-out"
							>
								<img
									src={
										product.images?.[0] ||
										product.thumbnail ||
										`https://picsum.photos/seed/fallback${product.id}/400/600`
									}
									alt={product.title}
									className="w-full h-full object-cover md:object-center object-top"
									loading="lazy"
								/>
							</div>
					  ))}
			</div>
		</div>
	);
};

export default ImageCarousel;
