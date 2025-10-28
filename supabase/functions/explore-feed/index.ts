import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(url, key);

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);
    const cursor = searchParams.get("cursor"); // created_at 기준 커서

    let query = supabase
      .from("emotion_entry")
      .select("id, color_hex, intensity, note, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    const { data, error } = await query;
    if (error) throw error;

    const nextCursor = data.length ? data[data.length - 1].created_at : null;

    return new Response(JSON.stringify({ items: data, nextCursor }), {
      headers: { "content-type": "application/json", ...cors },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: cors });
  }
});


