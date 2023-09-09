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
  // const summaries = await prismadb.summary.findUnique({
  //   where: {
  //     id: idInInt,
  //   },
  // });
  const summariesById = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getSummaryById?id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(summariesById, "OUTERBASE COMMAND Summary");

  const summar = await summariesById.json();
  console.log(summar, "SUMMAR");
  if (summar.response.items.length === 1) {
    return (
      <>
        <h1>
          Oops. Looks like it is empty. Write a summary or review to get started
        </h1>
      </>
    );
  }
  // console.log(summaries);
  return (
    <>
      <div className="mx-[10vw] flex justify-center h-screen items-center">
        <div className="w-full">
          {summar.response.items.map((summaries: any, index: any) => (
            <div key={index}>
              <SummaryFormEdit
                id={idInInt}
                title={summaries.title}
                content={summaries?.content}
                user_id={summaries.user_id}
                user_name={summaries.user_name}
                book_id={summaries.book_id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
