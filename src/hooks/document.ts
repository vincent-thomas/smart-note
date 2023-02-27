import { api } from "@/utils/api";

export const doc = {
  useData: api.doc.getDoc.useQuery,
  useMutateTitle: api.doc.changeTitle.useMutation,
};