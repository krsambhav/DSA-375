import Link from "next/link";

export default function Card({ topic, title, qty }: { topic:string, title: string; qty?: any }) {
  return (
    <Link href={'/quest/'+topic.toLowerCase()}>
      <a>
      <div className="border-[0.1px] border-black w-[240px] h-[150px] flex flex-col justify-center items-center text-2xl cursor-pointer card transition-all duration-200 dark:border-white dark:hover:border-transparent normalcard">
        <div className="title text-xl">{title}</div>
        <div className="qty text-base mt-5">{qty + " Questions"}</div>
      </div>
      </a>
    </Link>
  );
}
