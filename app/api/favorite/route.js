import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Favorite from "@/models/Favorite";
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

    const existing = await Favorite.findOne({ userId: user._id, productId });

    if (existing) {
        await Favorite.deleteOne({ _id: existing._id });
        return NextResponse.json({ message: "Removed from favorites" });
    } else {
        await Favorite.create({
            userId: user._id,
            productId,
            title,
            price,
            thumbnail,
            category,
        });
        return NextResponse.json({ message: "Added to favorites" });
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

    const favorites = await Favorite.find({ userId: user._id });
    return NextResponse.json(favorites);
}
