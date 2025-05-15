import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { HiSun, HiMoon } from "react-icons/hi"

export const ThemeToggle = () => {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) return null
    const { theme, setTheme } = themeContext

  return (
    <div className="p-2">
        {theme === 'dark'? (
            <div className="flex items-center cursor-pointer" onClick={() => setTheme(theme === 'dark'? 'light':'dark')}>
                <HiSun className="text-primary text-2xl mr-2"/>Light Mode
            </div >
        ): (
        <div className="flex items-center cursor-pointer" onClick={() => setTheme(theme === 'dark'? 'light':'dark')}>
            <HiMoon className="text-primary text-2xl mr-2"/>Dark Mode
        </div>
    )}
    </div>
  )
}
