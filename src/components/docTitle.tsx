import { doc } from "@/hooks/document";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import type { Doc } from "@prisma/client";
import { useState } from "react";
import { docState  } from "@/stores/document";

import { useHookstate } from "@hookstate/core";

const DocTitle = () => {
  const state = useHookstate(docState);

  return (
    <>
      <input type="text" onClick={(e) => state.set(e.target.value)} value={state.get("title")} />

      {JSON.stringify(state)}
    </>
  );

  // const [title, setTitle] = useState<string>("");
  // const docId = useRouter().query?.docId as string;
  // const { mutateAsync } = doc.useMutateTitle();
  // const { data, isLoading, refetch } = doc.useData(
  //   { docId },
  //   {
  //     enabled: !!docId,
  //     onSuccess(data) {
  //       setTitle(data?.title as string);
  //     },
  //   }
  // );

  // const title = useDocumentStore((store) => store.title);
  // const setTitle = useDocumentStore((store) => store.setTitle);
  // const document = useDocumentStore(
  //   ({ setTitle, setupDoc, addBlock, ...props }) => ({ ...props })
  // );
  // const {
  //   data: doc,
  //   isLoading,
  //   refetch,
  // } = useDocument(docId, {
  //   onSuccess(data: Doc | undefined) {
  //     if (data !== undefined) setValue(data.title);
  //   },
  // })

  // const { mutateAsync: mutateTitle } = api.doc.changeTitle.useMutation();
  // if (doc === undefined) return <p>document not found</p>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={(e) =>
          void mutateAsync({ docId, title: e.target.value }).then(() => refetch)
        }
      />
    </>
  );
  // else {
  //   console.log("title", title);
  //   return (
  //     <>
  //       <input
  //         value={title}
  //         onChange={(e) => {
  //           setTitle(e.target.value);
  //         }}
  // onBlur={(e) => {
  // console.log("testing");
  // // const title = e.target.value;
  // if (value?.length > 0 && !!docId && value !== doc.title) {
  //   mutateTitle({ title: value, docId })
  //     .then(async () => {
  //       const result = await refetch();
  //       console.log(result);
  //     })
  //     .catch(console.error);
  // }
  // } else {
  //   e.target.defaultValue = doc.title;
  // }
  // }}
  //     />
  //   </>
  // );
  // }
};

export default DocTitle;
