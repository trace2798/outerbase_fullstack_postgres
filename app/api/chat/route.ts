import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const { userId } = auth();
  console.log("1 FIrst ONe");
  const bookByUserId = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getBooksByUserId?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const books = await bookByUserId.json();
  console.log(books, "INSIDE API");
  const bookDetails = books.response.items
    .map((book: any, index: any) => {
      // Replace this with actual properties of the book object
      return `Book ${index + 1}: ${book.name}, ${book.author}, ${
        book.createdAt
      }, Database id for book:${book.id}`;
    })
    .join(", ");
  console.log(bookDetails, "BOOK DETAIL");

  const summariesByUserId = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getSummariesByUserId?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(summariesByUserId, "OUTERBASE COMMAND Summary");
  console.log(books, "BOOKS");
  const summaries = await summariesByUserId.json();
  const summaryDetails = summaries.response.items
    .map((summary: any, index: any) => {
      return `Book ${index + 1}: ${summary.content}, ${summary.book_id}, ${
        summary.createdAt
      }`;
    })
    .join(", ");
  console.log(summaryDetails, "SUMMARY DETAIL");
  // const allBooks = await fetch(
  //   `https://middle-indigo.cmd.outerbase.io/getAllBooks`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }
  // );

  // const allbooks = await allBooks.json();
  // console.log(books, "INSIDE API");
  // const allbookDetails = allbooks.response.items
  //   .map((book: any, index: any) => {
  //     // Replace this with actual properties of the book object
  //     return `Book ${index + 1}: ${book.name}, ${book.author}, ${
  //       book.createdAt
  //     }, ${book.id}`;
  //   })
  //   .join(", ");
  // console.log(allbookDetails, "ALL BOOK DETAIL");
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (!configuration.apiKey) {
    //   return new NextResponse("OpenAI API Key not configured.", {
    //     status: 500,
    //   });
    // }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Use the data from the endpoint in the messages
    messages.push({
      role: "system",
      // content: `As a data analyst, your task is to answer questions based on the books add by the user: ${bookDetails} and summaries: ${summaryDetails} submitted by the user. If the user asks about summaries, try to provide the corresponding book title from their submission. For reference, here is the list of all the books in the database: ${allbookDetails}.`,
      content: `As a data analyst, your task is to answer questions based on the books add by the user: ${bookDetails} and summaries: ${summaryDetails} submitted by the user. If the user asks about summaries, try to provide the corresponding book title from their submission. `,
    });
    console.log(messages, "MESSAGES");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });
    const stream = OpenAIStream(response);
    // return NextResponse.json(response.data.choices[0].message);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
