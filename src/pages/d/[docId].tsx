import DocTitle from "@/components/docTitle";
import type { NextPage } from "next";
import { Fragment } from "react";
import DocBlock from "@/components/docBlock";
import { doc } from "@/hooks/document";

interface PageProps {
  docId: string;
}

export const getServerSideProps = (context: { query: { docId: string } }) => {
  return {
    props: {
      docId: context.query.docId,
    },
  };
};

const Page: NextPage<PageProps> = ({ docId }) => {
  return <></>;
  // {
  /* // const document = useDocumentStore( */
  // }
  // {
  /* //   ({ setTitle, addBlock, setupDoc, ...props }) => ({ */
  // }
  //     ...props,
  //   })
  // );
  // const { addBlock, setupDoc } = useDocumentStore(({ addBlock, setupDoc }) => ({
  //   addBlock,
  //   setupDoc,~
  // }));

  // useEffect(() => {
  //   void setupDoc(docId);
  // }, [docId, setupDoc]);
  // if (isLoading || data === null || data === undefined) {
  //   return <>loading....</>;
  // } else {
  //   return (
  //     <>
  //       <DocTitle />

  //       <div>
  //         {data.blocks?.map((block, index) => (
  //           <Fragment key={index}>
  //             <DocBlock blockId={block.id} />
  //           </Fragment>
  //         ))}
  //       </div>
  {
    /* <div>{JSON.stringify(data)}</div> */
  }
  {
    /* {document.status === "done" && (
        <button onClick={() => void addBlock()}>create block</button>
      )} */
  }

  {
    /* <div>
        <button onClick={() => mutate.mutate({ type: "text", docId })}>
          Create block
        </button>
      </div> */
  }
  {
    /* <button
        onClick={() => {
          mutate
            .mutateAsync({ type: "text", docId })
            .then(() => refetchDocBlocks())
            .catch(console.error);
        }}
      >
        create block
      </button> */
  }

  {
    /* <div>
        <div>
          {docBlocks?.map((v, i: number) => (
            <div key={i}>
              <DocBlock block={v} />
            </div>
          ))}
        </div>
      </div> */
  }
  // </>
  // );
  // }
};

export default Page;
