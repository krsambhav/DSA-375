import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import questionData from "../../public/data.json";
import { IoIosArrowRoundBack, IoLogoGithub } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import ThemeChanger from "../../components/ThemeChanger";
import { SiGooglesheets } from "react-icons/si";

export default function Questions() {
  const [questions, setQuestions] = useState<any>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [readyToShow, setReadyToShow] = useState<boolean>(false);
  const [randomURL, setRandomURL] = useState<string>("");
  const router = useRouter();
  const topic: any = router.query["topic"] || "Questions";
  const topicIndex: any = {
    arrays: 0,
    strings: 1,
    "2darrays": 2,
    searchingandsorting: 3,
    binarytrees: 4,
    backtracking: 5,
    linkedlist: 6,
    stacksandqueues: 7,
    greedy: 8,
    binarysearchtrees: 9,
    heapsandhashing: 10,
    graphs: 11,
    tries: 12,
    dp: 13,
    bitmanipulation: 14,
    segmenttrees: 15,
  };
  // console.log(topic);
  useEffect(() => {
    // setQuestions(questionData);
    if (!router.isReady) return;
    // setQuestions(questionData.filter((set) => set.topic === topic)[0]);
    // setTitle(questionData.filter((set) => set.topic === topic)[0]["title"]);
    if (localStorage.getItem("progressData") == null) {
      localStorage.setItem("progressData", JSON.stringify(questionData));
      setQuestions(questionData.filter((set: any) => set.topic === topic)[0]);
      setTitle(
        questionData.filter((set: any) => set.topic === topic)[0]["title"]
      );
    } else {
      const localQuestionData = JSON.parse(
        localStorage.getItem("progressData") || ""
      );
      setQuestions(
        localQuestionData.filter((set: any) => set.topic === topic)[0]
      );
      setTitle(
        localQuestionData.filter((set: any) => set.topic === topic)[0]["title"]
      );
    }
    // console.log(localQuestionData);

    setReadyToShow(true);
  }, [topic, router.isReady]);

  useEffect(() => {
    if (!questions) return;
    const randomNum = Math.floor(Math.random() * questions.problems.length);
    setRandomURL(questions.problems[randomNum].url);
  }, [questions]);

  const setRandom = () => {
    const randomNum = Math.floor(Math.random() * questions.problems.length);
    setRandomURL(questions.problems[randomNum].url);
  };

  const handleUpdateProgress = (url: string, questionIndex: number) => {
    // const topicIndex = questionData.indexOf(questions);
    let previousData = localStorage.getItem('progressData') !== null ? JSON.parse(localStorage.getItem('progressData') || "") : questionData;
    console.log(previousData);
    // console.log(previousData[topicIndex[topic]]);
    let tempData = previousData[topicIndex[topic]]["problems"][questionIndex];
    tempData = { ...tempData, done: !tempData.done };
    previousData[topicIndex[topic]]["problems"][questionIndex] = tempData;
    // console.log(previousData);
    localStorage.setItem("progressData", JSON.stringify(previousData));
    setQuestions(previousData[topicIndex[topic]]);
  };

  useEffect(() => {}, [questions]);

  return (
    <div className="dark:bg-slate-900">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-screen p-10 flex flex-col items-center min-h-screen md:pb-24">
        <div className="title-container text-3xl flex flex-row items-center justify-between md:justify-center w-[95vw]">
          <div className="icon md:fixed md:left-10 rounded-full border border-transparent hover:bg-black hover:text-white transition-all duration-300 ">
            <Link href={"/"}>
              <a>
                <IoIosArrowRoundBack />
              </a>
            </Link>
          </div>{" "}
          <div className="title">{readyToShow && title}</div>{" "}
          <a
            href={randomURL}
            target="_blank"
            rel="noreferrer"
            onClick={setRandom}
          >
            <div className="icon md:fixed md:right-10 rounded-full border border-transparent dark:text-white transition-all duration-300 text-lg hover:bg-black p-2 hover:text-white">
              <FaRandom />
            </div>
          </a>
        </div>
        <div className="time-container mt-12 mb-6 flex flex-row flex-wrap gap-5">
          <div className="time-box w-[80px] h-[30px] easy border-[.1px] border-black dark:border-white dark:hover:border-transparent dark:hover:text-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">
            5-10 mins
          </div>
          <div className="time-box w-[80px] h-[30px] medium border-[.1px] border-black dark:border-white dark:hover:border-transparent dark:hover:text-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">
            15-20 mins
          </div>
          <div className="time-box w-[80px] h-[30px] hard border-[.1px] border-black dark:border-white dark:hover:border-transparent dark:hover:text-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">
            45-60 mins
          </div>
        </div>
        <div className="questions-container flex flex-row flex-wrap items-center justify-center gap-10 mt-5 md:mx-16">
          {readyToShow &&
            questions["problems"].map((question: any, index: any) => {
              return (
                <QuestionCard
                  key={index}
                  index={index}
                  title={question.title}
                  url={question.url}
                  level={question.level}
                  remark={question.remark}
                  done={question.done}
                  handleUpdateProgress={handleUpdateProgress}
                />
              );
            })}
        </div>
      </main>
      <footer className="w-screen flex flow-row items-center justify-center md:h-[60px] gap-10 md:fixed md:bottom-0 bg-white dark:bg-slate-900 pb-10 md:pb-0">
        <ThemeChanger />
        <a
          href="https://github.com/krsambhav/DSA-375/"
          target={"_blank"}
          rel="noreferrer"
        >
          <IoLogoGithub className="text-2xl" />
        </a>
        <a href="https://docs.google.com/spreadsheets/d/1hXserPuxVoWMG9Hs7y8wVdRCJTcj3xMBAEYUOXQ5Xag/htmlview?pru=AAABgROubJY*B_0WxnW4sJ84JG81Ih-eng#" target={'_blank'} rel="noreferrer">
          <SiGooglesheets className="text-lg" />
          </a>
      </footer>
    </div>
  );
}
