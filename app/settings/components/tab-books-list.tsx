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
      <Card>
        <CardHeader className="">
          <CardTitle className="text-base">{name}</CardTitle>
          <CardDescription>
            By {author} {formatTimeToNow(createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img src={src} alt="book" />
          <p className="mt-5">{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default TabBookList;
