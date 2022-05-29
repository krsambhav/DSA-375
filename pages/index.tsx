import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import questionData from "../public/data.json";
import { IoLogoGithub } from "react-icons/io";
import ThemeChanger from "../components/ThemeChanger";
import { SiGooglesheets } from "react-icons/si";

const Home: NextPage = () => {
  return (
    <div className="dark:bg-slate-900">
      <Head>
        <title>DSA 375</title>
        <meta name="description" content="DSA 375" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center p-10 md:pb-24 min-h-screen">
        <div className="title-container text-3xl">DSA 375</div>
        <a
          href="https://www.youtube.com/c/ApnaCollegeOfficial"
          target={"_blank"}
          rel='noreferrer'
        >
          <div className="text-sm">By Aman & Shradha</div>
        </a>
        <div className="cards-container mt-10 md:mt-12 flex flex-row flex-wrap justify-center gap-10">
          {questionData.map((topic, index) => {
            return (
              <Card
                topic={topic.topic}
                title={topic.title}
                key={index}
                qty={topic.problems.length}
              />
            );
          })}
        </div>
      </main>
      <footer className="w-screen flex flow-row items-center justify-center md:h-[60px] gap-10 md:fixed md:bottom-0 bg-white dark:bg-slate-900  pb-10 md:pb-0">
        <ThemeChanger />
        <a
          href="https://github.com/krsambhav/DSA-375/"
          target={"_blank"}
          rel="noreferrer"
        >
          <IoLogoGithub className="text-2xl" />
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1hXserPuxVoWMG9Hs7y8wVdRCJTcj3xMBAEYUOXQ5Xag/htmlview?pru=AAABgROubJY*B_0WxnW4sJ84JG81Ih-eng#"
          target={"_blank"}
          rel="noreferrer"
        >
          <SiGooglesheets className="text-lg" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
