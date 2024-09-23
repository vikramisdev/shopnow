import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <div className="h-96 bg-gray-950 mt-10 text-white py-14 px-20">
      <div className="">
        <h2 className="font-semibold">
          © 2023-2024, shopnow.com, Inc. or its affiliates
        </h2>
        <div className="flex flex-col mt-10">
          <Link className="text-slate-200" href={"/about"}>
            About Us
          </Link>
          <Link className="text-slate-200" href={"/about"}>
            Contact Us
          </Link>
        </div>

        <div className="pt-5 flex gap-6">
          <InstagramLogoIcon className="cursor-pointer h-5 w-5" />
          <TwitterLogoIcon className="cursor-pointer h-5 w-5" />
          <GitHubLogoIcon className="cursor-pointer h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
