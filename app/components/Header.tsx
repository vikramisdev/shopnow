import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex container py-5 px-7 bg-gray-100 justify-between items-center">
      <h1 className="font-bold text-xl">ShopNow</h1>
      <ul className="flex gap-10 items-center">
        <input
          className="py-2 px-4 rounded-3xl focus:outline-none"
          type="text"
          placeholder="Search..."
        />
        <Link href={"/"} className="cursor-pointer hover:bg-black hover:text-white py-2 px-3 rounded">
          Home
        </Link>
        <Link href={"/about"} className="cursor-pointer hover:bg-black hover:text-white py-2 px-3 rounded">
          About
        </Link>
        <Link href={"/contact"} className="cursor-pointer hover:bg-black hover:text-white py-2 px-3 rounded">
          Contact
        </Link>

        {/* Render UserButton when signed in, otherwise show SignInButton */}
        {isSignedIn ? <UserButton /> : <SignInButton className="bg-black text-white py-2 px-3 rounded-lg" mode="modal"/>}
      </ul>
    </div>
  );
}
