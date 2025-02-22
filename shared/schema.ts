import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .extend({
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  })
  .pick({
    username: true,
    password: true,
    name: true,
    surname: true,
    email: true,
    phone: true,
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
