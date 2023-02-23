import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DocumentsState {
  activeDocId?: string;
  mutateActiveDocId: (docId: string) => void;
}

export const useDocuments = create<DocumentsState>()(
  devtools((set) => ({
    activeDocId: undefined,
    mutateActiveDocId: (docId: string) => set(() => ({ activeDocId: docId })),
  }))
);
