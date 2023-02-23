import { createTRPCRouter } from "@/server/api/trpc";
import { docRouter } from "@/server/api/routers/doc";
import { blockRouter } from "@/server/api/routers/block";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  doc: docRouter,
  block: blockRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
