"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MessageInputForm({
  onSubmit,
  className,
}: {
  onSubmit?: (msg: string) => void;
  className?: string;
}) {
  const [messageContent, setMessageContent] = useState<string>("");

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    const msg = messageContent.trim();
    if (messageContent === "") return;
    setMessageContent("");

    // Bubble up event (if parent is listening)
    onSubmit && onSubmit(msg);
  };

  return (
    <form onClick={handleSubmit} className={cn("flex gap-1", className)}>
      <Input value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
      <Button type={"submit"} disabled={messageContent.trim() === ""}>
        Send Message
      </Button>
    </form>
  );
}
