"use server";

import { cookies } from "next/headers";
import { FullChannelData, User, users } from "@/lib/server/db/schema";
import { db } from "./db";
import { channels } from "./db/schema";

export async function loginToAccountById(id: number) {
  cookies().set("userId", `${id}`);
}

export async function createUser({ username, email }: Omit<User, "createdAt" | "id">) {
  await db.insert(users).values({ createdAt: new Date(), username, email });
}

export async function createChannel({
  name,
}: Omit<FullChannelData, "id" | "participants" | "messages" | "createdAt">) {
  await db.insert(channels).values({ createdAt: new Date(), name });
}
