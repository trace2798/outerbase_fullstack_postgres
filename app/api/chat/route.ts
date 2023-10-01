import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
// });

// export async function POST(req: Request) {
//   const { userId } = auth();
//   //console.log("1 FIrst ONe");
// const bookByUserId = await fetch(
//   `https://middle-indigo.cmd.outerbase.io/getBooksByUserId?user_id=${userId}`,
//   {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//     },
//   }
// );

//   const books = await bookByUserId.json();
//   //console.log(books, "INSIDE API");
//   const bookDetails = books.response.items
//     .map((book: any, index: any) => {
//       return `Book ${index + 1}: ${book.name}, ${book.author}, ${
//         book.createdAt
//       }, Database id for book:${book.id}`;
//     })
//     .join(", ");
//   //console.log(bookDetails, "BOOK DETAIL");

//   const reviewsByUserId = await fetch(
//     `https://middle-indigo.cmd.outerbase.io/getSummariesByUserId?user_id=${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   //console.log(reviewsByUserId, "OUTERBASE COMMAND Review");
//   const reviews = await reviewsByUserId.json();
//   const reviewDetails = reviews.response.items
//     .map((review: any, index: any) => {
//       return `Review ${review.id}: ${review.title}, ${review.content}, Book database id for  on which the review is: ${review.book_id}, ${review.createdAt}`;
//     })
//     .join(", ");
//   //console.log(reviewDetails, "review DETAIL");

// const allBooks = await fetch(
//   `https://middle-indigo.cmd.outerbase.io/getAllBooks`,
//   {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//     },
//   }
// );

//   const allbooks = await allBooks.json();
//   //console.log(books, "INSIDE API");
//   const allbookDetails = allbooks.response.items
//     .map((book: any, index: any) => {
//       return `Book List from Database${book.id}:${book.name}, Book Database ID:${book.id}`;
//     })
//     .join(", ");
//   //console.log(allbookDetails, "ALL BOOK DETAIL");
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     messages.push({
//       role: "system",
//       content: `As a data analyst named Fionaa, your task is to answer questions based on the books add by the user: ${bookDetails} and reviews: ${reviewDetails} submitted by the user. If the user asks about summaries, try to provide the corresponding book title from their submission.  Try to connect the review book_id with the id from: ${allbookDetails},`,
//     });
//     //console.log(messages, "MESSAGES");
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//       stream: true,
//     });
//     const stream = OpenAIStream(response);
//     // return NextResponse.json(response.data.choices[0].message);
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     //console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

/////////////////Working issue with content length
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
// });

// export async function POST(req: Request) {
//   const { userId } = auth();

//   // Fetch all books and reviews by user ID as before
//   const bookByUserId = await fetch(
//     `https://middle-indigo.cmd.outerbase.io/getBooksByUserId?user_id=${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   const books = await bookByUserId.json();

//   const reviewsByUserId = await fetch(
//     `https://middle-indigo.cmd.outerbase.io/getSummariesByUserId?user_id=${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   //console.log(reviewsByUserId, "OUTERBASE COMMAND Review");
//   const reviews = await reviewsByUserId.json();

//   // Fetch all books

//   const allBooks = await fetch(
//     `https://middle-indigo.cmd.outerbase.io/getAllBooks`,
//     {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   const allbooks = await allBooks.json();

//   // Create a new array to hold reviews with their associated books
//   let reviewsWithBooks = [];

//   // Loop through each review
//   for (let review of reviews.response.items) {
//     // Find the book for this review from the complete list of books
//     let bookForThisReview = allbooks.response.items.find(
//       (book: any) => book.id === review.book_id
//     );

//     // Add review and its associated book to the array
//     reviewsWithBooks.push({
//       review: `Review ${review.id}: ${review.title}, ${review.content}, book database id: ${review.book_id}, ${review.createdAt}`,
//       book: `${bookForThisReview.name} written by ${bookForThisReview.author}`,
//     });
//   }

//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     // // Add each review with its associated book to the messages
//     // for (let item of reviewsWithBooks) {
//     //   messages.push({
//     //     role: "system",
//     //     content: `As a data analyst named Fionaa, your task is to answer questions based on the following data: ${item.review} and its associated book: ${item.book}. TRY TO BE AS PRECISE as possible and friendly.`,
//     //   });
//     // }
//     // for (let book of books.response.items) {
//     //   messages.push({
//     //     role: "system",
//     //     content: `You have added the following book: Book: ${book.name}, ${book.author}, ${book.createdAt}, Database id for book:${book.id}`,
//     //   });
//     // }
//     ///////////working
//     // let bookList = "";

//     // // Construct a list of all books added
//     // for (let book of books.response.items) {
//     //   bookList += `${book.name}, ${book.author}, ${book.createdAt}, Database id for book:${book.id}\n`;
//     // }

//     // for (let item of reviewsWithBooks) {
//     //   // Push review and its associated book, and the list of all books added
//     //   messages.push({
//     //     role: "system",
//     //     content: `As a data analyst named Fionaa, your task is to answer questions based on the data added by the user. Reviews added by the user,${item.review} and its associated book: ${item.book}. Books added by the user, Books:\n${bookList}. User can review on books added by other's too.`,
//     //   });
//     // }
//     ///////
//     let bookList = "";

//     // Construct a list of all books added
//     for (let book of books.response.items) {
//       bookList += `${book.name}, ${book.author}, ${book.createdAt}, Database id for book:${book.id} `;
//     }

//     for (let item of reviewsWithBooks) {
//       // Push review and its associated book, and the list of all books added
//       messages.push({
//         role: "system",
//         content: `As a data analyst named Fionaa, your task is to answer questions based on the data (books and reviews) added by the user. Reviews added by the user,${item.review} on ${item.book}. Books added by the user, Books: ${bookList}.`,
//       });
//     }
//     //console.log(messages, "MESSAGES");
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//       stream: true,
//     });

//     const stream = OpenAIStream(response);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     //console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
// //////////////
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const { userId } = auth();

  // Fetch all books and reviews by user ID as before
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

  const reviewsByUserId = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getSummariesByUserId?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  //console.log(reviewsByUserId, "OUTERBASE COMMAND Review");
  const reviews = await reviewsByUserId.json();

  // Fetch all books
  const allBooks = await fetch(
    `https://middle-indigo.cmd.outerbase.io/getAllBooks`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const allbooks = await allBooks.json();

  // Create a new array to hold reviews with their associated books
  let reviewsWithBooks = [];

  // Loop through each review
  for (let review of reviews.response.items) {
    // Find the book for this review from the complete list of books
    let bookForThisReview = allbooks.response.items.find(
      (book: any) => book.id === review.book_id
    );

    // Add review and its associated book to the array
    reviewsWithBooks.push({
      review: `Review ${review.id}: ${review.title} at ${review.createdAt}`,
      book: `${bookForThisReview.name} written by ${bookForThisReview.author}`,
    });
  }

  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    let bookList = "";

    // Construct a list of all books added
    for (let book of books.response.items) {
      bookList += `${book.name}, ${book.author}, ${book.createdAt}, Database id for book:${book.id} `;
    }

    // Push the list of all books added as a separate system message
    messages.push({
      role: "system",
      content: `As a data analyst named Fionaa, your task is to answer questions based on the data (books) added by the user. Books added by the user: ${bookList}.`,
    });

    for (let item of reviewsWithBooks) {
      // Push review and its associated book
      messages.push({
        role: "system",
        content: `${item.review} on ${item.book}.`,
      });
    }

    //console.log(messages, "MESSAGES");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    //console.log("[CONVERSATION_ERROR]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
