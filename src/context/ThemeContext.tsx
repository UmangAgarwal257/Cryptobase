/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

const getInitialTheme = () => {
    if(typeof window !== 'undefined') {
        const storedPrefs = localStorage.getItem('color-theme');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        }
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if(userMedia.matches) {
            return 'dark';
        }
        return 'light';
    }
}

export const ThemeContext = createContext<{ theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined)

interface ThemeProviderProps {
    initialTheme?: string;
    children: React.ReactNode;
}

export const ThemeProvider = ({initialTheme, children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string>(getInitialTheme() || 'light');

    const rawSetTheme = (theme: string) => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';
        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('color-theme', theme);
    }

    useEffect(() => {
        if(initialTheme) {
            rawSetTheme(initialTheme);
        }
    }, [initialTheme]);

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}