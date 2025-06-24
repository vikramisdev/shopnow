import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

// GET: return current user info
// POST: update name/email/photo
export async function GET() {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email }).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("GET /api/user error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { name, email, photo, password } = await req.json();

        const updateData = {
            name,
            email,
            photo,
        };

        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("POST /api/user error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
