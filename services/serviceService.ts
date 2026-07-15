import { db } from "@/lib/db";
import { serviceTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type ServiceInput = {
    serviceTag: string;
    description: string;
    firstOwnerId: number;
    secondOwnerId: number;
};

export async function getServices() {
    return db.select().from(serviceTable);
}

export async function getServiceById(id: number) {
    const results = await db.select().from(serviceTable).where(eq(serviceTable.id, id));
    return results[0] ?? null;
}

export async function createService(input: ServiceInput) {
    const results = await db.insert(serviceTable).values(input).returning();
    return results[0];
}

export async function updateService(id: number, input: Partial<ServiceInput>) {
    const results = await db.update(serviceTable).set(input).where(eq(serviceTable.id, id)).returning();
    return results[0] ?? null;
}

export async function deleteService(id: number) {
    const results = await db.delete(serviceTable).where(eq(serviceTable.id, id)).returning();
    return results[0] ?? null;
}
