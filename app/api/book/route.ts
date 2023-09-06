import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
// import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // const user = await currentUser();
    const { src, name, description, userId, userName } = body;

    // if (!user || !user.id || !user.firstName) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!src || !name || !description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const book = await prismadb.book.create({
      data: {
        userId: userId,
        userName: userName,
        src,
        name,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log("[BOOK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
