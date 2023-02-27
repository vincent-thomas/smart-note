import { string } from "zod";
import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";
import { client } from "@/utils/api";
import produce from "immer";

interface Data {
  content?: string;
}

interface DocBlockStore {
  status?: "loading" | "done" | "error";
  docId?: string;
  data: Data;
  id?: string;
  setupBlock: (docId: string) => Promise<void>;
}

// export const useDocBlockStore = create<DocBlockStore>()((set) => ({
//   status: undefined,
//   id: undefined,
//   docId: undefined,
//   data: {},
//   setupBlock: async (docId: string) => {
//     const result = await client.block.getBlocks.query({ docId });

//     console.log(result);

//     set((store) => store);
//   },
//   modifyContent: (content: string) =>
//     set(
//       produce((state: DocBlockStore) => {
//         state.data.content = content;
//       })
//     ),
// }));
