"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuIcon, Search, UserIcon, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Logo from "./Logo";
import Button from "./Button";
import LoginModal from "./LoginModal";
import SearchModal from "./SearchModal";
import DashboardPopover from "./dashboard/DashboardPopover";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { PopoverTrigger } from "@/components/ui/popover";

interface HeaderProps {
	expandSearchBar?: boolean;
}

const categories = [
	"beauty",
	"fragrances",
	"furniture",
	"groceries",
	"home-decoration",
	"kitchen-accessories",
	"laptops",
	"mens-shirts",
	"mens-shoes",
	"mens-watches",
	"mobile-accessories",
	"motorcycle",
	"skin-care",
	"smartphones",
	"sports-accessories",
	"sunglasses",
	"tablets",
	"tops",
	"vehicle",
	"womens-bags",
	"womens-dresses",
	"womens-jewellery",
	"womens-shoes",
	"womens-watches",
];

const Header: React.FC<HeaderProps> = ({ expandSearchBar = false }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const [isMenuOpen, setMenu] = useState(false);

	const pushToUrl = (value: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("q", value);
		router.push(`/search?${searchParams.toString()}`);
	};

	const handleLogout = async () => {
		try {
			await signOut();
			dispatch(logout());
			toast.success("Logged out successfully");
			router.push("/login");
			setMenu(false);
		} catch {
			toast.error("Logout failed. Try again.");
		}
	};

	useEffect(() => {
		const closeOnScroll = () => setMenu(false);
		window.addEventListener("scroll", closeOnScroll);
		return () => window.removeEventListener("scroll", closeOnScroll);
	}, []);

	return (
		<>
			{/* Announcement Bar */}
			<div className="fixed top-0 left-0 w-full bg-blue-50 text-blue-700 text-xs text-center py-[6px] z-50 dark:bg-blue-950 dark:text-blue-200">
				🎉 Free shipping on orders over ₹999!
			</div>

			{/* Header */}
			<header className="fixed top-[22px] z-40 w-full bg-white border-b dark:bg-neutral-950 dark:border-neutral-800">
				<div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
					<Logo />

					<div className="flex items-center gap-3 md:gap-4 ml-auto">
						{expandSearchBar ? (
							<input
								className="border border-gray-300 dark:border-neutral-700 rounded-full px-4 py-2 w-40 md:w-64 text-sm bg-white dark:bg-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-500"
								type="text"
								placeholder="Search products"
								onChange={(e) => pushToUrl(e.target.value)}
							/>
						) : (
							<SearchModal
								trigger={
									<Button
										variant="outline"
										size="md"
										aria-label="Search"
									>
										<Search className="text-black dark:text-white" />
									</Button>
								}
							/>
						)}

						{/* Mobile Menu Button */}
						<div className="md:hidden">
							<Button
								onClick={() => setMenu(!isMenuOpen)}
								variant="ghost"
								aria-label="Toggle Menu"
								size="md"
							>
								{isMenuOpen ? (
									<X className="text-black dark:text-white" />
								) : (
									<MenuIcon className="text-black dark:text-white" />
								)}
							</Button>
						</div>

						{/* Desktop User Menu */}
						<div className="hidden md:flex items-center gap-2">
							{session?.user?.image && (
								<Image
									src={session.user.image}
									alt="User Avatar"
									width={32}
									height={32}
									className="rounded-full object-cover"
								/>
							)}
							{session ? (
								<DashboardPopover
									trigger={
										<PopoverTrigger>
											<Button
												variant="outline"
												size="md"
												aria-label="Dashboard"
											>
												<UserIcon className="text-black dark:text-white" />
											</Button>
										</PopoverTrigger>
									}
								/>
							) : (
								<LoginModal
									trigger={
										<Button
											variant="outline"
											size="md"
											aria-label="Login"
										>
											<UserIcon className="text-black dark:text-white" />
										</Button>
									}
								/>
							)}
						</div>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				<nav
					className={`md:hidden bg-neutral-100 dark:bg-neutral-900 transition-all duration-300 shadow-sm rounded-b-2xl overflow-hidden ${
						isMenuOpen ? "py-6" : "h-0 py-0"
					}`}
				>
					<div className="flex flex-col gap-4 px-6">
						{session && (
							<div className="flex items-center gap-3 mb-4">
								<Image
									src={
										session.user?.image ||
										"https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880"
									}
									alt="User"
									width={40}
									height={40}
									className="rounded-full object-cover"
								/>
								<div className="text-black dark:text-white">
									<p className="text-sm font-semibold truncate">
										{session.user?.name}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
										{session.user?.email}
									</p>
								</div>
							</div>
						)}

						{session ? (
							<>
								<Link
									className="text-black dark:text-white"
									href="/dashboard"
									onClick={() => setMenu(false)}
								>
									Dashboard
								</Link>
								<Link
									className="text-black dark:text-white"
									href="/dashboard?tab=orders"
									onClick={() => setMenu(false)}
								>
									Orders
								</Link>
								<Link
									className="text-black dark:text-white"
									href="/dashboard?tab=cart"
									onClick={() => setMenu(false)}
								>
									Cart
								</Link>
								<Link
									className="text-black dark:text-white"
									href="/dashboard?tab=favorites"
									onClick={() => setMenu(false)}
								>
									Favorites
								</Link>
								<button
									onClick={handleLogout}
									className="text-red-600 dark:text-red-400 text-left font-semibold text-black dark:text-white"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									className="text-black dark:text-white"
									href="/login"
									onClick={() => setMenu(false)}
								>
									Login
								</Link>
								<Link
									className="text-black dark:text-white"
									href="/signup"
									onClick={() => setMenu(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</nav>
			</header>

			{/* Header Spacer */}
			<div className="h-[100px] md:h-[116px] bg-white dark:bg-black" />

			{/* Category Bar */}
			<nav className="sticky top-0 z-30 bg-white dark:bg-black overflow-x-auto scrollbar-hide">
				<div className="max-w-[1440px] mx-auto flex gap-3 px-4 md:px-6 py-[6px] text-sm font-medium whitespace-nowrap">
					{categories.map((cat) => (
						<Link
							key={cat}
							href={`/products/${cat}`}
							className="px-3 py-1 rounded-full bg-gray-100 text-black dark:text-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition capitalize"
						>
							{cat.replace(/-/g, " ")}
						</Link>
					))}
				</div>
			</nav>
		</>
	);
};

export default Header;
