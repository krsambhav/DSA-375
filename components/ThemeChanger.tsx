import { useTheme } from 'next-themes'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <DarkModeSwitch
      style={{ width: '22px' }}
      checked={theme === 'dark' ? true : false}
      onChange={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark');
      }}
      size={120}
    />
    </div>
  )
}
export default ThemeChanger;