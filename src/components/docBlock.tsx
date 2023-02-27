import { useDocumentStore } from "@/stores/document";
import { api } from "@/utils/api";
import { DocBlock, DocBlockType } from "@prisma/client";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { block } from "@/hooks/block";

import { useState } from "react";

function TextBlockRenderer({
  data,
  blockId,
}: {
  data: DocBlock["data"];
  blockId: string;
}) {
  const [value, setValue] = useState<string>(data.content as string);
  const { mutateAsync } = block.useModifyBlock();

  return (
    <div>
      <input
        placeholder="write something"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          void mutateAsync({
            id: blockId,
            data: {
              content: value,
            },
          });
        }}
        value={value}
      />
    </div>
  );
}

function DocBlock({ blockId }: { blockId: string }) {
  const { data, isLoading } = block.useData(
    { blockId },
    { enabled: !!blockId }
  );

  if (isLoading) {
    return <>loading...</>;
  } else {
    if (data?.type === "text") {
      return <TextBlockRenderer data={data.data} blockId={blockId} />;
    }
    return <>{JSON.stringify(data)} </>;
  }
  // const store = useDocumentStore(({ status, blocks }) => ({
  //   status,
  //   blocks,
  // }));
  // const block = store.blocks.filter((v) => v.id === blockId)?.[0] as IDocBlock;
  // if (store.status === "loading") {
  //   return <>loading</>;
  // }

  // if (block.type === "text") {
  //   return <TextBlockRenderer data={block.data} blockId={block.id} />;
  // }

  // return <div>{block.data.content}</div>;
  // } else if (block.type === "text")

  //   useEffect(() => {
  //     const node = document.getElementById(`block-${blockId}`)!;
  //     if (data?.[0] !== undefined) {
  //       console.log(data)
  //       node.textContent = data?.[0].data.content;
  //     }
  //     node
  //       .addEventListener("textInput", (e: any) => {
  //         const key = e?.data;
  //         const text = e.target?.textContent;
  //         console.log(key, text)
  //         if (key === "\n" && !!docId) {
  //           console.log("ENTER!!!")
  //       mutate.mutateAsync({type: "text", docId }).then(async () => {const result = await refetch()
  //       console.log(result)})
  //         }
  //       });
  //   }, []);
  //   const { mutateAsync } = api.block.mutateBlock.useMutation();
  //   const [value, setValue] = useState("");
  //   if (isLoading && data?.[0] !== undefined) {
  //     return <div>loading...</div>;
  //   } else {
  // const block = data?.[0] as Block;
  //   return (
  //     <>
  //       <div className="w-[100%] grid grid-cols-[auto,1fr]">
  //         {block.type === "text" && "* "}<span
  //         className="!w-auto"
  //           id={`block-${blockId}`}
  //           // onChange={(e) => e.target}
  //           contentEditable={true}
  //           onFocus={(e) => {
  //             if (block?.data?.content) {
  //               e.target.textContent = block.data.content;
  //             }
  //             if (e.target.textContent.length === 0) {
  //               e.placeholder = "testing"
  //             }
  //           }}
  //           onBlur={async (e) => {
  //             console.log("block", block);
  //             await mutateAsync({
  //               id: blockId,
  //               type: block?.type,
  //               data: {
  //                 content: e.target.textContent || undefined,
  //               },
  //             });
  //             const result = await refetch();
  //             console.log(result)
  //             e.target.textContent = result[0]!.data!.content;
  //           }}
  //         />
  //       </div>
  //     </>
  //   );
}
// }

export default DocBlock;
