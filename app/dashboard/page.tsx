"use client";

export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	User,
	Package,
	ShoppingCart,
	Heart,
	Settings,
} from "lucide-react";
import Link from "next/link";
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
	const initialTab = searchParams.get("tab") || "profile";
	const [active, setActive] = useState(initialTab);

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="bg-white md:w-60 w-full border-b md:border-b-0 md:border-r shadow-sm">
				<div className="flex items-center justify-between md:justify-start p-4 border-b md:border-b-0">
					<Link href="/">
						<Button
							variant="ghost"
							size="sm"
							className="text-sm px-2"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							<span className="hidden md:inline">Home</span>
						</Button>
					</Link>
				</div>

				{/* Menu Tabs */}
				<nav className="flex md:flex-col md:space-y-1 justify-between px-2 py-4 md:px-4">
					{menuItems.map((item) => (
						<Button
							key={item.id}
							variant="ghost"
							size="icon"
							className={cn(
								"w-full flex items-center justify-center md:justify-start gap-2 rounded-lg md:px-3 md:py-2 transition text-sm",
								active === item.id
									? "bg-black text-white hover:bg-black"
									: "text-gray-700 hover:bg-gray-100"
							)}
							onClick={() => {
								setActive(item.id);
								router.push(`/dashboard?tab=${item.id}`);
							}}
						>
							<item.icon className="h-5 w-5" />
							<span className="hidden md:inline">
								{item.label}
							</span>
						</Button>
					))}
				</nav>
			</aside>

			{/* Main Content */}
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
