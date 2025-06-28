import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const photoFile = formData.get("photo");

        if (!name || !email || !password) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await connectToDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let photoUrl = "";

        if (photoFile && typeof photoFile.arrayBuffer === "function") {
            const arrayBuffer = await photoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            photoUrl = await uploadImageToCloudinary(buffer);
        }

        await User.create({
            name,
            email,
            password: hashedPassword,
            photo: photoUrl,
        });

        return new NextResponse("User Sign Up successfully", { status: 201 });
    } catch (error) {
        console.error("Signup Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
