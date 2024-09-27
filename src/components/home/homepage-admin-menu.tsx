"use client";

import { Button } from "@/components/ui/button";
import { createChannel, createUser, loginToAccountById } from "@/lib/server/actions";
import CreateNewXDialog from "@/components/home/create-new-x-dialog";
import { useRouter } from "next/navigation";

export default function HomepageAdminMenu() {
  const router = useRouter();

  const handleCreateChannel = async ([channelName]: string[]) => {
    await createChannel({ name: channelName });
  };

  const handleCreateUser = async ([username, email]: string[]) => {
    await createUser({ username, email });
    router.refresh();
  };

  return (
    <div className={"flex gap-4"}>
      <Button onClick={() => loginToAccountById(1)}>"Log in" (to user with ID 1)</Button>
      <Button onClick={() => loginToAccountById(2)}>"Log in" (to user with ID 2)</Button>

      <CreateNewXDialog
        xText={"Channel"}
        dataFields={["Name"] as const}
        onSubmit={(fdvs) => handleCreateChannel(fdvs)}
      />

      <CreateNewXDialog
        xText={"User"}
        dataFields={["Username", "Email"] as const}
        onSubmit={(fdvs) => handleCreateUser(fdvs)}
      />
    </div>
  );
}
