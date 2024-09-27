import MessageChannelCard from "@/components/channel-page/message-channel-card";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function ChannelsPage() {
  const allChannels = await db.query.channels.findMany({
    with: {
      participants: true,
    },
  });

  return (
    <>
      {/* Message Channels */}
      <div className={"grid grid-cols-3 gap-4"}>
        {allChannels.map((channel) => (
          <MessageChannelCard key={channel.id} messageChannelData={channel} />
        ))}
      </div>
    </>
  );
}
