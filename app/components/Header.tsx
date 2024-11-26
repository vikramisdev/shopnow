import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import {
  HeartIcon,
  MenuIcon,
  Search,
  ShoppingBagIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

interface HeaderInterface {
  expandSearchBar?: boolean;
}

const Header: React.FC<HeaderInterface> = ({ expandSearchBar = false }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setMenu] = useState(false);
  const searchBar = useRef<HTMLInputElement>(null);

  const pushToUrl = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", value); // Update the "q" query parameter
    if(value) {
      router.push(`/search?${searchParams.toString()}`);
    } else {
      router.push("/search");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setMenu(false); // Close the menu on scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex md:p-6 p-4 justify-between items-center fixed w-full top-0 z-10 bg-white">
      <Logo />
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
          <Button onClick={() => router.push("/search")}>
            <Search aria-label="Search" />
          </Button>
        )}
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
        <div className="hidden md:block">
          <Button>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <UserIcon aria-label="Sign In" />
              </SignInButton>
            )}
          </Button>
        </div>
      </div>
      <div className="md:flex gap-2 hidden">
        <Button onClick={() => router.push("/favorite")}>
          <HeartIcon aria-label="Favorite" />
        </Button>
        <Button onClick={() => router.push("/cart")}>
          <ShoppingBagIcon aria-label="Cart" />
        </Button>
      </div>
      <div
        className={`absolute top-16 left-0 w-screen bg-neutral-100 shadow-sm rounded-b-2xl transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "h-80" : "h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-8">
          {["Home", "Cart", "Favorite", "About Us", "Contact Us"].map((item, index) => (
            <React.Fragment key={index}>
              <Link className="text-lg font-semibold" href={`/${item.toLowerCase().replace(" ", "")}`}>
                {item}
              </Link>
              <hr />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
