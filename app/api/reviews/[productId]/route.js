import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(req, { params }) {
    try {
        await connectToDB();
        const { productId } = params;
        const reviews = await Review.find({ productId }).populate("user", "name image");
        return NextResponse.json(reviews);
    } catch (error) {
        console.error("GET Reviews error:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        await connectToDB();
        const { productId } = params;
        const { user, comment, rating } = await req.json();

        if (!user || !comment || typeof rating !== "number") {
            return NextResponse.json({ error: "Invalid review data" }, { status: 400 });
        }

        const review = await Review.create({
            productId,
            user, // user ID (string)
            comment,
            rating,
            date: new Date(),
        });

        return NextResponse.json({ message: "Review added", review }, { status: 201 });
    } catch (error) {
        console.error("POST Review error:", error);
        return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
    }
}
