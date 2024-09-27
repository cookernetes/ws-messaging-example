"use client";

import { Button } from "@/components/ui/button";
import type { Channel } from "@/lib/server/db/schema/messages";
import BaseCard from "@/components/base-card";
import { useRouter } from "next/navigation";

export default function MessageChannelCard({
  messageChannelData: { id, name },
}: {
  messageChannelData: Channel;
}) {
  const router = useRouter();

  return (
    <BaseCard>
      <h2>{name}</h2>
      ID: <pre>{id}</pre>
      <span className={"justify-self-end grow flex"}>
        <Button
          role={"link"}
          className={"self-end w-full"}
          onClick={() => router.push(`/channels/${id}`)}
        >
          Go to Channel
        </Button>
      </span>
    </BaseCard>
  );
}
