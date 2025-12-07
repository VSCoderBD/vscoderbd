import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  try {
    const CHANNEL_ID = "UCk_pBB6TriKLB_biEnMo4kg"; // চাইলে env এ রাখতে পারো
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const res = await fetch(RSS_URL, { cache: "no-store" });
    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const json = parser.parse(xml);

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: "RSS parse error" }, { status: 500 });
  }
}
