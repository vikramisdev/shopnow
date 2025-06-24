import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Favorite from "@/models/Favorite";
import { connectToDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json([], { status: 200 }); // unauthenticated → empty list
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json([], { status: 200 }); // no user found → empty list
        }

        const favorites = await Favorite.find({ userId: user._id });
        return NextResponse.json(favorites);
    } catch (error) {
        console.error("GET /api/user/favorites error:", error);
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

        const email = session.user.email;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { productId, title, price, thumbnail, category } = await req.json();

        if (!productId || !title || !price || !thumbnail || !category) {
            return NextResponse.json({ message: "Missing product details" }, { status: 400 });
        }

        const existing = await Favorite.findOne({ userId: user._id, productId });

        if (existing) {
            await Favorite.deleteOne({ _id: existing._id });
            return NextResponse.json({ message: "Removed from favorites", type: "removed" });
        }

        await Favorite.create({
            userId: user._id,
            productId,
            title,
            price,
            thumbnail,
            category,
        });

        return NextResponse.json({ message: "Added to favorites", type: "added" });
    } catch (error) {
        console.error("POST /api/user/favorites error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
