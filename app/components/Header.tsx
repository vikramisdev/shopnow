"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
	HeartIcon,
	MenuIcon,
	Search,
	ShoppingBagIcon,
	UserIcon,
	X,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Logo from "./Logo";
import Button from "./Button";
import LoginModal from "./LoginModal";
import DashboardModal from "./DashboardModal";
import SearchModal from "./SearchModal";

import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/components/ui/tooltip";

interface HeaderInterface {
	expandSearchBar?: boolean;
}

const Header: React.FC<HeaderInterface> = ({ expandSearchBar = false }) => {
	const router = useRouter();
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

	useEffect(() => {
		const handleScroll = () => {
			setMenu(false);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="flex md:p-6 p-4 justify-between items-center fixed w-full top-0 z-10 bg-white">
			<Logo />

			<TooltipProvider>
				{/* Search + Auth + Mobile Menu */}
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
						<Tooltip>
							<TooltipTrigger asChild>
								<SearchModal
									trigger={
										<Button>
											<Search aria-label="Search" />
										</Button>
									}
								/>
							</TooltipTrigger>
							<TooltipContent>Search</TooltipContent>
						</Tooltip>
					)}

					{/* Mobile Menu Icon */}
					<div className="md:hidden">
						{!isMenuOpen ? (
							<MenuIcon
								className="transition-all duration-500"
								onClick={() => setMenu(true)}
								aria-label="Open Menu"
							/>
						) : (
							<X
								className="transition-all duration-500"
								onClick={() => setMenu(false)}
								aria-label="Close Menu"
							/>
						)}
					</div>

					{/* Auth (Desktop Only) */}
					<div className="hidden md:block">
						<Tooltip>
							<TooltipTrigger asChild>
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
							</TooltipTrigger>
							<TooltipContent>
								{session ? "Account" : "Login"}
							</TooltipContent>
						</Tooltip>
					</div>
				</div>

				{/* Desktop Actions */}
				<div className="md:flex gap-2 hidden">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={() =>
									router.push("/dashboard?tab=favorites")
								}
							>
								<HeartIcon aria-label="Favorite" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Favorites</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={() =>
									router.push("/dashboard?tab=cart")
								}
							>
								<ShoppingBagIcon aria-label="Cart" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Cart</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>

			{/* Mobile Dropdown Menu */}
			<div
				className={`absolute top-16 left-0 w-screen bg-neutral-100 shadow-sm rounded-b-2xl transition-all duration-500 overflow-hidden ${
					isMenuOpen ? "h-80" : "h-0"
				}`}
			>
				<div className="flex flex-col gap-4 px-6 py-8">
					{["Home", "Cart", "Favorite", "About Us", "Contact Us"].map(
						(item, index) => (
							<React.Fragment key={index}>
								<Link
									className="text-lg font-semibold"
									href={
										item === "Cart"
											? "/dashboard?tab=cart"
											: item === "Favorite"
											? "/dashboard?tab=favorites"
											: `/${item
													.toLowerCase()
													.replace(" ", "")}`
									}
								>
									{item}
								</Link>
								<hr />
							</React.Fragment>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
