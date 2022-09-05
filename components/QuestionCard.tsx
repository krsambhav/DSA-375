import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { MdOutlineOpenInNew, MdDone, MdClose } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TbNotes, TbNotesOff } from "react-icons/tb";
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

  //Set Notes Data
  useEffect(() => {
    setNotesData(notes);
  }, []);

  return (
    <div
      className={`border-[0.1px] border-black dark:border-white dark:hover:border-transparent w-[90vw] md:w-[300px] h-[150px] flex flex-col justify-between items-center card duration-200 text-lg px-3 py-5 ${level} ${
        done && level + "-done text-black hover:dark:text-black"
      } select-none ${done === true ? "transition-all" : "transition-shadow"}`}
    >
      <div className="title text-center text-base">{title}</div>
      <div className="title text-center text-xs">{remark}</div>
      <div className="action-btns mt-3 flex flex-row gap-5">
        <a href={url} target="_blank" rel="noreferrer">
          <div className="open-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full hover:transition-all duration-150 dark:hover:bg-white dark:hover:text-black">
            <MdOutlineOpenInNew />
          </div>
        </a>
        <div
          className="done-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full hover:transition-all duration-150 dark:hover:bg-white dark:hover:text-black"
          onClick={() => handleUpdateProgress(url, index)}
        >
          {!done ? <MdDone /> : <MdClose />}
        </div>
        <div
          className="done-icon p-2 hover:bg-black hover:text-white cursor-pointer rounded-full hover:transition-all duration-150 dark:hover:bg-white dark:hover:text-black"
          onClick={() => handleNotesToggle()}
        >
          {notesData && notesData.trim().length > 0 ? (
            <TbNotes className="cursor-pointer" />
          ) : (
            <TbNotesOff className="cursor-pointer" />
          )}
        </div>
      </div>
      {showNotes && (
        <div
          className="notes-container fixed top-0 left-0 w-screen h-screen flex flex-col justify-start pt-32 items-center backdrop-blur-xl"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleNotesEdit(notesData, url, index);
              setShowNotes(false);
            }
          }}
          onClick={(e: any) => {
            if (e.target.nodeName === "DIV") {
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
          <div className="topic-title mb-3 font-thin dark:text-white">{title} [Difficulty: {level}]</div>
          <textarea
            autoFocus
            name=""
            id=""
            className="z-20 h-[65vh] w-[90vw] text-black border border-black outline-none p-2 font-mono text-base resize-none dark:text-white dark:border-white dark:border-[.1px] dark:bg-black"
            onChange={(e) => setNotesData(e.target.value)}
            value={notesData}
            placeholder="Type your notes here..."
            autoComplete="off"
            autoCapitalize="off"
          ></textarea>
        </div>
      )}
    </div>
  );
}
