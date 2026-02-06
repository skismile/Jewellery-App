/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/config/db";
import Inquiry from "@/model/Inquiry";
import { NextResponse } from "next/server";

// GET: List all inquiries
export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: inquiries },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// POST: Submit a new inquiry
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
