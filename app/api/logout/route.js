import { NextResponse } from "next/server";

export async function POST() {
    const response = new NextResponse(JSON.stringify({ message: "Logged out" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Expire the cookie by setting it to empty and past date
    response.cookies.set({
        name: "auth_token",
        value: "",
        expires: new Date(0),
        httpOnly: true,
        path: "/",
    });

    return response;
}
