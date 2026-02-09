import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { verifyPassword, createToken } from "@/lib/auth";
import { signinschema } from "@/schemas/signinschema";

export async function POST(request: NextRequest) {
  await dbconnect();

  try {
    const body = await request.json();

    // Validate input
    const result = signinschema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const { identifier, password } = result.data;

    // Find user by email or username
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { Username: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create token
    const token = createToken({
      id: user._id.toString(),
      email: user.email,
      username: user.Username,
    });

    // Create response with cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.Username,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { success: false, message: "Error signing in" },
      { status: 500 }
    );
  }
}
