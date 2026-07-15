import { db } from "@/lib/db";
import { subServiceTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type SubServiceInput = {
    serviceId: number;
    subserviceTag: string;
    description: string;
};

export async function getSubServices() {
    return db.select().from(subServiceTable);
}

export async function getSubServiceById(id: number) {
    const results = await db.select().from(subServiceTable).where(eq(subServiceTable.id, id));
    return results[0] ?? null;
}

export async function createSubService(input: SubServiceInput) {
    const results = await db.insert(subServiceTable).values(input).returning();
    return results[0];
}

export async function updateSubService(id: number, input: Partial<SubServiceInput>) {
    const results = await db.update(subServiceTable).set(input).where(eq(subServiceTable.id, id)).returning();
    return results[0] ?? null;
}

export async function deleteSubService(id: number) {
    const results = await db.delete(subServiceTable).where(eq(subServiceTable.id, id)).returning();
    return results[0] ?? null;
}
