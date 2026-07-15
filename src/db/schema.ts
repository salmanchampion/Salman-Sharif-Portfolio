import { pgTable, serial, jsonb, timestamp } from "drizzle-orm/pg-core";

export const portfolioDataConfig = pgTable("portfolio_data_config", {
  id: serial("id").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
