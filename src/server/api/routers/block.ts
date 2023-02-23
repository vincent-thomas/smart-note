import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const blockRouter = createTRPCRouter({
  createBlock: publicProcedure
    .input(z.object({ type: z.string().optional(), docId: z.string() }))
    .mutation(async ({ input: { type, docId }, ctx: { prisma } }) => {
      const data = await prisma.docBlock.create({
        data: {
          type: type || "text",
          Doc: {
            connect: {
              id: docId,
            },
          },
        },
      });
      return data;
    }),

  getBlocks: publicProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { docId } }) => {
      const result = await prisma.docBlock.findMany({
        where: {
          docId,
        },
      });
      console.log(result);

      return result;
    }),

  changeTitle: publicProcedure
    .input(
      z.object({
        docId: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { title, docId } }) => {
      const result = await prisma.doc.update({
        where: {
          id: docId,
        },
        data: {
          title,
        },
      });
      console.log(result);

      return result;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
