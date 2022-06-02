import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/TopicCard";
import styles from "../styles/Home.module.css";
import questionData from "../public/data.json";
import { IoLogoGithub } from "react-icons/io";
import ThemeChanger from "../components/ThemeChanger";
import { SiGooglesheets } from "react-icons/si";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className="transition-all duration-300 bg-white dark:bg-slate-900 pb-10">
      <Head>
        <title>DSA 375</title>
        <meta name="description" content="DSA 375" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col items-center p-10 md:px-24 min-h-screen select-none">
        <div className="title-container text-3xl">DSA 375</div>
        <a
          href="https://www.youtube.com/c/ApnaCollegeOfficial"
          target={"_blank"}
          rel='noreferrer'
        >
          <div className="text-sm border-b py-[1px] border-gray-500 hover:border-black hover:px-[3px] text-gray-500 hover:text-black transition-all duration-150 dark:text-gray-400 dark:border-gray-400 dark:hover:text-white dark:hover:border-white">By Apna College</div>
        </a>
        <div className="cards-container mt-10 md:mt-12 flex flex-row flex-wrap justify-center gap-10">
          {questionData.map((topic, index) => {
            return (
              <Card
                topic={topic.topic}
                title={topic.title}
                key={index}
                qty={topic.problems.length}
                index={index}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
