import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import questionData from '../../public/data.json';

export default function Questions() {
  const [questions, setQuestions] = useState<any>();
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
  
  return (
    <>
    <Head><title>{title}</title></Head>
    <main className="w-screen p-10 flex flex-col items-center">
      <div className="title-container text-3xl">
        {readyToShow && title}
      </div>
      <div className="questions-container flex flex-row flex-wrap items-center justify-center gap-10 mt-10">
      {readyToShow && questions['problems'].map((question:any, index:any) => {
        return (
          <QuestionCard key={index} title={question.title} url={question.url} level={question.level} />
        )
      })}
      </div>
    </main>
    </>
  )
}