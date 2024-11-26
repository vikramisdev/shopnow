import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="bg-gray-950 mt-10 text-white py-14 px-12">
      <div className="flex flex-col md:flex-row md:justify-between py-12 gap-y-12">
        {/* Logo */}
        <div>
          <div className="flex flex-col">
            <Logo />
          </div>
        </div>

        {/* company */}
        <div>
          <h1 className="md:text-xl md:mb-12 mb-6 font-semibold">Company</h1>
          <div className="flex flex-col gap-y-6">
            <Link className="font-normal" href={"/"}>
              Projects
            </Link>
            <Link className="font-normal" href={"/"}>
              Blog
            </Link>
          </div>
        </div>

        {/* about */}
        <div>
          <h1 className="md:text-xl md:mb-12 mb-6 font-semibold">About</h1>
          <div className="flex flex-col gap-y-6">
            <Link className="font-normal" href={"/about"}>
              ShopNow, Inc.
            </Link>
            <Link className="font-normal" href={"/"}>
              Policies
            </Link>
            <Link className="font-normal" href={"/"}>
              Investors
            </Link>
            <Link className="font-normal" href={"/"}>
              Careers
            </Link>
          </div>
        </div>

        {/* shop */}
        <div>
          <h1 className="md:text-xl md:mb-12 mb-6 font-semibold">Shop</h1>
          <div className="flex flex-col gap-y-6">
            <Link className="font-normal" href={"/"}>
              Gift Cards
            </Link>
            <Link className="font-normal" href={"/"}>
              Blog
            </Link>
            <Link className="font-normal" href={"/"}>
              Projects
            </Link>
            <Link className="font-normal" href={"/"}>
              Projects
            </Link>
          </div>
        </div>

        {/* sell */}
        <div>
          <h1 className="md:text-xl md:mb-12 mb-6 font-semibold">Sell</h1>
          <div className="flex flex-col gap-y-6">
            <Link className="font-normal" href={"/"}>
              Sell on ShopNow
            </Link>
            <Link className="font-normal" href={"/"}>
              Teams
            </Link>
            <Link className="font-normal" href={"/"}>
              Forums
            </Link>
            <Link className="font-normal" href={"/"}>
              Affiliates & Creators
            </Link>
          </div>
        </div>

        {/* Help */}
        <div>
          <h1 className="md:text-xl md:mb-12 mb-6 font-semibold">Help</h1>
          <div className="flex flex-col gap-y-6">
            <Link className="font-normal" href={"/"}>
              Help Center
            </Link>
            <Link className="font-normal" href={"/"}>
              Privacy Settings
            </Link>
          </div>
        </div>
      </div>
      <hr className="opacity-30"></hr>
      <div className="flex items-center justify-between py-6">
        <h2 className="font-semibold">
          © 2023-2024 ShopNow, All Rights Reserved
        </h2>

        <div className="flex gap-6">
          <InstagramLogoIcon className="cursor-pointer h-5 w-5" />
          <TwitterLogoIcon className="cursor-pointer h-5 w-5" />
          <GitHubLogoIcon className="cursor-pointer h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
