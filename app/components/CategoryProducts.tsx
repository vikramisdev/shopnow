"use client";

import { useRouter } from "next/navigation";
import Product from "./Product";

interface ProductType {
	id: number;
	title: string;
	description: string;
	price: number;
	thumbnail: string;
	category: string;
}

export default function CategoryProducts({
	category,
	products,
}: {
	category: string;
	products: ProductType[];
}) {
	const router = useRouter();

	return (
		<div className="w-full py-10 px-4">
			<h1 className="text-3xl font-bold capitalize mb-8 px-2 sm:px-4 md:px-20">
				{category.replace(/-/g, " ")}
			</h1>

			<div className="flex flex-wrap justify-center gap-16">
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
