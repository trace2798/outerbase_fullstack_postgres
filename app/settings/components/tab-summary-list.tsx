import { FC } from "react";
import SummaryCard from "./summary-card";

interface TabSummaryListProps {
  title: string;
  content: string;
  createdAt: Date;
  id: number;
  book_id: number;
  rating: number;
}

const TabSummaryList: FC<TabSummaryListProps> = async ({
  title,
  content,
  createdAt,
  id,
  book_id,
  rating,
}) => {
  const books = await fetch(
    `${process.env.OUTERBASE_SECRET}/getBookById?id=${book_id}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await books.json();
  //console.log(data.response, "DATA");
  return (
    <>
      <SummaryCard
        data={data}
        createdAt={createdAt}
        title={title}
        content={content}
        id={id}
        rating={rating}
      />
    </>
  );
};

export default TabSummaryList;
