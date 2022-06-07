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
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [totalSolved, setTotalSolved] = useState<number>();
  const [totalProblems, settotalProblems] = useState<number>();
  const [easyProblems, setEasyProblems] = useState<number>(0);
  const [mediumProblems, setMediumProblems] = useState<number>(0);
  const [hardProblems, setHardProblems] = useState<number>(0);
  const [easySolved, setEasySolved] = useState<number>(3000);
  const [mediumSolved, setMediumSolved] = useState<number>(3000);
  const [hardSolved, setHardSolved] = useState<number>(3000);
  useEffect(() => {
    if (localStorage.getItem("progressData") === null) return;
    const progressData = JSON.parse(
      localStorage.getItem("progressData") || "{}"
    );
    let solvedCount = 0;
    let totalProblems = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;
    let easyProblems = 0;
    let mediumProblems = 0;
    let hardProblems = 0;
    progressData.map((topic: any) => {
      topic.problems.map((problem: any) => {
        totalProblems++;
        problem.done && solvedCount++;
        problem.level === "easy" && easyProblems++;
        problem.level === "medium" && mediumProblems++;
        problem.level === "hard" && hardProblems++;
        if (problem.done) {
          problem.level === "easy" && easySolved++;
          problem.level === "medium" && mediumSolved++;
          problem.level === "hard" && hardSolved++;
        }
      });
    });
    console.log(solvedCount, easySolved, mediumSolved, hardSolved);
    console.log(totalProblems, easyProblems, mediumProblems, hardProblems);
    setEasyProblems(easyProblems);
    setMediumProblems(mediumProblems);
    setHardProblems(hardProblems);
    setTotalSolved(solvedCount);
    setEasySolved(easySolved);
    setMediumSolved(mediumSolved);
    setHardSolved(hardSolved);
    settotalProblems(totalProblems);
  }, []);
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
          rel="noreferrer"
        >
          <div className="text-sm border-b py-[1px] border-gray-500 hover:border-black hover:px-[3px] text-gray-500 hover:text-black transition-all duration-150 dark:text-gray-400 dark:border-gray-400 dark:hover:text-white dark:hover:border-white">
            By Apna College
          </div>
        </a>
        {totalSolved && totalProblems ? (
          <div className="progress-container mt-10 w-[100px]">
            {/* <CircularProgressbar
              value={(totalSolved / totalProblems) * 100}
              text={`${Math.round(
                (totalSolved / totalProblems) * 100
              )}% Solved`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "14",
                textColor: "#AAA",
                pathColor: "#ff6d6d",
              })}
            /> */}
            <CircularProgressbarWithChildren
              value={(easySolved / easyProblems) * 100}
              strokeWidth={6}
              styles={buildStyles({
                pathColor: "rgb(169, 242, 24)",
                trailColor: "transparent",
              })}
            >
              <div style={{ width: "84%" }}>
                <CircularProgressbarWithChildren
                  value={(mediumSolved / mediumProblems) * 100}
                  styles={buildStyles({
                    pathColor: "rgb(255, 186, 58)",
                    trailColor: "transparent",
                  })}
                >
                  <div style={{ width: "79%" }}>
                    <CircularProgressbar
                      value={(hardSolved / hardProblems) * 100}
                      text={`${Math.round(
                        (totalSolved / totalProblems) * 100
                      )}% Solved`}
                      strokeWidth={10}
                      styles={buildStyles({
                        textColor: "#aaa",
                        textSize: 13,
                        pathColor: "rgb(255, 109, 109)",
                        trailColor: "transparent",
                      })}
                    />
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <div className="progress-container mt-10 w-[100px]">
            <CircularProgressbar
              value={0}
              text={`Start Solving`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "12",
                textColor: "#AAA",
                pathColor: "black",
              })}
            />
          </div>
        )}
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
