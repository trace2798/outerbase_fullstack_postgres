// import { FC } from "react";
// import { NewBookForm } from "./components/new-book-form";
// import { auth } from "@clerk/nextjs";

// interface pageProps {}

// const page: FC<pageProps> = ({}) => {
//   const { userId } = auth();
//   return (
//     <>
//       <div>
//         <NewBookForm />
//       </div>
//     </>
//   );
// };

// export default page;
import { FC } from "react";
import { NewBookForm } from "./components/new-book-form";
import { auth } from "@clerk/nextjs";
import LoginButton from "../[bookId]/components/login-button";

const Page: FC = () => {
  const { userId } = auth();
  return userId ? (
    <NewBookForm />
  ) : (
    <>
      <div className="w-full h-[80vh] flex flex-col justify-center items-center">
        <h1 className="mb-10 text-2xl font-bold">
          You need to be Logged in to add a book
        </h1>
        <LoginButton />
      </div>
    </>
  );
};

export default Page;
