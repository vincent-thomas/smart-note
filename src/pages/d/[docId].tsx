import DocTitle from "@/components/docTitle";
import { useDocuments } from "@/stores/document";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useEffect } from "react";

const Page: NextPage = () => {
  const docId = useRouter().query?.docId as string;
  const changeDocId = useDocuments((store) => store.mutateActiveDocId);
  const mutate = api.block.createBlock.useMutation();
  const { data: docBlocks, refetch: refetchDocBlocks } =
    api.block.getBlocks.useQuery(
      {
        docId,
      },
      { enabled: !!docId }
    );

  useEffect(() => {
    changeDocId(docId);
    console.log("testing");
  }, [docId, changeDocId]);

  return (
    <>
      <DocTitle />
      <button
        onClick={() => {
          mutate
            .mutateAsync({ type: "text", docId })
            .then(() => refetchDocBlocks())
            .catch(console.error);
        }}
      >
        create block
      </button>

      <div>
        <div>
          {docBlocks?.map((v) => (
            <pr>{JSON.stringify(v)}</pr>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
