import { NextResponse } from "next/server";
import apiClient from "@/lib/axios-client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await apiClient.get("/web/subscription-plans");

    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error?.response?.status ?? 500;
    const payload = error?.response?.data ?? {
      message: "Subscription plans could not be fetched.",
    };

    return NextResponse.json(payload, { status });
  }
}