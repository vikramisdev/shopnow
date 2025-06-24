"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useGetFavoritesQuery } from "@/store/services/userApi";
import CompactProduct from "../CompactProduct";
import Image from "next/image";

interface ProductData {
	id: number;
	productId: number;
	title: string;
	description: string;
	thumbnail: string;
	price: number;
	category: string;
}

export default function FavoritesTab() {
	const router = useRouter();
	const { data: favorites = [], isLoading } = useGetFavoritesQuery(undefined);

	if (isLoading) {
		return (
			<div className="space-y-4 p-6">
				<Skeleton className="h-6 w-32" />
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<Skeleton className="h-32 w-full rounded-xl" />
					<Skeleton className="h-32 w-full rounded-xl" />
					<Skeleton className="h-32 w-full rounded-xl" />
				</div>
			</div>
		);
	}

	if (!favorites.length) {
		return (
			<div className="text-center py-16 space-y-4">
				<Image
					src="/images/no-favorites.svg"
					alt="No Favorites"
					width={150}
					height={150}
					className="mx-auto"
				/>
				<p className="text-muted-foreground text-sm">
					You haven’t added anything to your favorites yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8 px-6 pb-10">
			{/* Header */}
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold text-gray-900 flex gap-2 items-center">
					Favorites
					<span className="text-xs font-medium text-white bg-pink-600 px-2 py-0.5 rounded-full">
						{favorites.length} item{favorites.length > 1 ? "s" : ""}
					</span>
				</h2>
			</div>

			{/* Favorites Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{favorites.map((item: ProductData) => (
					<CompactProduct
						key={item.productId ?? item.id}
						id={item.id}
						productId={item.productId ?? item.id}
						title={item.title}
						price={item.price}
						thumbnail={item.thumbnail}
						description={item.description}
						category={item.category}
						onClick={() => router.push(`/product/${item.id}`)}
					/>
				))}
			</div>
		</div>
	);
}
