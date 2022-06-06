import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import ThemeChanger from "./ThemeChanger";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer({
  doneQuestions,
  totalQuestions,
  doneQuestionsAcrossTopics,
  title
}: {
  doneQuestions?: number;
  totalQuestions?: number;
  doneQuestionsAcrossTopics?: number;
  title?: string;
}) {
  return (
    <footer className="mt-10 md:mt-0 w-screen flex flow-row items-center justify-center md:h-[60px] gap-10 md:fixed md:bottom-0 transition-all duration-300 bg-white dark:bg-slate-900 pb-10 md:pb-0">
      {doneQuestionsAcrossTopics ? (
        <div className="done-count-container text-black dark:text-white select-none self-end hidden md:fixed left-10 bottom-4 md:flex flex-row items-center gap-3">
          {" "}
          <div className="progress-circle w-[20px]">
            <CircularProgressbar
              value={(doneQuestionsAcrossTopics / 375) * 100}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "red",
              })}
            />
          </div>{" "}
          {doneQuestionsAcrossTopics} / 375 Solved Overall
        </div>
      ) : ""}
      <div className="middle-items-container flex flow-row items-center justify-center gap-10">
        <a
          href="https://github.com/krsambhav/DSA-375/"
          target={"_blank"}
          rel="noreferrer"
        >
          <VscGithubAlt className="text-xl" />
        </a>
        <ThemeChanger />
        <a
          href="https://docs.google.com/spreadsheets/d/1hXserPuxVoWMG9Hs7y8wVdRCJTcj3xMBAEYUOXQ5Xag/htmlview?pru=AAABgROubJY*B_0WxnW4sJ84JG81Ih-eng#"
          target={"_blank"}
          rel="noreferrer"
        >
          <BsFileEarmarkSpreadsheet className="text-lg" />
        </a>
      </div>

      {doneQuestions && totalQuestions ? (
        <div className="done-count-container text-black dark:text-white select-none self-end hidden md:fixed right-10 bottom-4 md:flex flex-row items-center gap-3">
          {" "}
          <div className="progress-circle w-[20px]">
            <CircularProgressbar
              value={(doneQuestions / totalQuestions) * 100}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "red",
              })}
            />
          </div>{" "}
          {doneQuestions} / {totalQuestions} Solved In {title}
        </div>
      ) : ""}
    </footer>
  );
}
