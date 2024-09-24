import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Button from "./Button";
import { useRouter } from "next/navigation";

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
    <div className="flex container py-5 px-7 bg-gray-100 justify-between items-center">
      <h1 className="font-bold text-xl">ShopNow</h1>
      <input
        className="py-2 px-4 rounded-3xl focus:outline-none w-3/6"
        type="text"
        placeholder="Search for Products, Brands and More"
        onFocus={redirectToSearch}
        autoFocus={props.searchBarFocus ? true : false}
      />
      <ul className="flex gap-10 items-center">
        <Button name="Home" href="/" />
        <Button name="About" href="/about" />
        <Button name="Cart" href="/cart" />

        {/* Render UserButton when signed in, otherwise show SignInButton */}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton
            className="bg-black text-white py-2 px-3 rounded-lg"
            mode="modal"
          />
        )}
      </ul>
    </div>
  );
}
