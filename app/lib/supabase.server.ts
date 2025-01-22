import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export function createSSRClient(request: Request) {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        // setAll(cookiesToSet) {
        //   cookiesToSet.forEach(({ name, value, options }) => {
        //     return headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
        //   })
        // }
      }
    }
  )
}
