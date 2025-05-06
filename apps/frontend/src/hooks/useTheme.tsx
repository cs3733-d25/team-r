import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark'; //no sepia made

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme') as Theme;
        if (stored) {
            applyTheme(stored);
            setTheme(stored);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        console.log('useTheme.tsx is applying: ', newTheme);
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return { theme, setTheme: applyTheme };
};