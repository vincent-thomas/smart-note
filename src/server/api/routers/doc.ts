import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import superjson from "superjson";

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

  getDoc: publicProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .query(({ ctx: { prisma }, input: { docId } }) =>
      prisma.doc.findUnique({
        where: {
          id: docId,
        },
        include: {
          blocks: {
            where: {
              docId,
            },
            orderBy: {
              index: "asc",
            },
          },
        },
      })
    ),
  getDocs: publicProcedure
    .input(
      z
        .object({
          docId: z.string().optional(),
          withBlocks: z.boolean().optional().default(false),
        })
        .optional()
    )
    .query(({ ctx: { prisma }, input }) =>
      prisma.doc.findMany({
        where: {
          id: input?.docId,
        },
        include: {
          blocks: input?.withBlocks
            ? {
                where: {
                  docId: input?.docId,
                },
              }
            : false,
        },
      })
    ),

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
