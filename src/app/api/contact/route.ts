import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "k30smy10", 
  dataset: "production",      
  useCdn: true,
  apiVersion: "2023-01-01",
});


export async function GET(req: NextRequest) {
  try {
    const data = await client.fetch(`*[_type == "contact"][0]`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
