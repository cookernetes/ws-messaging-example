import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { User, users } from "./users";

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  channelId: integer("channel_id")
    .references(() => channels.id)
    .notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.authorId],
    references: [users.id],
  }),
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
}));

export const channels = sqliteTable("channels", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const channelsRelations = relations(channels, ({ many }) => ({
  participants: many(channelParticipants),
  messages: many(messages),
}));

export const channelParticipants = sqliteTable("channel_participants", {
  id: integer("id").primaryKey(),
  participantId: integer("participant_id")
    .references(() => users.id)
    .notNull(),
  channelId: integer("channel_id")
    .references(() => channels.id)
    .notNull(),
});

export const channelParticipantsRelations = relations(channelParticipants, ({ one }) => ({
  user: one(users, {
    fields: [channelParticipants.id],
    references: [users.id],
  }),
  channel: one(channels, {
    fields: [channelParticipants.channelId],
    references: [channels.id],
  }),
}));

// Types
export type Message = typeof messages.$inferSelect;
export type Channel = typeof channels.$inferSelect;
export type MessageWithAuthor = Message & { author: User };
export type FullChannelData = Channel & { participants: User[]; messages: Message[] };
export type ExtendedFullChannelData = Channel & {
  participants: User[];
  messages: MessageWithAuthor[];
};
