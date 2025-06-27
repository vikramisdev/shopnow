// app/products/[category]/[id]/page.tsx

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductPreview from "@/app/components/ProductPreview";

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

async function getProduct(id: string): Promise<ProductData | null> {
	try {
		const res = await fetch(`https://dummyjson.com/products/${id}`);
		if (!res.ok) throw new Error("Product not found");
		return res.json();
	} catch (err) {
		console.error("Error fetching product:", err);
		return null;
	}
}

export default async function ProductPage({
	params,
}: {
	params: { category: string; id: string };
}) {
	const product = await getProduct(params.id);

	if (!product) {
		return (
			<div className="text-center py-20">
				<h2 className="text-red-500 text-lg">Product not found.</h2>
			</div>
		);
	}

	return (
		<>
			<Header />
			<div className="md:px-12 px-6 pt-24 min-h-[70vh]">
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
			<Footer />
		</>
	);
}
