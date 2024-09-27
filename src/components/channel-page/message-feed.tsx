"use client";

import { useEffect, useRef, useState } from "react";
import type { MessageWithAuthor } from "@/lib/server/db/schema";
import Message from "@/components/channel-page/message";
import MessageInputForm from "@/components/channel-page/message-input-form";
import type { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

export default function MessageFeed({
  initialMessageData,
  channelId,
  userId,
}: {
  initialMessageData: MessageWithAuthor[];
  channelId: number;
  userId: number;
}) {
  const [messages, setMessages] = useState<MessageWithAuthor[]>(initialMessageData);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket(channelId);
    socketRef.current = socket;

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => setTransport(transport.name));
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport(null);
    }

    function newMessage(message: MessageWithAuthor) {
      setMessages((prevMessages) => [message, ...prevMessages]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newMessage", newMessage);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newMessage", newMessage);
      socket.disconnect();
    };
  }, []);

  const handleMessageSubmit = async (msg: string) => {
    socketRef.current?.emit("createMessage", { content: msg, authorId: userId, channelId });
  };

  return (
    <section>
      <div className={"space-y-1"}>
        {messages.map((message) => (
          <Message key={message.id} data={{ ...message, author: message.author }} />
        ))}
      </div>

      <span className={"sticky bottom-0 bg-white left-0 right-0 border-t"}>
        <div className={"p-6 bg-white"}>
          <MessageInputForm onSubmit={handleMessageSubmit} className={"py-4"} />
          <h4>Debug Information:</h4>
          <code>
            Status: `{isConnected ? "connected" : "disconnected"}`, Transport: `{transport}`
          </code>
        </div>
      </span>
    </section>
  );
}
