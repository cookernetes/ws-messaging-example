import { Separator } from "@/components/ui/separator";
import LittleAdminNav from "@/components/home/little-admin-nav";
import HomepageAdminMenu from "@/components/home/homepage-admin-menu";
import { db } from "@/lib/server/db";

export default async function Home() {
  const allUsers = await db.query.users.findMany();

  return (
    <>
      <h2>Administrative Panel / Home</h2>
      <Separator />

      <LittleAdminNav />
      <Separator />

      <HomepageAdminMenu />
      <Separator />

      <span>
        <h4>All users:</h4>
        <div className={"space-y-1"}>
          {allUsers.map((u, idx) => (
            <pre key={idx}>{JSON.stringify(u, null, 2)}</pre>
          ))}
        </div>
      </span>
    </>
  );
}
