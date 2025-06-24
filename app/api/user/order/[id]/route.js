import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const order = await Order.findOne({ _id: params.id, userId: user._id });
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        if (!["Placed", "Confirmed"].includes(order.status)) {
            return NextResponse.json({ message: "Order cannot be canceled" }, { status: 400 });
        }

        order.status = "Cancelled";
        await order.save();

        return NextResponse.json({ message: "Order cancelled successfully" });
    } catch (err) {
        console.error("Cancel Order Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
