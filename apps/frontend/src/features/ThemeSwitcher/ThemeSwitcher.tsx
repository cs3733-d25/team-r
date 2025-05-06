import { useTheme } from '@/hooks/useTheme';
import { Label } from 'recharts';

interface ThemeSwitcherProps {
    useDark?: boolean;
}

export const ThemeSwitcher = ({useDark}: ThemeSwitcherProps) => {
    const { theme, setTheme } = useTheme();

    return (
        // <div className="flex items-center gap-2">
        //     <label htmlFor="theme" className="text-sm">Theme:</label>
        //     <select
        //         id="theme"
        //         value={theme}
        //         onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'theme-sepia')}
        //         className="bg-background text-foreground border p-1 rounded"
        //     >
        //         <option value="light">Light</option>
        //         <option value="dark">Dark</option>
        //         {/*<option value="theme-sepia">Sepia</option>*/}
        //     </select>
        // </div>
        <span className={'font-trade text-base flex items-center justify-center space-x-2'}>
            <span>Light</span>
            <label className="relative inline-flex items-center cursor-pointer">

                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={useDark}
                    onChange={(e) => {
                        useDark = !e.target.checked;
                        setTheme(useDark ? 'light' : 'dark');
                    }
                }
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
            <span>Dark</span>
        </span>
    );
};