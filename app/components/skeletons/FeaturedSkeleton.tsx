import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
	return (
		<div className="p-2 w-72 flex flex-col gap-y-3 rounded-2xl shadow-md">
			{/* Image & Actions */}
			<div className="h-96 bg-slate-100 rounded-2xl p-4 flex flex-col justify-between">
				<div className="flex justify-end">
					<Skeleton className="h-8 w-8 rounded-full" />
				</div>
				<div className="flex items-center justify-between gap-2">
					<Skeleton className="h-10 w-24 rounded-full" />
					<Skeleton className="h-10 w-10 rounded-full" />
					<Skeleton className="h-10 w-16 rounded-full" />
				</div>
			</div>

			{/* Text Info */}
			<div className="bg-gray-200 rounded-2xl p-4 h-20 space-y-2">
				<Skeleton className="h-5 w-3/4 rounded" />
				<Skeleton className="h-4 w-full rounded" />
			</div>
		</div>
	);
};

const FeaturedSkeleton = () => {
	return (
		<div className="px-10 py-24 bg-white dark:bg-black">
			<h1 className="font-semibold text-3xl py-5 px-2">Featured</h1>
			<div className="flex justify-between flex-wrap gap-y-12 gap-x-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		</div>
	);
};

export default FeaturedSkeleton;
