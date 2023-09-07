import { FC } from "react";
import SummaryCard from "./summary-card";

interface TabSummaryListProps {
  title: string;
  content: string;
  createdAt: Date;
  id: number;
  book_id: number;
}

const TabSummaryList: FC<TabSummaryListProps> = async ({
  title,
  content,
  createdAt,
  id,
  book_id,
}) => {
  const books = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getBookById?id=${book_id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await books.json();
  console.log(data.response, "DATA");
  return (
    <>
      <SummaryCard
        data={data}
        createdAt={createdAt}
        title={title}
        content={content}
        id={id}
      />
    </>
  );
};

export default TabSummaryList;
