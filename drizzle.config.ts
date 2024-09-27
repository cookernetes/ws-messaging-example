import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/server/db/schema/**/*.{ts,js}",
  dbCredentials: {
    url: "file:./app.db",
  },
  verbose: true,
  out: "./drizzle",
});
