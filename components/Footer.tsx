import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import ThemeChanger from "./ThemeChanger";

export default function Footer () {
  return (
    <footer className="mt-10 md:mt-0 w-screen flex flow-row items-center justify-center md:h-[60px] gap-10 md:fixed md:bottom-0 transition-all duration-300 bg-white dark:bg-slate-900 pb-10 md:pb-0">
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
      </footer>
  )
}