import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const apiTokensTable = pgTable("api_tokens", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 150 }).notNull(),
    tokenHash: varchar({ length: 64 }).notNull().unique(),
});

export const serviceTable = pgTable("services", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    serviceTag: varchar({ length: 150 }).notNull(),
    description: varchar({ length: 150 }).notNull(),
    firstOwnerId: integer().notNull().references(() => ownerTable.id),
    secondOwnerId: integer().notNull().references(() => ownerTable.id)
});

export const subServiceTable = pgTable("sub_services", { 
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    serviceId: integer().notNull().references(() => serviceTable.id),
    description: varchar({ length: 150 }).notNull(),
    subserviceTag: varchar({ length: 150 }).notNull()
});

export const ownerTable = pgTable("owners", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 150 }).notNull(),
    lastName: varchar({ length: 150 }).notNull(),
    email: varchar({ length: 150 }).notNull()
 });