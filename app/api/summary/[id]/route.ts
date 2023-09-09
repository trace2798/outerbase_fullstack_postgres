import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismadb.summary.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[SUMMARY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
