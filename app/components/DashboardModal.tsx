"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardModalProps {
	trigger: React.ReactNode;
}

export default function DashboardModal({ trigger }: DashboardModalProps) {
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await fetch("/api/logout", { method: "POST" });
			dispatch(logout());
			toast.success("Logged out successfully");
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
			toast.error("Logout failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	const goToDashboard = () => {
		router.push("/dashboard");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="sm:max-w-sm p-6 rounded-2xl shadow-lg border border-gray-200">
				<DialogHeader>
					<DialogTitle className="text-[17px] font-semibold text-gray-800">
						Account
					</DialogTitle>
					<DialogDescription className="text-sm text-gray-500">
						Signed in as{" "}
						<span className="text-gray-700 font-medium">
							{user?.email}
						</span>
					</DialogDescription>
				</DialogHeader>

				{/* User Info */}
				<div className="flex items-center gap-4 mt-6 px-1">
					<Avatar className="h-14 w-14 rounded-full border">
						{user?.photo ? (
							<img
								src={user.photo}
								alt="Profile"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<AvatarFallback className="text-lg font-semibold bg-muted text-muted-foreground">
								{user?.email?.charAt(0).toUpperCase() ?? "U"}
							</AvatarFallback>
						)}
					</Avatar>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-gray-900 leading-tight">
							{user?.name || "Unknown User"}
						</span>
						<span className="text-xs text-gray-500 truncate">
							{user?.email || "your@email.com"}
						</span>
					</div>
				</div>

				<div>
					{/* Dashboard Button */}
					<div className="mt-5">
						<Button
							onClick={goToDashboard}
							variant="ghost"
							className="w-full text-white bg-black font-medium hover:bg-gray-100 rounded-full"
						>
							Dashboard
						</Button>
					</div>

					{/* Logout */}
					<div className="mt-3">
						<Button
							onClick={handleLogout}
							disabled={loading}
							variant="outline"
							className="w-full flex items-center justify-center gap-2 rounded-full border-red-500 text-red-600 hover:bg-red-50 transition-all"
						>
							<LogOut className="h-4 w-4" />
							{loading ? "Logging out..." : "Logout"}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
