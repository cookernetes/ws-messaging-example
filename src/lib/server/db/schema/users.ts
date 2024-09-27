import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { channels, messages } from "./messages";
import type { Message, FullChannelData } from "./messages";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  channels: many(channels),
}));

const usersToChannels = sqliteTable("usersToChannels", {
  userId: integer("id")
    .notNull()
    .references(() => users.id),
  channelId: integer("id")
    .notNull()
    .references(() => channels.id),
});

// Types
export type User = typeof users.$inferSelect;
export type FullUserData = User & { messages: Message[]; participatingChannels: FullChannelData[] };
