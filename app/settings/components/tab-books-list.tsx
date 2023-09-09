import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatTimeToNow } from "@/lib/utils";
import { FC } from "react";

interface TabBookListProps {
  name: string;
  src: string;
  description: string;
  author?: string;
  createdAt: Date;
  id: number;
}

const TabBookList: FC<TabBookListProps> = ({
  name,
  src,
  description,
  author,
  createdAt,
}) => {
  return (
    <>
      <Card className="w-full flex flex-col lg:flex-row ">
        <CardHeader className="">
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            By {author} {formatTimeToNow(createdAt)}
          </CardDescription>
          <div className="md:w-[350px]">
            <img src={src} alt="book" className="" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mt-3">{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default TabBookList;
