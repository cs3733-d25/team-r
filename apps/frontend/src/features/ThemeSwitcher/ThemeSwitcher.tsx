import { useTheme } from '@/hooks/useTheme';

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="theme" className="text-sm">Theme:</label>
            <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'theme-sepia')}
                className="bg-background text-foreground border p-1 rounded"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="theme-sepia">Sepia</option>
            </select>
        </div>
    );
};