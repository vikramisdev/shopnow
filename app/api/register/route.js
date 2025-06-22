import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        // const photo = formData.get("photo");

        if (!email || !password || !name) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await connectToDB();

        const userExists = await User.findOne({ email });
        if (userExists) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            photo: "", // you can store Cloudinary URL here later
        });

        return new NextResponse("User registered successfully", { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
