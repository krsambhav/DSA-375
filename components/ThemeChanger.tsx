import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState<any>()
  const [readyToShow, setIsReadyToShow] = useState<boolean>(false)

   useEffect(() => {
     if(!theme) return
     setIsDarkMode(theme == 'dark')
     setIsReadyToShow(true)
   },[theme])
 
  return (
    <div className='h-[30px] flex flex-col justify-center'>
      {readyToShow && <DarkModeSwitch
      style={{ width: '22px' }}
      checked={isDarkMode}
      onChange={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
      size={120}
    />}
    </div>
  )
}
export default ThemeChanger;