import { FC } from "react";
import { NewBookForm } from "./components/new-book-form";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div>
        <NewBookForm />
      </div>
    </>
  );
};

export default page;
