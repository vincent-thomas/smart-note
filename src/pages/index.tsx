import { type NextPage } from "next";
import { api } from "@/utils/api";
import Link from "next/link";

const Home: NextPage = () => {
  const { mutateAsync } = api.doc.createDoc.useMutation();
  const { data, refetch } = api.doc.getDocs.useQuery();

  return (
    <>
      <button
        onClick={() => {
          mutateAsync({
            title: "testing",
          })
            .then(async () => {
              await refetch();
            })
            .catch(console.error);
        }}
      >
        button
      </button>
      <div>
        {data?.map((v, i) => (
          <Link href={`/d/${v.id}`} key={i}>
            {v?.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
