import type { MessageWithAuthor } from "@/lib/server/db/schema";
import BaseCard from "@/components/base-card";
import { Separator } from "@/components/ui/separator";

export default function Message({
  data: { content, createdAt, author },
}: {
  data: MessageWithAuthor;
}) {
  return (
    <BaseCard>
      <div>
        <b>{author.username}</b>{" "}
        <span className={"text-muted-foreground text-sm"}>
          (ID: {author.id}, Email: {author.email})
        </span>
        <Separator className={"mt-0"} />
      </div>
      <p>{content}</p>
      <pre className={"text-sm text-muted-foreground"}>{new Date(createdAt).toTimeString()}</pre>
    </BaseCard>
  );
}
