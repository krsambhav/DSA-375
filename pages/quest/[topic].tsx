import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import questionData from '../../public/data.json';
import {IoIosArrowRoundBack, IoLogoGithub} from 'react-icons/io';
import Link from "next/link";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ThemeChanger from "../../components/ThemeChanger";

export default function Questions() {
  const [questions, setQuestions] = useState<any>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [readyToShow, setReadyToShow] = useState<boolean>(false);
  const router = useRouter();
  const topic = router.query['topic'] || 'Questions';
  const topicIndex = {
    'arrays': 0
  }
  // console.log(topic);
  useEffect(() => {
    setQuestions(questionData)
    if(!router.isReady) return
    setQuestions(questionData.filter((set) => set.topic===topic)[0])
    setTitle(questionData.filter((set) => set.topic===topic)[0]['title']);
    setReadyToShow(true);
  }, [topic, router.isReady])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }
  
  return (
    <>
    <Head><title>{title}</title></Head>
    <main className="w-screen p-10 flex flex-col items-center">
    <div className="title-container text-3xl flex flex-row items-center justify-between md:justify-center w-[95vw]">
        <div className="icon md:fixed md:left-10 rounded-full border border-transparent hover:bg-black hover:text-white transition-all duration-300 "><Link href={'/'}><a><IoIosArrowRoundBack /></a></Link></div> <div className="title">{readyToShow && title}</div> <div className="md:fixed"><IoIosArrowRoundBack className="opacity-0" /></div>
      </div>
      <div className="time-container mt-12 flex flex-row flex-wrap gap-5">
        <div className="time-box w-[80px] h-[30px] easy border-[.1px] border-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">5-10 mins</div>
        <div className="time-box w-[80px] h-[30px] medium border-[.1px] border-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">15-20 mins</div>
        <div className="time-box w-[80px] h-[30px] hard border-[.1px] border-black transition-all duration-200 flex flex-col justify-center items-center card select-none text-xs">45-60 mins</div>
      </div>
      <div className="questions-container flex flex-row flex-wrap items-center justify-center gap-10 mt-5 md:mx-16">
      {readyToShow && questions['problems'].map((question:any, index:any) => {
        return (
          <QuestionCard key={index} title={question.title} url={question.url} level={question.level} remark={question.remark} />
        )
      })}
      </div>
    </main>
    <footer className="w-screen flex flow-row items-center justify-center my-10 gap-10">
    <ThemeChanger />
      <a href="https://github.com/krsambhav/DSA-375/" target={"_blank"} rel="noreferrer"><IoLogoGithub className="text-2xl" /></a>
    </footer>
    </>
  )
}