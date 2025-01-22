import { data, ActionFunction } from "@remix-run/node";
import { createSSRClient } from "~/lib/supabase.server";
import { SchemaTable } from "~/lib/types";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  const supabase = createSSRClient(request);

  const formData = await request.formData();
  const id = formData.get("id");
  const code = formData.get("code");

  // TODO: add valibot validation

  const { status } = await supabase
    .from(SchemaTable.Shares)
    .upsert({ id, code })

  if (status === 200 || status === 201) {
    return data({
      success: true,
      message: "Share code copied to clipboard",
    }, { status });
  } else {
    return data({
      success: false,
      message: "Failed to share code",
    }, { status });
  }
};
