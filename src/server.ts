import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import type { Message, MessageWithAuthor } from "@/lib/server/db/schema";
import { createMessage } from "@/lib/server/db/db-methods";

const PORT = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port: PORT });
const handler = app.getRequestHandler();

await app.prepare();

const httpServer = createServer(handler);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

export type NewMessagePartialType = Omit<Message, "createdAt" | "id">;

export interface ServerToClientEvents {
  newMessage: (newMessage: MessageWithAuthor) => void;
}

export interface ClientToServerEvents {
  createMessage: (newMessageData: NewMessagePartialType) => Promise<void>;
}

io.on("connection", (socket) => {
  console.log("😀 +1 Connection!");

  const {
    handshake: { headers },
  } = socket;

  if (!headers.channelid || typeof headers.channelid !== "string") return socket.disconnect();
  socket.join(`channel:${headers.channelid}`);
  console.log(`✔️ Joined user to channel: 'channel:${headers.channelid}'`);

  socket.on("disconnect", () => console.log("☹️ -1 Connection"));
  socket.on("createMessage", async (newMessageData) => {
    try {
      const newMessage = await createMessage(newMessageData);
      io.to(`channel:${headers.channelid}`).emit("newMessage", newMessage);
    } catch (_) {
      return;
    }
  });
});

httpServer
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(PORT, () => {
    console.log(
      `> Ready on http://localhost:${PORT} as ${dev ? "development" : process.env.NODE_ENV}`,
    );
  });
