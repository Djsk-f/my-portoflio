import { NextResponse } from "next/server";
import { getGithubActivity } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    return NextResponse.json(await getGithubActivity());
  } catch (error) {
    console.error("[api/github]", error);
    return NextResponse.json({ error: "GitHub indisponible" }, { status: 502 });
  }
}
