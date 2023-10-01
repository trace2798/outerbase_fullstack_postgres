import { SummaryFormEdit } from "./components/SummaryFormEdit";

interface pageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: pageProps) => {
  const idInInt = Number(params.id);
  //console.log(idInInt);

  const summariesById = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getSummaryById?id=${idInInt}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  //console.log(summariesById, "OUTERBASE COMMAND Summary");

  const summar = await summariesById.json();
  //console.log(summar, "SUMMAR");

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
