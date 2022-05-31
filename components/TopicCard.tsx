import Link from "next/link";
import { useEffect, useState } from "react";

export default function Card({ topic, title, qty, index }: { topic:string, title: string; qty?: any; index:number }) {
  const [doneCount, setDoneCount] = useState(0)
  useEffect(() => {
    if(localStorage.getItem('progressData') === null) return;
    const progressData = JSON.parse(localStorage.getItem('progressData') || "{}")
    const topicData = progressData[index]
    const topicProblems = topicData['problems'];
    let doneCnt = 0;
    topicProblems.map((problem:any) => {
      if(problem.done === true) doneCnt++;
    })
    setDoneCount(doneCnt)
  }, [])
  
  return (
    <Link href={'/quest/'+topic.toLowerCase()}>
      <a>
      <div className="border-[0.1px] border-black w-[240px] h-[150px] flex flex-col justify-center items-center text-2xl cursor-pointer card transition-all duration-200 hover:border-[1px] dark:border-white dark:hover:border-orange-200 topic-card hover:shadow-lg">
        <div className="title text-xl">{title}</div>
        <div className="qty text-base mt-5 font-light">{`${doneCount} / ${qty} Problems Solved`}</div>
      </div>
      </a>
    </Link>
  );
}
