CREATE TABLE "api_tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "api_tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(150) NOT NULL,
	"tokenHash" varchar(64) NOT NULL,
	CONSTRAINT "api_tokens_tokenHash_unique" UNIQUE("tokenHash")
);
