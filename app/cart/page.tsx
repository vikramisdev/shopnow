"use client"

import { SignIn, useUser } from "@clerk/nextjs";

export default function Cart() {
    const { isSignedIn } = useUser();

    return  (
        <div className="flex justify-center items-center h-screen">
            {isSignedIn ? <h2>Your cart is Empty</h2> : <SignIn routing="hash" />}
        </div>
    );
}
