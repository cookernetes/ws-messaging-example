import { db } from "@/lib/server/db";
import { desc, eq } from "drizzle-orm";
import { channels, messages as messagesTable } from "@/lib/server/db/schema";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import MessageFeed from "@/components/channel-page/message-feed";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page({ params: { channelId } }: { params: { channelId: number } }) {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get("userId");
  if (!userIdCookie)
    return (
      <div>
        <h2>
          Please go back to the <Link href={"/"}>home page</Link> and "log in" to a user account.
        </h2>
      </div>
    );

  const userId = parseInt(userIdCookie.value);

  const channelData = await db.query.channels.findFirst({
    where: eq(channels.id, channelId),
    with: {
      participants: {
        with: {
          user: true,
        },
      },
      messages: {
        with: {
          author: true,
        },
        limit: 20,
        orderBy: [desc(messagesTable.id)],
      },
    },
  });

  if (channelData === undefined) notFound();
  const { messages, participants } = channelData;

  return (
    <>
      <h2>Channel Participants: {participants.map((p) => p.user.username).join(", ")}</h2>

      <MessageFeed initialMessageData={messages} channelId={channelId} userId={userId} />
    </>
  );
}
