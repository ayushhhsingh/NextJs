import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/User";
import { hashPassword, generateVerifyCode, getVerifyCodeExpiry } from "@/lib/auth";
import { signupValidation } from "@/schemas/signupschema";

export async function POST(request: NextRequest) {
  await dbconnect();

  try {
    const body = await request.json();

    // Validate input
    const result = signupValidation.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    // Check if user already exists with verified email
    const existingVerifiedUser = await UserModel.findOne({
      email,
      verifycode: { $exists: true },
      verifycodeexpiry: { $gt: new Date() },
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Check if username is taken
    const existingUsername = await UserModel.findOne({ Username: username });
    if (existingUsername) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Check if email exists (unverified user - update their details)
    const existingUser = await UserModel.findOne({ email });

    const hashedPassword = await hashPassword(password);
    const verifyCode = generateVerifyCode();
    const verifyCodeExpiry = getVerifyCodeExpiry();

    if (existingUser) {
      // Update existing unverified user
      existingUser.password = hashedPassword;
      existingUser.verifycode = verifyCode;
      existingUser.verifycodeexpiry = verifyCodeExpiry;
      await existingUser.save();
    } else {
      // Create new user
      const newUser = new UserModel({
        Username: username,
        email,
        password: hashedPassword,
        verifycode: verifyCode,
        verifycodeexpiry: verifyCodeExpiry,
        isAcceptingMessage: true,
        message: [],
      });
      await newUser.save();
    }

    // In production, send verification email here
    // For now, we'll return the code (remove in production!)
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
        verifyCode: verifyCode, // Remove this in production!
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
