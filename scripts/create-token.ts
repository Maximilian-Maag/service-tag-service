import "dotenv/config";
import { createHash, randomBytes } from "crypto";
import { db } from "../lib/db";
import { apiTokensTable } from "../db/schema";

const name = process.argv[2];
if (!name) {
    console.error("Usage: make token-create name=<service-name>");
    process.exit(1);
}

const token = randomBytes(32).toString("hex");
const tokenHash = createHash("sha256").update(token).digest("hex");

await db.insert(apiTokensTable).values({ name, tokenHash });

console.log(`\nToken for "${name}":\n`);
console.log(token);
console.log("\n(Store this securely — it will not be shown again)\n");
