import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Order from "@/models/Order";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import { Types } from "mongoose";

export async function POST(req) {
    try {
        await connectToDB();

        const session = await getServerSession(authOptions);
        console.log("Session:", session);

        const userId = session?.user?.id;
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Normalize paymentMethod
        const validPaymentMethods = ["creditCard", "upi", "cashOnDelivery"];
        if (!validPaymentMethods.includes(body.paymentMethod)) {
            return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
        }

        const newOrder = new Order({
            userId,
            products: body.products,
            totalAmount: body.totalAmount,
            address: body.address,
            paymentMethod: body.paymentMethod, // already validated
            deliveryEstimate: body.deliveryEstimate,
        });

        await newOrder.save();

        return NextResponse.json({ message: "Order placed successfully" }, { status: 201 });
    } catch (error) {
        console.error("Order Save Error:", error);
        return NextResponse.json(
            {
                message: "Failed to place order",
                error: error?.message ?? "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDB();

        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userObjectId = new Types.ObjectId(userId);

        const orders = await Order.find({ userId: userObjectId }).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (err) {
        console.error("GET Orders Error:", err);
        return NextResponse.json(
            { message: "Server Error", error: err?.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}
