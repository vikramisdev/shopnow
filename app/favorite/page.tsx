"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { isSignedIn } = useUser();

  return isSignedIn ? (
    <div className="">
      <Header />
      <div className="flex justify-center items-center h-screen"></div>
      <Footer />
    </div>
  ) : (
    <div className="flex h-screen justify-center items-center">
      <SignIn routing="hash" />
      <h1>Please Sign In to View Favourite Page.</h1>
    </div>
  );
}
