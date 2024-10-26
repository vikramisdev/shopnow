"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { isSignedIn } = useUser();

  return (
    isSignedIn?
    <div className="bg-[url('/images/favorite.svg')] bg-cover">
      <Header searchBarFocus={false} />
      <div className="flex justify-center items-center h-screen">
      </div>
      <Footer />
    </div> : <SignIn routing="hash" />
  );
}
