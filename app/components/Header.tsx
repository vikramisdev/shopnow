"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
	HeartIcon,
	MenuIcon,
	PackageSearch,
	Search,
	ShoppingBagIcon,
	UserIcon,
	X,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Logo from "./Logo";
import Button from "./Button";
import LoginModal from "./LoginModal";
import DashboardModal from "./dashboard/DashboardModal";
import SearchModal from "./SearchModal";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

interface HeaderInterface {
	expandSearchBar?: boolean;
}

const Header: React.FC<HeaderInterface> = ({ expandSearchBar = false }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isMenuOpen, setMenu] = useState(false);
	const searchBar = useRef<HTMLInputElement>(null);
	const { data: session } = useSession();

	const pushToUrl = (value: string) => {
		try {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set("q", value);
			router.push(`/search?${searchParams.toString()}`);
		} catch (err) {
			console.error("Failed to push URL:", err);
		}
	};

	const handleLogout = async () => {
		try {
			await signOut();
			dispatch(logout());
			toast.success("Logged out successfully");
			router.push("/login");
			setMenu(false);
		} catch (error) {
			console.error("Logout failed:", error);
			toast.error("Logout failed. Try again.");
		}
	};

	useEffect(() => {
		const handleScroll = () => setMenu(false);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="flex md:p-6 p-4 justify-between items-center fixed w-full top-0 z-50 bg-white shadow-md">
			<Logo />

			{/* Search & Auth Buttons */}
			<div className="flex items-center gap-3 md:gap-4">
				{expandSearchBar ? (
					<input
						ref={searchBar}
						className="border border-gray-300 rounded-full px-4 py-2 w-40 md:w-64 focus:outline-none focus:ring focus:border-blue-500"
						type="text"
						placeholder="Search products"
						autoFocus
						onChange={(e) => pushToUrl(e.target.value)}
					/>
				) : (
					<SearchModal
						trigger={
							<Button aria-label="Search">
								<Search />
							</Button>
						}
					/>
				)}

				{/* Mobile Menu Icon */}
				<div className="md:hidden">
					<Button
						onClick={() => setMenu(!isMenuOpen)}
						variant="ghost"
						aria-label="Toggle Menu"
					>
						{isMenuOpen ? <X /> : <MenuIcon />}
					</Button>
				</div>

				{/* Desktop Auth Button */}
				<div className="hidden md:block">
					{session ? (
						<DashboardModal
							trigger={
								<Button aria-label="Account">
									<UserIcon />
								</Button>
							}
						/>
					) : (
						<LoginModal
							trigger={
								<Button aria-label="Login">
									<UserIcon />
								</Button>
							}
						/>
					)}
				</div>
			</div>

			{/* Desktop Action Buttons */}
			<div className="hidden md:flex gap-2">
				<Button
					onClick={() => router.push("/dashboard?tab=favorites")}
					variant="ghost"
					aria-label="Favorites"
				>
					<HeartIcon />
				</Button>
				<Button
					onClick={() => router.push("/dashboard?tab=cart")}
					variant="ghost"
					aria-label="Cart"
				>
					<ShoppingBagIcon />
				</Button>
				{session && (
					<Button
						onClick={() => router.push("/dashboard?tab=orders")}
						variant="ghost"
						aria-label="Orders"
					>
						<PackageSearch />
					</Button>
				)}
			</div>

			{/* Mobile Dropdown */}
			<nav
				className={`absolute top-full left-0 w-full bg-neutral-100 rounded-b-2xl overflow-hidden transition-all duration-300 shadow-md md:hidden ${
					isMenuOpen ? "py-6" : "h-0 py-0"
				}`}
			>
				<div className="flex flex-col gap-4 px-6">
					{session && (
						<div className="flex items-center gap-3 mb-4">
							<Image
								src={
									session.user?.image || "/default-avatar.png"
								}
								alt="User Avatar"
								width={40}
								height={40}
								className="rounded-full object-cover"
							/>
							<div>
								<p className="text-sm font-semibold truncate max-w-[160px]">
									{session.user?.name}
								</p>
								<p className="text-xs text-gray-500 truncate max-w-[160px]">
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
								className="font-semibold"
							>
								Dashboard
							</Link>
							<Link
								href="/dashboard?tab=orders"
								onClick={() => setMenu(false)}
								className="font-semibold"
							>
								Orders
							</Link>
							<Link
								href="/dashboard?tab=cart"
								onClick={() => setMenu(false)}
								className="font-semibold"
							>
								Cart
							</Link>
							<Link
								href="/dashboard?tab=favorites"
								onClick={() => setMenu(false)}
								className="font-semibold"
							>
								Favorites
							</Link>
							<button
								onClick={handleLogout}
								className="text-red-600 font-semibold text-left"
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								href="/login"
								onClick={() => setMenu(false)}
								className="font-semibold"
							>
								Login
							</Link>
							<Link
								href="/signup"
								onClick={() => setMenu(false)}
								className="font-semibold"
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
