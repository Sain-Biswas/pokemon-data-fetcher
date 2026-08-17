import { Database } from "@tursodatabase/database";
import { drizzle } from "drizzle-orm/tursodatabase/database";
import { relations } from "~/database/relations.database";

const client = new Database(process.env["DATABASE_FILE_NAME"]!);

export const database = drizzle({ client, relations });
