"use client";

import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

export default function ProfileTabSkeleton() {
	return (
		<div className="space-y-6 max-w-xl">
			{/* Heading */}
			<div className="space-y-2">
				<Skeleton className="h-6 w-1/3 rounded" />
				<Skeleton className="h-4 w-1/2 rounded" />
			</div>

			{/* Form Fields */}
			<div className="space-y-4">
				{/* Name */}
				<div className="space-y-1">
					<Skeleton className="h-4 w-20 rounded" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>

				{/* Email */}
				<div className="space-y-1">
					<Skeleton className="h-4 w-20 rounded" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>

				{/* Password */}
				<div className="space-y-1">
					<Skeleton className="h-4 w-20 rounded" />
					<Skeleton className="h-10 w-full rounded-md" />
					<Skeleton className="h-4 w-1/4 mt-2 rounded" />
				</div>

				{/* Update Button */}
				<Skeleton className="h-10 w-40 rounded-full" />
			</div>
		</div>
	);
}
