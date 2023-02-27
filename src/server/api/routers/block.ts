import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { DocBlockType } from "@prisma/client";
import { IDocBlock } from "@/types/docblock";

export const blockRouter = createTRPCRouter({
  createBlock: publicProcedure
    .input(
      z.object({
        type: z.nativeEnum(DocBlockType),
        docId: z.string(),
        id: z.string().cuid().optional(),
        index: z.number().optional(),
      })
    )
    .mutation(({ input: { type, docId, id, index }, ctx: { prisma } }) =>
      prisma.$transaction(async (tx) => {
        const result = await tx.docBlock.findMany({
          where: {
            docId,
          },
          orderBy: {
            index: "desc",
          },
          take: 1,
        });

        const doc = result?.[0];
        const ifNotIndex = doc === undefined ? 0 : doc?.index + 1;

        return prisma.docBlock.create({
          data: {
            id,
            type,
            data: { content: "test" },
            index: index || ifNotIndex,
            Doc: {
              connect: {
                id: docId,
              },
            },
          },
        });
      })
    ),

  getBlocks: publicProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { docId } }) => {
      return await prisma.docBlock.findMany({
        where: {
          docId,
        },
      });

      // const data = result.map((v) => ({
      //   ...v,
      //   data: JSON.parse(v.data.toString()),
      // }));
      // console.log(data);
    }),
    getBlock: publicProcedure
    .input(
      z.object({
        blockId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { blockId } }) => {
      return await prisma.docBlock.findUnique({
        where: {
          id: blockId,
        },
      });

      // const data = result.map((v) => ({
      //   ...v,
      //   data: JSON.parse(v.data.toString()),
      // }));
      // console.log(data);
    }),

  mutateBlock: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        type: z.nativeEnum(DocBlockType).optional(),
        index: z.number().optional(),
        data: z.object({
          content: z.string().optional(),
          tags: z.array(z.string()).optional(),
        }),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id, type, data, index } }) => {
      const result = await prisma.docBlock.update({
        where: {
          id,
        },
        data: {
          index,
          type,
          data: {
            content: data.content,
          },
        },
      });
      // const out = {
      //   ...result,
      //   data: fromBuffer(result.data),
      // };

      return result;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
