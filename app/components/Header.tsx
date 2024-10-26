import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LucideHeart, SearchIcon, ShoppingCartIcon, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  searchBarFocus: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header(props: HeaderProps) {
  const { isSignedIn } = useUser();
  const [isSearchDialogOpen, setSearchDialog] = useState(false);
  const router = useRouter();

  return (
    <div className="">
      {/* main navbar */}
      <div className="flex container py-5 px-7 bg-slate-800 backdrop-blur-sm text-white justify-between items-center shadow-md">
        <div className="flex gap-x-10 items-center">
          {/* logo */}
          <Link href={"/"}>
            <Image
              className="invert w-12 cursor-pointer rounded-full"
              src={"/images/snlogo.png"}
              alt="logo"
              width={500}
              height={500}
            />
          </Link>

          {/* categories */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex gap-x-1">
              {/* New Collection */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">
                  <h1>New</h1>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-5 w-full">
                  <ul className="md:grid md:grid-cols-2 w-[400px] gap-5">
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Men Collection */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">
                  <h1>Men</h1>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-5 w-full">
                  <ul className="md:grid md:grid-cols-2 w-[400px] gap-5">
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Women Collection */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">
                  <h1>Women</h1>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-5 w-full">
                  <ul className="md:grid md:grid-cols-2 w-[400px] gap-5">
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Kids Collection */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white">
                  <h1>Kids</h1>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-5 w-full">
                  <ul className="md:grid md:grid-cols-2 w-[400px] gap-5">
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                    <li>New Shoes</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <ul className="flex gap-10 items-center">
          <div className="flex gap-x-5 items-center">
            <div className="flex items-center bg-white px-2 rounded-3xl w-fit">
              <SearchIcon className="text-black" />
              <input
                className="py-2 px-4 rounded-full focus:outline-none w-[300px] text-black"
                type="text"
                placeholder="Search for Products, Brands and More"
                onFocus={() => setSearchDialog(true)}
                onBlur={() => setSearchDialog(false)}
              />
            </div>

            <Link href={"/favorite"}>
              <LucideHeart />
            </Link>
            <Link href={"/cart"}>
              <ShoppingCartIcon />
            </Link>
          </div>

          {/* Render UserButton when signed in, otherwise show SignInButton */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>SHOPNOW USER</AvatarFallback>
                </Avatar>
              </AlertDialogTrigger>
              <AlertDialogContent className="h-fit w-fit p-0">
                <AlertDialogCancel className="w-10 border-none float-end hover:bg-red-500">
                  <Cross2Icon />
                </AlertDialogCancel>
                <SignIn routing="hash" />
              </AlertDialogContent>
            </AlertDialog>
          )}
        </ul>
      </div>

      {/* search dialog */}
      <div
        className={`absolute left-0 right-0 top-24 ${
          isSearchDialogOpen ? "h-fit py-10" : "h-0"
        } bg-slate-50 z-10 px-12 overflow-hidden transition-all duration-1000 rounded-b-xl`}
      >
          <h1 className="flex gap-x-3 hover:bg-slate-100 p-3"><TrendingUp /> New Arrivals</h1>
          <h1 className="flex gap-x-3 hover:bg-slate-100 p-3"><TrendingUp /> New Arrivals</h1>
          <h1 className="flex gap-x-3 hover:bg-slate-100 p-3"><TrendingUp /> New Arrivals</h1>
          <h1 className="flex gap-x-3 hover:bg-slate-100 p-3"><TrendingUp /> New Arrivals</h1>
      </div>
    </div>
  );
}
