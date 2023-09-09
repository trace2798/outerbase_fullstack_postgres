import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="xl:my-32 md:my-20 md:mx-[5vw] lg:mx-[10vw] xl:mx-[15vw] flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-satoshiBlack">
            Summize: Discover, Share, and Review Books you love
            <br />
            <p className="text-3xl mt-5">
              Made Possible by{" "}
              <a
                href="https://outerbase.com/"
                target="_blank"
                className="text-2xl md:text-3xl hover:underline font-satoshiBlack bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-red-500 animate-text"
              >
                Outerbase
              </a>
            </p>
          </h1>
          <div className="md:hidden">
            <Image
              src="/images/meet-nobackground.png"
              alt="hero-image"
              width={500}
              height={500}
              className="rounded-xl"
              loading="lazy"
            />
          </div>
          <h2 className="text-3xl font-satoshiBold mt-10">
            Easily share and review books you love{" "}
          </h2>
          <h3 className="text-xl mt-5 font-ranadeRegular">
            This is my submission for Outerbase X Hashnode hackathon.{" "}
            <a
              href="https://shreyas-chaliha.hashnode.dev/"
              target="_blank"
              className="underline hover:cursor-pointer text-base hover:text-indigo-500"
            >
              Hashnode Article
            </a>
          </h3>

          <Link href={"/book"}>
            <Button variant={"default"} className="mt-4">
              Discover Books
            </Button>
          </Link>
        </div>
        <div className="collapse max-sm:w-0 max-sm:h-0 md:visible">
          <Image
            src="/images/meet-nobackground.png"
            alt="hero-image"
            width={500}
            height={500}
            className="rounded-xl fill-white"
          />
        </div>
      </div>
    </main>
  );
}
