import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdOutlineOpenInNew, MdDone, MdClose } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function QuestionCard({
  title,
  url,
  level,
  remark,
  index,
  done,
  notes,
  handleUpdateProgress,
  handleNotesEdit,
}: {
  title: string;
  url: string;
  level: string;
  remark: string;
  index: number;
  done: boolean;
  notes: string;
  handleUpdateProgress: Function;
  handleNotesEdit: Function;
}) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [notesData, setNotesData] = useState<string>("");
  const handleNotesToggle = () => {
    setShowNotes(!showNotes);
  };

  useEffect(() => {
    setNotesData(notes);
  }, []);

  return (
    <div
      className={`border-[0.1px] border-black dark:border-white hover:text-black dark:hover:border-transparent w-[90vw] md:w-[300px] h-[150px] flex flex-col justify-center items-center card transition-all duration-200 text-lg p-3 ${level} ${
        done && level + "-done text-black"
      } select-none`}
    >
      <div className="title text-center">{title}</div>
      <div className="title text-center text-xs">{remark}</div>
      <div className="action-btns mt-3 flex flex-row gap-5">
        <div className="open-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-200 dark:transition-none">
          <a href={url} target="_blank" rel="noreferrer">
            <MdOutlineOpenInNew />
          </a>
        </div>
        <div
          className="done-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-200 dark:transition-none"
          onClick={() => handleUpdateProgress(url, index)}
        >
          {!done ? <MdDone /> : <MdClose />}
        </div>
        <div
          className="done-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full transition-all duration-200 dark:transition-none"
          onClick={() => handleNotesToggle()}
        >
          <CgNotes className="cursor-pointer" />
        </div>
      </div>
      {showNotes && (
        <div
          className="notes-container fixed top-0 left-0 w-screen h-screen flex flex-col justify-start pt-10 items-center backdrop-blur-xl"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleNotesEdit(notesData, url, index);
              setShowNotes(false);
            }
          }}
        >
          <IoCloseCircleSharp
            className="text-black mb-5 text-3xl cursor-pointer dark:text-white"
            onClick={() => {
              handleNotesEdit(notesData, url, index);
              setShowNotes(false);
            }}
          />
          <textarea
            name=""
            id=""
            className="z-20 h-[70vh] w-[90vw] text-black border border-black outline-none p-2 font-mono text-base resize-none dark:text-white dark:border-white dark:border-[.1px]"
            onChange={(e) => setNotesData(e.target.value)}
            value={notesData}
          ></textarea>
        </div>
      )}
    </div>
  );
}
