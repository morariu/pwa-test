import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .extend({
    email: z.string().email("Invalid email address"),
    confirmPassword: z.string(),
  })
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type InsertUser = Omit<z.infer<typeof insertUserSchema>, "confirmPassword">;
export type User = typeof users.$inferSelect;