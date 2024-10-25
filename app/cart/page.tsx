"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { isSignedIn } = useUser();

  return isSignedIn ? (
    <div>
      <Header searchBarFocus={false} />
      <div className="flex justify-center items-center h-screen bg-[url('/images/cart.svg')] bg-no-repeat bg-top bg-cover"></div>
      <Footer />
    </div>
  ) : (
    <SignIn routing="hash" />
  );
}
