
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
