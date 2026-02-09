import { NextRequest, NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  await dbconnect();

  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and code are required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if code is valid and not expired
    const isCodeValid = user.verifycode === code;
    const isCodeNotExpired = new Date(user.verifycodeexpiry) > new Date();

    if (!isCodeValid) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    }

    if (!isCodeNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Mark user as verified by clearing the verify code
    user.verifycode = "";
    user.verifycodeexpiry = new Date(0);
    await user.save();

    return NextResponse.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "Error verifying email" },
      { status: 500 }
    );
  }
}
