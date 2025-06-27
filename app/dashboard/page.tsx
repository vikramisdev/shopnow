"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	User,
	Package,
	ShoppingCart,
	Heart,
	Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

import ProfileTab from "../components/dashboard/ProfileTab";
import OrdersTab from "../components/dashboard/OrdersTab";
import CartTab from "../components/dashboard/CartTab";
import FavoritesTab from "../components/dashboard/FavoritesTab";
import SettingsTab from "../components/dashboard/SettingsTab";

const menuItems = [
	{ label: "Profile", id: "profile", icon: User },
	{ label: "Orders", id: "orders", icon: Package },
	{ label: "Cart", id: "cart", icon: ShoppingCart },
	{ label: "Favorites", id: "favorites", icon: Heart },
	{ label: "Settings", id: "settings", icon: Settings },
];

function Dashboard() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const active = searchParams.get("tab") || "profile";

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="bg-white md:w-60 w-full border-b md:border-b-0 md:border-r shadow-sm">
				{/* Home button */}
				<div className="flex items-center justify-between md:justify-start p-4 border-b md:border-b-0">
					<Link href="/">
						<Button
							variant="ghost"
							size="sm"
							className="text-sm px-2 text-gray-700 md:hover:text-black"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							<span className="hidden md:inline">Home</span>
						</Button>
					</Link>
				</div>

				{/* Navigation tabs */}
				<nav className="flex md:flex-col md:space-y-1 justify-between px-2 py-4 md:px-4">
					{menuItems.map((item) => {
						const isActive = active === item.id;

						return (
							<Button
								key={item.id}
								variant="ghost"
								className={cn(
									"flex items-center gap-2 justify-center md:justify-start w-full py-2 px-2 md:px-4 rounded-lg text-sm transition",
									isActive && "bg-black text-white",
									!isActive && "text-gray-700",
									"md:hover:bg-gray-100",
									"focus:outline-none focus:ring-0 active:bg-transparent"
								)}
								onClick={() =>
									router.push(`/dashboard?tab=${item.id}`)
								}
							>
								<item.icon
									className={cn(
										"h-5 w-5",
										isActive
											? "md:text-white"
											: "md:text-gray-700"
									)}
								/>
								<span className="hidden md:inline">
									{item.label}
								</span>
							</Button>
						);
					})}
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white rounded-t-2xl md:rounded-none">
				{active === "profile" && <ProfileTab />}
				{active === "orders" && <OrdersTab />}
				{active === "cart" && <CartTab />}
				{active === "favorites" && <FavoritesTab />}
				{active === "settings" && <SettingsTab />}
			</main>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<Suspense>
			<Dashboard />
		</Suspense>
	);
}
