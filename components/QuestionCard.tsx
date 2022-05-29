import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdOutlineOpenInNew, MdDone } from "react-icons/md";

export default function QuestionCard({
  title,
  url,
  level,
  remark,
  index,
  done,
  handleUpdateProgress
}: {
  title: string;
  url: string;
  level: string;
  remark: string;
  index: number;
  done:boolean;
  handleUpdateProgress: Function;
}) {
  
  return (
    <div
      className={`border-[0.1px] border-black dark:border-white hover:text-black dark:hover:border-transparent w-[90vw] md:w-[300px] h-[150px] flex flex-col justify-center items-center card transition-all duration-200 text-lg p-3 ${level} ${done && level+'-done'}`}
    >
      <div className="title text-center">{title}</div>
      <div className="title text-center text-xs">{remark}</div>
      <div className="action-btns mt-3 flex flex-row gap-5">
        <div className="done-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-200"  onClick={() => handleUpdateProgress(url, index)}>
          <MdDone/>
        </div>
        <div className="open-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-200">
          <a href={url} target="_blank" rel="noreferrer">
            <MdOutlineOpenInNew />
          </a>
        </div>
      </div>
    </div>
  );
}
