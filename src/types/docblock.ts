import type { DocBlock } from "@prisma/client";

export interface IDocBlock extends DocBlock {
  data: {
    content?: string;
    tags: string[];
  };
}