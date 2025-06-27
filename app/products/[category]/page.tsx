import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { notFound } from "next/navigation";
import CategoryProducts from "@/app/components/CategoryProducts";

async function getProductsByCategory(category: string) {
	try {
		const res = await fetch(
			`https://dummyjson.com/products/category/${category}`
		);
		if (!res.ok) throw new Error("Category not found");
		return res.json();
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
	const data = await getProductsByCategory(params.category);
	if (!data) return notFound();

	return (
		<>
			<Header />
			<CategoryProducts
				category={params.category}
				products={data.products}
			/>
			<Footer />
		</>
	);
}
