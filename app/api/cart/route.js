import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import CartItem from "@/models/Cart";
import { connectToDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions"; // adjust path if needed

export async function POST(req) {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { productId, title, price, thumbnail, category } = await req.json();

    // Toggle logic
    const existing = await CartItem.findOne({ userId: user._id, productId });

    if (existing) {
        await CartItem.deleteOne({ _id: existing._id });
        return NextResponse.json({ message: "Removed from cart" });
    } else {
        await CartItem.create({
            userId: user._id,
            productId,
            title,
            price,
            thumbnail,
            category,
            quantity: 1,
        });
        return NextResponse.json({ message: "Added to cart" });
    }
}

export async function GET() {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json([], { status: 200 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json([], { status: 200 });

    const cartItems = await CartItem.find({ userId: user._id });
    return NextResponse.json(cartItems);
}
