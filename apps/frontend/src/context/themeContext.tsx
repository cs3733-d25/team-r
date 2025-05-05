import {createContext} from "react";

interface ThemeContextType {
    themeValue: 'light' | 'dark';
}
export const ThemeContext = createContext<ThemeContextType>({
    themeValue: 'light',
})