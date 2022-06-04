import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import questionData from "../../public/data.json";
import { IoIosArrowRoundBack, IoLogoGithub } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import ThemeChanger from "../../components/ThemeChanger";
import { BsArrowUpCircleFill, BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { GiPartyPopper } from "react-icons/gi";
import Footer from "../../components/Footer";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Questions() {
  const [questions, setQuestions] = useState<any>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [readyToShow, setReadyToShow] = useState<boolean>(false);
  const [randomURL, setRandomURL] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timerShow, setTimerShow] = useState<boolean>(false);
  const [notDoneQuestions, setNotDoneQuestion] = useState<any>([]);
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
  const { width, height } = useWindowSize();
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
    const notDoneQuestions = questions.problems.filter(
      (problem: any) => problem.done === false
    );
    setNotDoneQuestion(notDoneQuestions);
  }, [questions]);

  useEffect(() => {
    if (!notDoneQuestions) return;
    console.log(notDoneQuestions);
    if (notDoneQuestions.length > 0) {
      let randomNum = Math.floor(Math.random() * notDoneQuestions.length);
      setRandomURL(notDoneQuestions[randomNum].url);
      console.log(randomNum);
    }
  }, [notDoneQuestions]);

  const setRandom = () => {
    if (notDoneQuestions.length > 0) {
      let randomNum = Math.floor(Math.random() * notDoneQuestions.length);
      setRandomURL(notDoneQuestions[randomNum].url);
      console.log(randomNum);
    }
  };

  const handleUpdateProgress = (url: string, questionIndex: number) => {
    // const topicIndex = questionData.indexOf(questions);
    let previousData =
      localStorage.getItem("progressData") !== null
        ? JSON.parse(localStorage.getItem("progressData") || "")
        : questionData;
    console.log(previousData);
    // console.log(previousData[topicIndex[topic]]);
    let tempData = previousData[topicIndex[topic]]["problems"][questionIndex];
    tempData = { ...tempData, done: !tempData.done };
    previousData[topicIndex[topic]]["problems"][questionIndex] = tempData;
    // console.log(previousData);
    localStorage.setItem("progressData", JSON.stringify(previousData));
    setQuestions(previousData[topicIndex[topic]]);
  };

  const handleNotesEdit = (
    notes: string,
    url: string,
    questionIndex: number
  ) => {
    if (notes === "") return;
    let previousData =
      localStorage.getItem("progressData") !== null
        ? JSON.parse(localStorage.getItem("progressData") || "")
        : questionData;
    console.log(previousData);
    // console.log(previousData[topicIndex[topic]]);
    let tempData = previousData[topicIndex[topic]]["problems"][questionIndex];
    tempData = { ...tempData, notes: notes };
    previousData[topicIndex[topic]]["problems"][questionIndex] = tempData;
    // console.log(previousData);
    localStorage.setItem("progressData", JSON.stringify(previousData));
    setQuestions(previousData[topicIndex[topic]]);
  };

  const listenToScroll = () => {
    let heightToHideFrom = 500;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleHideTimer = () => {
    setTimerShow(!timerShow);
    localStorage.setItem("timer-hidden", timerShow ? "true" : "false");
  };

  useEffect(() => {
    if (localStorage.getItem("timer-hidden") !== null) {
      const timerHidden = JSON.parse(
        localStorage.getItem("timer-hidden") || ""
      );
      if (timerHidden === true) {
        setTimerShow(false);
      } else {
        setTimerShow(true);
      }
    } else setTimerShow(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <div className="transition-all duration-300 bg-white text-black dark:bg-slate-900 dark:text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-screen flex flex-col items-center min-h-screen md:pb-24">
        {notDoneQuestions && notDoneQuestions.length === 0 && (
          <>
            <Confetti className="confetti" width={width} height={height} opacity={1}/>
          </>
        )}
        <div className="title-container text-3xl flex flex-row items-center justify-between md:justify-center w-[95vw] fixed bg-white dark:bg-slate-900 py-8 md:pt-8 md:py-0 md:relative transition-all duration-300">
          <div className="icon md:fixed md:left-10 rounded-full border border-transparent hover:bg-black hover:text-white transition-all duration-300 dark:hover:bg-white dark:hover:text-black">
            <Link href={"/"}>
              <a>
                <IoIosArrowRoundBack />
              </a>
            </Link>
          </div>{" "}
          <div className="title-subtitle-container flex flex-col gap-3 items-center">
            <div className="title select-none">{readyToShow && title}</div>{" "}
            <Link href={"/"}>
              <div className="homepage select-none text-sm border-b cursor-pointer hover:border-black transition-all duration-200 text-gray-500 hover:text-black dark:hover:border-white dark:border-gray-500 dark:text-gray-500 dark:hover:text-white">
                DSA 375
              </div>
            </Link>
          </div>
          {notDoneQuestions && notDoneQuestions.length > 0 ? (
            <a
              href={randomURL}
              target="_blank"
              rel="noreferrer"
              onClick={setRandom}
              className="icon md:fixed md:right-10 rounded-full border border-transparent dark:text-white transition-all duration-300 text-lg hover:bg-black p-2 hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <div>
                <FaRandom />
              </div>
            </a>
          ) : (
            <div className="icon md:fixed md:right-10 rounded-full border border-transparent dark:text-white transition-all duration-300 text-lg  p-2">
              <GiPartyPopper />
            </div>
          )}
        </div>
        <div className="time-container mt-32 md:mt-8 mb-6 flex flex-col items-center justify-center flex-wrap md:px-10 py-3 gap-5">
          <div
            className="close-timer text-xl cursor-pointer rounded-full hover:bg-black hover:text-white p-1 transition-all duration-300 dark:hover:bg-white dark:hover:text-black"
            onClick={handleHideTimer}
          >
            {timerShow ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
          {timerShow && (
            <>
              <div className="time-container flex flex-row flex-wrap gap-5 items-center justify-center">
                <div className="time-box w-[80px] h-[30px] easy-nohover border-[.1px] border-black dark:border-white flex flex-col justify-center items-center card select-none text-xs">
                  5-10 mins
                </div>
                <div className="time-box w-[80px] h-[30px] medium-nohover border-[.1px] border-black dark:border-white flex flex-col justify-center items-center card select-none text-xs">
                  15-20 mins
                </div>
                <div className="time-box w-[80px] h-[30px] hard-nohover border-[.1px] border-black dark:border-white flex flex-col justify-center items-center card select-none text-xs">
                  45-60 mins
                </div>
              </div>
              <div className="disclaimer font-thin text-center text-xs md:text-sm select-none">
                If you are a beginner, you can ignore this and follow at your
                own pace.
              </div>
            </>
          )}
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
                  notes={question.notes}
                  handleUpdateProgress={handleUpdateProgress}
                  handleNotesEdit={handleNotesEdit}
                />
              );
            })}
        </div>
        {isVisible && (
          <div
            className="cursor-pointer go-to-top-btn text-white bg-slate-900 border-[1px] border-black hover:bg-white hover:text-slate-900 dark:bg-white fixed right-10 bottom-20 text-2xl dark:text-slate-900 dark:hover:text-white dark:hover:bg-slate-900 dark:border-white rounded-full transition-colors duration-200"
            onClick={scrollToTop}
          >
            <BsArrowUpCircleFill />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
