import { db } from "@/lib/db";
import { ownerTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type OwnerInput = {
    name: string;
    lastName: string;
    email: string;
};

export async function getOwners() {
    return db.select().from(ownerTable);
}

export async function getOwnerById(id: number) {
    const results = await db.select().from(ownerTable).where(eq(ownerTable.id, id));
    return results[0] ?? null;
}

export async function createOwner(input: OwnerInput) {
    const results = await db.insert(ownerTable).values(input).returning();
    return results[0];
}

export async function updateOwner(id: number, input: Partial<OwnerInput>) {
    const results = await db.update(ownerTable).set(input).where(eq(ownerTable.id, id)).returning();
    return results[0] ?? null;
}

export async function deleteOwner(id: number) {
    const results = await db.delete(ownerTable).where(eq(ownerTable.id, id)).returning();
    return results[0] ?? null;
}
