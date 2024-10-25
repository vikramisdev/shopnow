import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LucideHeart, SearchIcon, ShoppingCartIcon } from "lucide-react";
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

interface HeaderProps {
  searchBarFocus: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header(props: HeaderProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const redirectToSearch = () => {
    router.push("/search");
  };

  return (
    <div className="">
      {/* sale & offer banner */}
      <div className="text-center bg-slate-50">
        <h1 className="min-h-full p-1 uppercase font-semibold">
          Winter Season Sale Starting Soon
        </h1>
      </div>

      {/* main navbar */}
      <div className="flex container py-5 px-7 bg-slate-950 text-white justify-between items-center">
        <div className="flex gap-x-10 items-center">
          {/* logo */}
          <Link href={"/"}>
            <Image
              className="invert w-12 cursor-pointer"
              src={"/images/snlogo.png"}
              alt="logo"
              width={500}
              height={500}
            />
          </Link>

          {/*  */}
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
                className="py-2 px-4 rounded-full focus:outline-none w-[300px]"
                type="text"
                placeholder="Search for Products, Brands and More"
                onFocus={redirectToSearch}
                autoFocus={props.searchBarFocus ? true : false}
              />
            </div>

            <Link href={"/favourite"}>
              <LucideHeart />
            </Link>
            <Link href={"/favourite"}>
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
    </div>
  );
}
