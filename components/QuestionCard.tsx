import Link from "next/link";

export default function QuestionCard({ title, url, level }: { title: string; url: string, level:string }) {
  return (
    <a href={url} target='_blank'>
      <div className={`border-[0.1px] border-black w-[90vw] md:w-[300px] h-[150px] flex flex-col justify-center items-center cursor-pointer card transition-all duration-200 text-lg p-3 ${level}`}>
        <div className="title text-center">{title}</div>
      </div>
      </a>
  );
}
