import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import questionData from "../../public/data.json";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import Link from "next/link";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { GiPartyPopper } from "react-icons/gi";
import Footer from "../../components/Footer";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
export default function Questions() {
  const [questions, setQuestions] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [readyToShow, setReadyToShow] = useState<boolean>(false);
  const [randomURL, setRandomURL] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timerShow, setTimerShow] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();
  const [totalQuestions, setTotalQuestions] = useState<any>();
  const [notSolvedQuestions, setNotSolvedQuestions] = useState<any>([]);
  const [currentProgress, setCurrentProgress] = useState<any>();
  const [categoricalProgress, setCategoricalProgress] = useState<any>();
  const [solvedProblemsAcrossTopics, setSolvedProblemsAcrossTopics] =
    useState<number>(0);

  //Getting Current Window Size
  const { width, height } = useWindowSize();

  //Initialising Router
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

  //Setting Current Window Size
  useEffect(() => {
    if (!questions) return;
    setWindowHeight(height);
    setWindowWidth(width);
  });

  //Initialising Problems If Already In LocalStorage Else From data.json
  useEffect(() => {
    if (!router.isReady) return;
    if (localStorage.getItem("progressData") == null) {
      localStorage.setItem("progressData", JSON.stringify(questionData));
      setQuestions(questionData.filter((set: any) => set.topic === topic)[0]);
      setTitle(
        questionData.filter((set: any) => set.topic === topic)[0]["title"]
      );
      setCurrentProgress(questionData);
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
      setCurrentProgress(localQuestionData);
    }
    setReadyToShow(true);
  }, [topic, router.isReady]);

  //Setting Total Solved Questions
  useEffect(() => {
    if (!currentProgress) return;
    let solvedProblemsAcrossTopics = 0;
    currentProgress.map((topic: any) => {
      topic.problems.map((problem: any) => {
        if (problem.done === true) solvedProblemsAcrossTopics++;
      });
    });
    setSolvedProblemsAcrossTopics(solvedProblemsAcrossTopics);
  }, [currentProgress]);

  //Setting Not Solved Questions
  useEffect(() => {
    if (!questions) return;
    const notSolvedQuestions = questions.problems.filter(
      (problem: any) => problem.done === false || !problem.done
    );
    setNotSolvedQuestions(notSolvedQuestions);
    setTotalQuestions(questions.problems.length);
  }, [questions]);

  //Set Random URL For Shuffle Button On Start
  useEffect(() => {
    if (!notSolvedQuestions) return;
    if (notSolvedQuestions.length > 0) {
      let randomNum = Math.floor(Math.random() * notSolvedQuestions.length);
      setRandomURL(notSolvedQuestions[randomNum].url);
    }
  }, [notSolvedQuestions]);

  //Set Random URL For Shuffle Button On Click Of Shuffle Button
  const setRandom = () => {
    if (notSolvedQuestions.length > 0) {
      let randomNum = Math.floor(Math.random() * notSolvedQuestions.length);
      setRandomURL(notSolvedQuestions[randomNum].url);
    }
  };

  //Update Progress On Question Solve
  const handleUpdateProgress = (url: string, questionIndex: number) => {
    let previousData =
      localStorage.getItem("progressData") !== null
        ? JSON.parse(localStorage.getItem("progressData") || "")
        : questionData;
    let tempData = previousData[topicIndex[topic]]["problems"][questionIndex];
    tempData = { ...tempData, done: !tempData.done };
    previousData[topicIndex[topic]]["problems"][questionIndex] = tempData;
    localStorage.setItem("progressData", JSON.stringify(previousData));
    setQuestions(previousData[topicIndex[topic]]);
    setCurrentProgress(previousData);
  };

  //Update Progress On Notes Entry
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
    let tempData = previousData[topicIndex[topic]]["problems"][questionIndex];
    tempData = { ...tempData, notes: notes };
    previousData[topicIndex[topic]]["problems"][questionIndex] = tempData;
    localStorage.setItem("progressData", JSON.stringify(previousData));
    setQuestions(previousData[topicIndex[topic]]);
  };

  //Enable Scroll To Top Button On Scroll Down
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

  //Scroll To Top On ScrollToTop Button Click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Handler For Recommended Timer Hide Button
  const handleHideTimer = () => {
    setTimerShow(!timerShow);
    localStorage.setItem("timer-hidden", timerShow ? "true" : "false");
  };

  //Check If Recommended Timer Is Hidden Previously Or Not
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

  //Enable Scroll Listener On Scroll
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    if (!currentProgress) return;
    const totalProgressData =
      localStorage.getItem("progressData") !== null
        ? JSON.parse(localStorage.getItem("progressData") || "")
        : questionData;
    const topicProgressData = totalProgressData[topicIndex[topic]];
    const categoricalProgress = {
      totalProblems:0,
      totalSolved:0,
      totalEasyProblems: 0,
      totalEasySolved: 0,
      totalMediumProblems: 0,
      totalMediumSolved: 0,
      totalHardProblems: 0,
      totalHardSolved: 0,
      topicProblems:0,
      topicSolved:0,
      topicEasyProblems: 0,
      topicEasySolved: 0,
      topicMediumProblems: 0,
      topicMediumSolved: 0,
      topicHardProblems: 0,
      topicHardSolved: 0
    };
    totalProgressData.map((topic: any) => {
      topic.problems.map((problem: any) => {
        categoricalProgress.totalProblems++;
        problem.done && categoricalProgress.totalSolved++;
        problem.level === "easy" && categoricalProgress.totalEasyProblems++;
        problem.level === "medium" && categoricalProgress.totalMediumProblems++;
        problem.level === "hard" && categoricalProgress.totalHardProblems++;
        if (problem.done) {
          problem.level === "easy" && categoricalProgress.totalEasySolved++;
          problem.level === "medium" && categoricalProgress.totalMediumSolved++;
          problem.level === "hard" && categoricalProgress.totalHardSolved++;
        }
      });
    });
    topicProgressData.problems.map((problem: any) => {
        categoricalProgress.topicProblems++;
        problem.done && categoricalProgress.topicSolved++;
        problem.level === "easy" && categoricalProgress.topicEasyProblems++;
        problem.level === "medium" && categoricalProgress.topicMediumProblems++;
        problem.level === "hard" && categoricalProgress.topicHardProblems++;
        if (problem.done) {
          problem.level === "easy" && categoricalProgress.topicEasySolved++;
          problem.level === "medium" && categoricalProgress.topicMediumSolved++;
          problem.level === "hard" && categoricalProgress.topicHardSolved++;
        }
    });
    setCategoricalProgress(categoricalProgress);
  }, [currentProgress]);

  return (
    <div className="transition-all duration-300 bg-white text-black dark:bg-slate-900 dark:text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="w-screen flex flex-col items-center min-h-screen md:pb-24">
        {windowWidth &&
          notSolvedQuestions &&
          notSolvedQuestions.length === 0 &&
          windowWidth > 0 && (
            <Confetti
              className="confetti"
              width={windowWidth}
              height={windowHeight}
            />
          )}
        <div className="title-container text-3xl flex flex-row items-center justify-between md:justify-center w-[95vw] fixed bg-white dark:bg-slate-900 py-8 md:pt-8 md:py-0 md:relative transition-all duration-300 z-10">
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
          {notSolvedQuestions && notSolvedQuestions.length > 0 ? (
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
          <div className="flex flex-row items-center justify-between w-[90vw] md:w-[70vw]">
            <div className="w-[80px]">
              {categoricalProgress ? 
              <CircularProgressbarWithChildren
                value={categoricalProgress.totalEasySolved/categoricalProgress.totalEasyProblems*100}
                strokeWidth={6}
                styles={buildStyles({
                  pathColor: "rgb(169, 242, 24)",
                  trailColor: "transparent",
                })}
              >
                <div style={{ width: "84%" }}>
                  <CircularProgressbarWithChildren
                    value={categoricalProgress.totalMediumSolved/categoricalProgress.totalMediumProblems*100}
                    styles={buildStyles({
                      pathColor: "rgb(255, 186, 58)",
                      trailColor: "transparent",
                    })}
                  >
                    <div style={{ width: "79%" }}>
                      <CircularProgressbar
                        value={categoricalProgress.totalHardSolved/categoricalProgress.totalHardProblems*100}
                        text={`${categoricalProgress.totalSolved/categoricalProgress.totalProblems * 100 > 0 ? Math.round(categoricalProgress.totalSolved/categoricalProgress.totalProblems * 100) + "%" : ""}`}
                        strokeWidth={10}
                        styles={buildStyles({
                          textColor: "#aaa",
                          textSize: 20,
                          pathColor: "rgb(255, 109, 109)",
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren> : ""}
            </div>
            <div className="flex flex-col gap-5">
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
              </div>
            <div className="w-[80px]">
              {categoricalProgress ? <CircularProgressbarWithChildren
                value={categoricalProgress.topicEasyProblems !== 0 ? categoricalProgress.topicEasySolved / categoricalProgress.topicEasyProblems * 100 : 0}
                strokeWidth={6}
                styles={buildStyles({
                  pathColor: "rgb(169, 242, 24)",
                  trailColor: "transparent",
                })}
              >
                <div style={{ width: "84%" }}>
                  <CircularProgressbarWithChildren
                    value={categoricalProgress.topicMediumSolved/categoricalProgress.topicMediumProblems * 100}
                    styles={buildStyles({
                      pathColor: "rgb(255, 186, 58)",
                      trailColor: "transparent",
                    })}
                  >
                    <div style={{ width: "79%" }}>
                      <CircularProgressbar
                        value={categoricalProgress.topicHardSolved / categoricalProgress.topicHardProblems * 100}
                        text={`${categoricalProgress.topicSolved/categoricalProgress.topicProblems * 100 > 0 ? Math.round(categoricalProgress.topicSolved/categoricalProgress.topicProblems * 100) + "%" : ""}`}
                        strokeWidth={10}
                        styles={buildStyles({
                          textColor: "#aaa",
                          textSize: 20,
                          pathColor: "rgb(255, 109, 109)",
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren> : ""}
            </div>
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
      <Footer
        doneQuestions={totalQuestions - notSolvedQuestions.length}
        totalQuestions={totalQuestions}
        solvedProblemsAcrossTopics={solvedProblemsAcrossTopics}
        title={title}
      />
    </div>
  );
}
