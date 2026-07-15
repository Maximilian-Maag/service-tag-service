import { createHash } from "crypto";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiTokensTable } from "@/db/schema";

export const config = {
    matcher: "/api/:path*",
};

export async function proxy(request: NextRequest) {
    const bearer = request.headers.get("authorization");
    const token = bearer?.startsWith("Bearer ") ? bearer.slice(7) : null;

    if (!token) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const rows = await db
        .select({ id: apiTokensTable.id })
        .from(apiTokensTable)
        .where(eq(apiTokensTable.tokenHash, tokenHash))
        .limit(1);

    if (rows.length === 0) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
}
