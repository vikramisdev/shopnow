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
import { signOut } from "next-auth/react";

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
			signOut();
			dispatch(logout()); // redux action
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

			<DialogContent className="sm:max-w-sm p-6 rounded-xl shadow-xl border border-gray-200 bg-white animate-in fade-in duration-200">
				<DialogHeader>
					<DialogTitle className="text-[18px] font-medium text-gray-900">
						Account Details
					</DialogTitle>
					<DialogDescription className="text-sm text-gray-600">
						Signed in as{" "}
						<span className="text-gray-800 font-medium">
							{user?.email}
						</span>
					</DialogDescription>
				</DialogHeader>

				{/* Avatar & User Info */}
				<div className="flex items-center gap-4 mt-5">
					<Avatar className="h-14 w-14 border border-gray-300 shadow-sm">
						{user?.photo ? (
							<img
								src={user.photo}
								alt="Profile"
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
								{user?.email?.charAt(0).toUpperCase() ?? "U"}
							</AvatarFallback>
						)}
					</Avatar>
					<div className="flex flex-col gap-0.5">
						<p className="text-sm font-semibold text-gray-900">
							{user?.name || "Unknown User"}
						</p>
						<p className="text-xs text-gray-500 truncate">
							{user?.email || "your@email.com"}
						</p>
					</div>
				</div>

				{/* Actions */}
				<div className="mt-6 space-y-3">
					<Button
						onClick={goToDashboard}
						className="w-full bg-blue-600 text-white hover:bg-blue-700 transition rounded-full font-medium"
					>
						Go to Dashboard
					</Button>

					<Button
						onClick={handleLogout}
						disabled={loading}
						variant="outline"
						className="w-full border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 transition rounded-full flex items-center justify-center gap-2"
					>
						<LogOut className="h-4 w-4" />
						{loading ? "Logging out..." : "Logout"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
