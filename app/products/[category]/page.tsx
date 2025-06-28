import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import CategoryProducts from "@/app/components/CategoryProducts";

export const dynamic = "force-dynamic"; // optional: forces dynamic rendering (good for APIs)

async function getProductsByCategory(category: string) {
	try {
		const res = await fetch(
			`https://dummyjson.com/products/category/${category}`,
			{ cache: "no-store" } // ensure fresh data
		);

		if (!res.ok) throw new Error("Category not found");

		const data = await res.json();
		if (!data?.products || !Array.isArray(data.products)) {
			throw new Error("Invalid product data");
		}

		return data.products;
	} catch (error) {
		console.error("Error fetching category products:", error);
		return null;
	}
}

export default async function CategoryPage({
	params,
}: {
	params: { category: string };
}) {
	const products = await getProductsByCategory(params.category);
	if (!products) return notFound();

	return (
		<div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
			<Header />
			<main className="pt-24 px-6 md:px-12 min-h-screen">
				<CategoryProducts
					category={params.category}
					products={products}
				/>
			</main>
			<Footer />
		</div>
	);
}
