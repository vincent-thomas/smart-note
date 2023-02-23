import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const docRouter = createTRPCRouter({
  createDoc: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const data = await prisma.doc.create({
        data: {
          title: input.title,
        },
      });
      console.log(data);
      return data;
    }),

  getDocs: publicProcedure
    .input(
      z
        .object({
          docId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const result = await prisma.doc.findMany({
        where: {
          id: input?.docId,
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
