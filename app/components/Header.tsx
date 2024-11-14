import React, { useState } from "react";
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

interface HeaderInterface {
  expandSearchBar?: boolean;
}

const Header: React.FC<HeaderInterface> = ({ expandSearchBar = false }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setMenu] = useState(false);

  window.addEventListener("scroll", () => {
    setMenu(false);
  });

  return (
    <div className="flex md:p-6 p-4 justify-between items-center fixed w-full top-0 z-10">
      <Logo />
      <div className="flex items-center gap-4 md:gap-2">
        {expandSearchBar ? (
          <input
            className="border-gray-200 border-2 rounded-full px-4 py-2"
            type="text"
            placeholder="Search products"
            autoFocus={true}
          ></input>
        ) : (
          <Button onClick={() => router.push("/search")}>
            <Search />
          </Button>
        )}
        <div className="md:hidden">
          <MenuIcon
            className={`${
              isMenuOpen ? "hidden" : "visible"
            } transition-all duration-500`}
            onClick={() => setMenu(!isMenuOpen)}
          />
          <X
            className={`${
              isMenuOpen ? "visible" : "hidden"
            } transition-all duration-500`}
            onClick={() => setMenu(!isMenuOpen)}
          />
        </div>
        <div className="hidden md:block">
          <Button>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <UserIcon />
              </SignInButton>
            )}
          </Button>
        </div>
      </div>
      <div className="md:flex gap-2 hidden">
        <Button onClick={() => router.push("/favorite")}>
          <HeartIcon />
        </Button>
        <Button onClick={() => router.push("/cart")}>
          <ShoppingBagIcon />
        </Button>
      </div>
      <div
        className={`absolute top-16 left-0 w-screen bg-neutral-100 shadow-sm rounded-b-2xl transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "h-80" : "h-0"
        }`}
      ></div>
    </div>
  );
};

export default Header;
