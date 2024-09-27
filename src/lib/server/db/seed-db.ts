import { db } from ".";
import { users } from "@/lib/server/db/schema/users";
import { channels, messages, channelParticipants } from "@/lib/server/db/schema/messages";

const insertedUserId = (
  await db
    .insert(users)
    .values({
      createdAt: new Date(),
      username: "cookernetes",
      email: "bearcodes@outlook.com",
    })
    .returning({ insertedId: channels.id })
)[0].insertedId;
console.log("✅ Seeded initial user");

const insertedChannelId = (
  await db
    .insert(channels)
    .values({
      name: "test-channel-1",
      createdAt: new Date(),
    })
    .returning({ insertedId: channels.id })
)[0].insertedId;
console.log("✅ Seeded initial channel");

await db.insert(channelParticipants).values({
  participantId: insertedUserId,
  channelId: insertedChannelId,
});

await db.insert(messages).values({
  createdAt: new Date(),
  content: "This is a real message test!",
  authorId: insertedUserId,
  channelId: insertedChannelId,
});
console.log("✅ Seeded initial message");
