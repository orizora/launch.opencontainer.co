import { NextResponse } from "next/server";
import apiClient from "@/lib/axios-client";
import { addCorsHeaders, corsPreflight } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET() {
  try {
    const response = await apiClient.get("/web/subscription-plans");

    return addCorsHeaders(NextResponse.json(response.data));
  } catch (error: any) {
    const status = error?.response?.status ?? 500;
    const payload = error?.response?.data ?? {
      message: "Subscription plans could not be fetched.",
    };

    return addCorsHeaders(NextResponse.json(payload, { status }));
  }
}