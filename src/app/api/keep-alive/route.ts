import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function GET(req: Request) {
  // Verify the request is from Vercel Cron (optional but recommended)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Simple lightweight query to keep the database active
    const { data, error } = await supabase
      .from("portfolio_documents")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Keep-alive query failed:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    console.log(`[Keep-Alive] Supabase pinged successfully at ${timestamp}`);

    return NextResponse.json({
      success: true,
      message: "Supabase database is alive",
      timestamp,
      rowsFound: data?.length ?? 0,
    });
  } catch (err) {
    console.error("Keep-alive error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
