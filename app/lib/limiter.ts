import { createCookie } from "@remix-run/node";

enum Cookie {
  Key = "share_code",
  Duration = 10_000,
  Limit = 30,
}

type RateLimit = {
  expiresAt: number;
  count: number;
} | null;

const { COOKIE_SECRET = "" } = process.env;

export async function rateLimit(
  headers: Headers,
  {
    limit = Cookie.Limit,
    duration = Cookie.Duration,
  }: { limit?: number; duration?: number } = {}
) {
  const cookie = createCookie(Cookie.Key, {
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + duration),
    maxAge: duration,
    secrets: COOKIE_SECRET ? [COOKIE_SECRET] : [],
  })

  if (!cookie.isSigned) {
    throw new Response("Unauthorized", {
      status: 500,
    });
  }

  const value = ((await cookie.parse(headers.get("Cookie"))) as RateLimit) ?? {
    count: 0,
    expiresAt: Date.now() + duration,
  }

  value.count++;

  if (value.expiresAt < Date.now()) {
    value.count = 0;
    value.expiresAt = Date.now() + duration;
  }

  headers.append("Set-Cookie", await cookie.serialize(value));

  return { success: value.count <= limit };
}
