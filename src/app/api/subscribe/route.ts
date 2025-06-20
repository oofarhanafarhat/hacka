import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    // Simple validation (you can improve this later)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format." }, { status: 400 });
    }

    // ✅ Right now just log the email (you can connect DB later)
    console.log("New subscriber:", email);

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
