import {api} from "@/utils/api"

export const block = {
  useData: api.block.getBlock.useQuery,
  useAddBlock: api.block.createBlock.useMutation,
  useModifyBlock: api.block.mutateBlock.useMutation
}