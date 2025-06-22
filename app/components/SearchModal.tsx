"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";
import Image from "next/image";

interface SearchModalProps {
	trigger: React.ReactNode;
}

interface Product {
	id: number;
	title: string;
	thumbnail: string;
	price: number;
}

export default function SearchModal({ trigger }: SearchModalProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const delay = setTimeout(() => {
			if (query.trim().length > 1) {
				searchProducts();
			}
		}, 400); // debounce

		return () => clearTimeout(delay);
	}, [query]);

	const searchProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://dummyjson.com/products/search?q=${query}`
			);
			if (!res.ok) throw new Error("Search failed");
			const data = await res.json();
			setResults(data.products); // `products` is the array
		} catch (error) {
			console.error(error);
			toast.error("Search failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleProductClick = (id: number) => {
		router.push(`/product/${id}`);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="sm:max-w-lg p-6 rounded-2xl shadow-xl">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
						<Search className="h-5 w-5" />
						Search Products
					</DialogTitle>
				</DialogHeader>

				<Input
					type="text"
					placeholder="Type product name..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="mt-4"
				/>

				<div className="mt-4 max-h-64 overflow-y-auto space-y-3">
					{loading && (
						<p className="text-sm text-gray-500">Searching...</p>
					)}

					{!loading && query.length > 1 && results.length === 0 && (
						<p className="text-sm text-gray-500">
							No products found.
						</p>
					)}

					{results.map((product) => (
						<div
							key={product.id}
							onClick={() => handleProductClick(product.id)}
							className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all"
						>
							<Image
								src={product.thumbnail}
								alt={product.title}
								width={48}
								height={48}
								className="rounded-md object-cover"
							/>
							<div className="flex flex-col">
								<span className="text-sm font-medium text-gray-900">
									{product.title}
								</span>
								<span className="text-xs text-gray-500">
									₹{product.price}
								</span>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
