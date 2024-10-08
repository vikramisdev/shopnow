"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Header searchBarFocus={false} />
      <div className="flex justify-center items-center h-screen">
        {isSignedIn ? <h2>Your cart is Empty</h2> : <SignIn routing="hash" />}
      </div>
      <Footer />
    </div>
  );
}
