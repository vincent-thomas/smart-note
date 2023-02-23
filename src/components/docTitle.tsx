import { useDocuments } from "@/stores/document";
import { api } from "@/utils/api";

const DocTitle = () => {
  const docId = useDocuments((store) => store.activeDocId);
  const {
    data,
    isLoading,
    refetch: refetchDoc,
  } = api.doc.getDocs.useQuery({ docId }, { enabled: !!docId });
  const { mutateAsync: mutateTitle } = api.doc.changeTitle.useMutation();

  if (isLoading || docId === undefined) return <div>loading...</div>;

  const document = data?.[0];

  if (document === undefined) {
    return <p>document not found</p>;
  }

  return (
    <>
      <input
        defaultValue={document.title}
        onBlur={(e) => {
          const title = e.target.value;
          if (title.length > 0) {
            mutateTitle({ title, docId })
              .then(() => refetchDoc())
              .catch(console.error);
          } else {
            e.target.value = document.title;
          }
        }}
      />
    </>
  );
};

export default DocTitle;
