import { FC } from "react";
import { SummaryFormEdit } from "./components/SummaryFormEdit";
import prismadb from "@/lib/prismadb";

interface pageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: pageProps) => {
  const idInInt = Number(params.id);
  console.log(idInInt);
  const summaries = await prismadb.summary.findUnique({
    where: {
      id: idInInt,
    },
  });
  if (summaries === null) {
    return (
      <>
        <h1>404</h1>
      </>
    );
  }
  console.log(summaries);
  return (
    <>
      <SummaryFormEdit
        id={idInInt}
        title={summaries.title}
        content={summaries?.content}
        user_id={summaries.user_id}
        user_name={summaries.user_name}
        book_id={summaries.book_id}
      />{" "}
    </>
  );
};

export default page;
