import { NewMessagePartialType } from "@/server";
import { messages, MessageWithAuthor } from "@/lib/server/db/schema";
import { db } from "@/lib/server/db/index";
import { eq } from "drizzle-orm";

export async function createMessage({
  content,
  authorId,
  channelId,
}: NewMessagePartialType): Promise<MessageWithAuthor> {
  // Of course, in a real-world situation, an authentication middleware would be in place to stop
  // unauthenticated message requests.
  const createdMessage = await db.insert(messages).values({
    createdAt: new Date(),
    channelId: channelId,
    authorId: authorId,
    content: content,
  });

  if (createdMessage.changes !== 1) throw new Error();

  const msgWithAuthor = await db.query.messages.findFirst({
    where: eq(messages.id, createdMessage.lastInsertRowid as number),
    with: {
      author: true,
    },
  });

  if (!msgWithAuthor) throw new Error();

  return msgWithAuthor;
}
