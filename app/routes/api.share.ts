import { data, ActionFunction } from "@remix-run/node";
import { createSSRClient } from "~/lib/supabase.server";
import { validateFormData } from "~/lib/schemas";
import { SchemaTable } from "~/lib/types";
import { rateLimit } from "~/lib/limiter";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  const formData = await request.formData();
  const { success, output } = validateFormData(Object.fromEntries(formData));

  if (!success) {
    return data({
      success: false,
      message: "Unable to share code",
    }, { status: 400 });
  }

  const headers = new Headers(request.headers);
  const { success: rateLimitSuccess } = await rateLimit(headers, { limit: 10 });

  if (!rateLimitSuccess) {
    return data({
      success: false,
      message: "Rate limit exceeded",
    }, { status: 429 });
  }

  const supabase = createSSRClient(request);

  const { status } = await supabase
    .from(SchemaTable.Shares)
    .upsert({ id: output.id, code: output.code })

  if (status === 200 || status === 201) {
    return data({
      success: true,
      message: "Share code copied to clipboard",
    }, { status, headers });
  } else {
    return data({
      success: false,
      message: "Failed to share code",
    }, { status, headers });
  }
};
