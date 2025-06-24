import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import CartItem from "@/models/Cart";
import { connectToDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions"; // ✅ centralized config

export async function GET() {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json([], { status: 200 }); // No auth → return empty
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json([], { status: 200 }); // No user → empty
        }

        const cartItems = await CartItem.find({ userId: user._id });
        return NextResponse.json(cartItems);
    } catch (error) {
        console.error("GET /api/user/cart error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = session?.user;

        const { productId, title, price, thumbnail, category } = await req.json();

        if (!productId || !title || !price || !thumbnail || !category) {
            return NextResponse.json({ message: "Missing product details" }, { status: 400 });
        }

        const existing = await CartItem.findOne({ userId: user.id, productId });

        if (existing) {
            await CartItem.deleteOne({ _id: existing._id });
            return NextResponse.json({ message: "Removed from cart", type: "removed" });
        }

        await CartItem.create({
            userId: user.id,
            productId,
            title,
            price,
            thumbnail,
            category,
            quantity: 1,
        });

        return NextResponse.json({ message: "Added to cart", type: "added" });
    } catch (error) {
        console.error("POST /api/user/cart error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
