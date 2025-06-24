import { Skeleton } from "../../../components/ui/skeleton";

export default function BillPageSkeleton() {
	return (
		<div className="max-w-xl mx-auto p-6 space-y-6">
			<Skeleton className="h-8 w-3/4 mb-4" />

			<div className="flex gap-4">
				<Skeleton className="h-48 w-48 rounded-lg" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<Skeleton className="h-5 w-1/3 mb-2" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>

				<div>
					<Skeleton className="h-5 w-1/3 mb-2" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>

				<div>
					<Skeleton className="h-5 w-1/3 mb-2" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>
			</div>

			<Skeleton className="h-12 w-full rounded-md" />
		</div>
	);
}
