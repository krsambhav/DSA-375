import Link from "next/link";

export default function QuestionCard({ title, url, level, remark }: { title: string; url: string, level:string, remark:string }) {
  return (
    <a href={url} target='_blank' rel='noreferrer'>
      <div className={`border-[0.1px] border-black dark:border-white dark:hover:text-black dark:hover:border-transparent w-[90vw] md:w-[300px] h-[150px] flex flex-col justify-center items-center cursor-pointer card transition-all duration-200 text-lg p-3 ${level}`}>
        <div className="title text-center">{title}</div>
        <div className="title text-center text-xs">{remark}</div>
      </div>
      </a>
  );
}
