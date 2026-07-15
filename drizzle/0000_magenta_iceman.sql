CREATE TABLE "owners" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "owners_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(150) NOT NULL,
	"lastName" varchar(150) NOT NULL,
	"email" varchar(150) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serviceTag" varchar(150) NOT NULL,
	"description" varchar(150) NOT NULL,
	"firstOwnerId" integer NOT NULL,
	"secondOwnerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sub_services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"serviceId" integer NOT NULL,
	"description" varchar(150) NOT NULL,
	"subserviceTag" varchar(150) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_firstOwnerId_owners_id_fk" FOREIGN KEY ("firstOwnerId") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_secondOwnerId_owners_id_fk" FOREIGN KEY ("secondOwnerId") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_services" ADD CONSTRAINT "sub_services_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;