"use client";

import { io, type Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "@/server";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const getSocket = (channelId: number) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io("http://localhost:3000", {
    extraHeaders: {
      channelId: channelId.toString(),
    },
  });

  return socket;
};
