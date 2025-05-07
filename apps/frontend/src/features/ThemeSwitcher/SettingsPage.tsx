import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function SettingsPage() {
    const [useDark, setUseDark] = React.useState(false);

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <ThemeSwitcher />
        </main>
    );
}
