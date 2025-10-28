// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; // 함수는 서비스키로 실행
    const supabase = createClient(url, key);

    const body: any[] = await req.json();
    if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ ok: false, error: "Body must be array" }), { status: 400, headers: cors });
    }

    let saved = 0;
    for (const item of body) {
      if (item?.type !== "emotion") continue;
      const session = item.payload?.session ?? {};
      const emotion  = item.payload?.emotion ?? {};

      // 1) session insert
      const { data: s, error: e1 } = await supabase
        .from("session")
        .insert({
          user_id: session.user_id ?? null,
          routine_slug: session.routine_slug ?? "unknown",
          duration_seconds: session.duration_seconds ?? null,
          device: session.device ?? "web",
          ended_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (e1) throw e1;

      // 2) emotion_entry append
      const { error: e2 } = await supabase
        .from("emotion_entry")
        .insert({
          session_id: s.id,
          color_hex: emotion.color_hex ?? "#CFE8FF",
          intensity: emotion.intensity ?? 40,
          note: String(emotion.note ?? "").slice(0, 200),
        });
      if (e2) throw e2;

      saved++;
    }

    return new Response(JSON.stringify({ ok: true, saved }), { headers: { "content-type": "application/json", ...cors } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: cors });
  }
});


