"use client";

import { Popover, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	LayoutDashboard,
	LogOut,
	PackageSearch,
	ShoppingBag,
	Heart,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

interface DashboardPopoverProps {
	trigger: React.ReactNode;
}

export default function DashboardPopover({ trigger }: DashboardPopoverProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.user);

	const cartCount = 4; // dummy value
	const ordersCount = 2; // dummy value
	const favoritesCount = 6; // dummy value

	const handleLogout = async () => {
		try {
			await signOut();
			dispatch(logout());
			toast.success("Logged out");
			router.push("/login");
		} catch (err) {
			toast.error(
				`Logout failed: ${
					err instanceof Error ? err.message : "Unknown error"
				}`
			);
		}
	};

	const goTo = (tab?: string) => {
		router.push(tab ? `/dashboard?tab=${tab}` : "/dashboard");
	};

	return (
		<Popover>
			{trigger}

			<PopoverContent
				side="bottom"
				align="end"
				className="w-64 mt-2 p-4 rounded-lg border shadow-md bg-white"
			>
				{/* User Info */}
				<div className="flex items-center gap-3 mb-4">
					<Avatar className="h-10 w-10">
						{user?.photo ? (
							<Image
								src={user.photo}
								alt="User"
								width={40}
								height={40}
								className="rounded-full object-cover"
							/>
						) : (
							<AvatarFallback>
								{user?.email?.charAt(0).toUpperCase() || "U"}
							</AvatarFallback>
						)}
					</Avatar>
					<div className="truncate">
						<p className="text-sm font-semibold text-gray-900">
							{user?.name || "Unknown User"}
						</p>
						<p className="text-xs text-gray-500 truncate">
							{user?.email || "your@email.com"}
						</p>
					</div>
				</div>

				{/* Links */}
				<div className="space-y-1 text-sm">
					<Button
						variant="ghost"
						className="w-full justify-start gap-2"
						onClick={() => goTo()}
					>
						<LayoutDashboard className="h-4 w-4" /> Dashboard
					</Button>

					<Button
						variant="ghost"
						className="w-full justify-between"
						onClick={() => goTo("orders")}
					>
						<div className="flex gap-2 items-center">
							<PackageSearch className="h-4 w-4" />
							Orders
						</div>
						<span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
							{ordersCount}
						</span>
					</Button>

					<Button
						variant="ghost"
						className="w-full justify-between"
						onClick={() => goTo("cart")}
					>
						<div className="flex gap-2 items-center">
							<ShoppingBag className="h-4 w-4" />
							Cart
						</div>
						<span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
							{cartCount}
						</span>
					</Button>

					<Button
						variant="ghost"
						className="w-full justify-between"
						onClick={() => goTo("favorites")}
					>
						<div className="flex gap-2 items-center">
							<Heart className="h-4 w-4" />
							Favorites
						</div>
						<span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
							{favoritesCount}
						</span>
					</Button>
				</div>

				{/* Logout */}
				<div className="pt-3">
					<Button
						onClick={handleLogout}
						variant="outline"
						className="w-full justify-center text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700"
					>
						<LogOut className="h-4 w-4 mr-2" /> Logout
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
