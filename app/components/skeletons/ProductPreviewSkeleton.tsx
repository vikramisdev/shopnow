"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPreviewSkeleton() {
	return (
		<div className="flex flex-wrap-reverse md:py-12 animate-pulse">
			{/* Text Section Skeleton */}
			<div className="flex-1 md:py-8 md:px-6 space-y-4">
				<Skeleton className="h-10 w-3/4" />
				<Skeleton className="h-8 w-1/2" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-8 w-1/3" />
				<Skeleton className="h-5 w-20" />
				<Skeleton className="h-10 w-32" />
				<div className="flex gap-4 pt-4">
					<Skeleton className="h-10 w-10 rounded" />
					<Skeleton className="h-10 w-32 rounded" />
					<Skeleton className="h-10 w-24 rounded" />
				</div>
			</div>

			{/* Image Section Skeleton */}
			<div className="relative w-full md:w-1/2 h-[500px]">
				<Skeleton className="w-full h-full rounded-xl" />
			</div>
		</div>
	);
}
