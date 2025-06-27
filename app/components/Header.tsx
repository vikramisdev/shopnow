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
			{/* Announcement */}
			<div className="fixed top-0 left-0 w-full bg-blue-50 text-blue-700 text-xs text-center py-[6px] z-50">
				🎉 Free shipping on orders over ₹999!
			</div>

			{/* Header */}
			<header className="fixed top-[22px] z-40 w-full bg-white border-b">
				<div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
					{/* Left - Logo */}
					<Logo />

					{/* Right - Icons */}
					<div className="flex items-center gap-3 md:gap-4 ml-auto">
						{expandSearchBar ? (
							<input
								className="border border-gray-300 rounded-full px-4 py-2 w-40 md:w-64 text-sm focus:outline-none focus:ring focus:border-blue-500"
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
										<Search />
									</Button>
								}
							/>
						)}

						{/* Mobile Menu */}
						<div className="md:hidden">
							<Button
								onClick={() => setMenu(!isMenuOpen)}
								variant="ghost"
								aria-label="Toggle Menu"
								size="md"
							>
								{isMenuOpen ? <X /> : <MenuIcon />}
							</Button>
						</div>

						{/* User - Desktop */}
						<div className="hidden md:flex items-center gap-2">
							{session && session.user?.image && (
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
												<UserIcon />
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
											<UserIcon />
										</Button>
									}
								/>
							)}
						</div>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				<nav
					className={`md:hidden bg-neutral-100 transition-all duration-300 shadow-sm rounded-b-2xl overflow-hidden ${
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
								<div>
									<p className="text-sm font-semibold truncate">
										{session.user?.name}
									</p>
									<p className="text-xs text-gray-500 truncate">
										{session.user?.email}
									</p>
								</div>
							</div>
						)}

						{session ? (
							<>
								<Link
									href="/dashboard"
									onClick={() => setMenu(false)}
								>
									Dashboard
								</Link>
								<Link
									href="/dashboard?tab=orders"
									onClick={() => setMenu(false)}
								>
									Orders
								</Link>
								<Link
									href="/dashboard?tab=cart"
									onClick={() => setMenu(false)}
								>
									Cart
								</Link>
								<Link
									href="/dashboard?tab=favorites"
									onClick={() => setMenu(false)}
								>
									Favorites
								</Link>
								<button
									onClick={handleLogout}
									className="text-red-600 text-left font-semibold"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									href="/login"
									onClick={() => setMenu(false)}
								>
									Login
								</Link>
								<Link
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

			{/* Spacer */}
			<div className="h-[100px] md:h-[116px]" />

			{/* Category Bar */}
			<nav className="sticky top-0 z-30 bg-white overflow-x-auto">
				<div className="max-w-[1440px] mx-auto flex gap-3 px-4 md:px-6 py-[6px] text-sm font-medium whitespace-nowrap">
					{[
						"Men",
						"Women",
						"Electronics",
						"Shoes",
						"Accessories",
					].map((item) => (
						<Link
							key={item}
							href={`/category/${item.toLowerCase()}`}
							className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition"
						>
							{item}
						</Link>
					))}
				</div>
			</nav>
		</>
	);
};

export default Header;
