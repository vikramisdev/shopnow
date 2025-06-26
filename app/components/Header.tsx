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
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set("q", value);
		if (value) {
			router.push(`/search?${searchParams.toString()}`);
		} else {
			router.push("/search");
		}
	};

	const handleLogout = async () => {
		try {
			signOut();
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
		<div className="flex md:p-6 p-4 justify-between items-center fixed w-full top-0 z-10 bg-white shadow-sm">
			<Logo />

			{/* Actions */}
			<div className="flex items-center gap-4 md:gap-2">
				{expandSearchBar ? (
					<input
						ref={searchBar}
						className="border-gray-200 border-2 rounded-full px-4 py-2 w-40 md:w-fit"
						type="text"
						placeholder="Search products"
						autoFocus
						onChange={(event) => pushToUrl(event.target.value)}
					/>
				) : (
					<SearchModal
						trigger={
							<Button>
								<Search aria-label="Search" />
							</Button>
						}
					/>
				)}

				{/* Mobile Menu Icon */}
				<div className="md:hidden">
					{!isMenuOpen ? (
						<MenuIcon
							onClick={() => setMenu(true)}
							aria-label="Open Menu"
						/>
					) : (
						<X
							onClick={() => setMenu(false)}
							aria-label="Close Menu"
						/>
					)}
				</div>

				{/* Desktop Auth Button */}
				<div className="hidden md:block">
					{session ? (
						<DashboardModal
							trigger={
								<Button>
									<UserIcon aria-label="Account" />
								</Button>
							}
						/>
					) : (
						<LoginModal
							trigger={
								<Button>
									<UserIcon aria-label="Login" />
								</Button>
							}
						/>
					)}
				</div>
			</div>

			{/* Desktop Actions */}
			<div className="md:flex gap-2 hidden">
				<Button onClick={() => router.push("/dashboard?tab=favorites")}>
					<HeartIcon />
				</Button>
				<Button onClick={() => router.push("/dashboard?tab=cart")}>
					<ShoppingBagIcon />
				</Button>
				{session && (
					<Button
						onClick={() => router.push("/dashboard?tab=orders")}
					>
						<PackageSearch />
					</Button>
				)}
			</div>

			{/* Mobile Dropdown Menu */}

			<div
				className={`absolute top-16 left-0 w-full bg-neutral-100 shadow-md rounded-b-2xl transition-all duration-500 overflow-hidden ${
					isMenuOpen ? "h-fit py-6" : "h-0 py-0"
				}`}
			>
				<div className="flex flex-col gap-4 px-6">
					{/* User Info */}
					{session && (
						<div className="flex items-center gap-3 mb-4">
							<Image
								src={
									session.user?.image ||
									"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
								alt="User"
								width={40}
								height={40}
								className="rounded-full object-cover"
							/>
							<div>
								<p className="text-sm font-semibold">
									{session.user?.name}
								</p>
								<p className="text-xs text-gray-500 truncate max-w-[180px]">
									{session.user?.email}
								</p>
							</div>
						</div>
					)}

					{/* Menu Items */}
					{session && (
						<>
							<Link
								href="/dashboard"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Dashboard
							</Link>
							<hr />
							<Link
								href="/dashboard?tab=orders"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Orders
							</Link>
							<hr />
							<Link
								href="/dashboard?tab=cart"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Cart
							</Link>
							<hr />
							<Link
								href="/dashboard?tab=favorites"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Favorites
							</Link>
							<hr />
							<button
								onClick={handleLogout}
								className="flex items-center gap-2 text-red-600 text-lg font-semibold"
							>
								Logout
							</button>
						</>
					)}

					{!session && (
						<>
							<Link
								href="/login"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Login
							</Link>
							<hr />
							<Link
								href="/signup"
								className="text-lg font-semibold"
								onClick={() => setMenu(false)}
							>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
