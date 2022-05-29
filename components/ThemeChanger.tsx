import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

   useEffect(() => {
     console.log(isDarkMode);
     if(!theme) return
     setIsDarkMode(theme == 'dark')
   },[theme])
 
  return (
    <div>
      <DarkModeSwitch
      style={{ width: '22px' }}
      checked={isDarkMode}
      onChange={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
      size={120}
    />
    </div>
  )
}
export default ThemeChanger;