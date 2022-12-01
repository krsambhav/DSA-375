import Link from "next/link";
import { useEffect, useState } from "react";

export default function Card({ topic, title, qty, index }: { topic:string, title: string; qty?: any; index:number }) {
  const [doneCount, setDoneCount] = useState(0)

  //Set Total Solved Problems In Specific Topic
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
      <div className={`border-[1px] border-black w-[240px] h-[150px] flex flex-col justify-center items-center text-2xl cursor-pointer card transition-shadow hover:border-[1px] dark:border-[#ffdeb4] dark:hover:border-orange-200 topic-card hover:shadow-lg ${doneCount == qty && 'bg-black text-white dark:bg-orange-200 dark:text-black'}`}>
        <div className="title text-xl">{title}</div>
        <div className="qty text-base mt-5 font-light">{`${doneCount} / ${qty} Problems Solved`}</div>
        {doneCount > 0 ? <div className="qty text-base mt-5 font-light">{`${qty == doneCount ? 'Killed It' : qty - doneCount + ' Remaining'}`}</div> : <div className="qty text-base mt-5 font-light">{`Not Started Yet`}</div>} 
      </div>
      </a>
    </Link>
  );
}
