import { IDocBlock } from "@/types/docblock";
import { Doc } from "@prisma/client";
export const docState: Doc & { blocks: IDocBlock[] } = {
  title: "n/a",
  id: "n/a",
  blocks: [],
};

// import { create } from "zustand";
// import createId from "cuid";
// import { client } from "@/utils/api";
// import type { DocBlock, Doc } from "@prisma/client";
// import { produce } from "immer";
// import { IDocBlock } from "@/types/docblock";
// interface DocumentStore {
//   status: "loading" | "done" | "error" | "stale";
//   title: string;
//   setTitle: (title: string) => void;
//   addBlock: () => Promise<void>;
//   docId: string;
//   modifyContent: (blockId: string, content: string) => void;
//   setupDoc: (docId: string) => Promise<void>;
//   blocks: IDocBlock[];
//   syncBlock: (blockId: string) => Promise<void>;
// }

// export const useDocumentStore = create<DocumentStore>()((set, get) => ({
//   title: "n/a",
//   setTitle: (title: string) =>
//     set(() => ({
//       title,
//     })),
//   docId: "n/a",
//   status: "stale",
//   setupDoc: async (docId: string) => {
//     set(() => ({ status: "loading" }));
//     const result = await client.doc.getDocs.query({
//       docId,
//       withBlocks: true,
//     });
//     if (result?.[0] === undefined) {
//       console.error("ERROR");
//       set(() => ({ status: "error" }));
//     } else {
//       const block = result[0] as Doc & { DocBlocks: IDocBlock[] };
//       set(() => ({
//         docId,
//         title: block.title,
//         status: "done",
//         blocks: block.DocBlocks,
//       }));
//     }
//   },

//   blocks: [],
//   addBlock: async (type: "text" = "text") => {
//     const id = createId();
//     const data = get();
//     set(() => ({ status: "loading" }));
//     const result = await client.block.createBlock.mutate({
//       docId: data.docId,
//       type,
//       id,
//     });
//     set(
//       produce((store: DocumentStore) => {
//         store.blocks.push(result);
//         store.status = "done";
//       })
//     );
//   },
//   modifyContent: (blockId: string, content: string) =>
//     set(
//       produce((state: DocumentStore) => {
//         const block = state.blocks.find((v) => v.id === blockId) as IDocBlock;
//         block.data.content = content;
//       })
//     ),
//   syncBlock: async (blockId: string) => {
//     const data = get().blocks.find((v) => v.id === blockId) as IDocBlock;
//     const result = await client.block.mutateBlock.mutate({
//       id: blockId,
//       type: data.type,
//       index: data.index,
//       data: data.data,
//     });
//     console.log(result);
//   },
// }));
