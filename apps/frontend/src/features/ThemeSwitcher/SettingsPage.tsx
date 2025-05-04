
import React, {useState} from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import {useTextSize} from "@/context/textContext.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function SettingsPage() {
    const { index, increase, decrease } = useTextSize();
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <ThemeSwitcher />
            <span className="ml-2 text-gray-500">{`Current: ${index}`}</span>
            <div className="flex gap-4">
                <Button onClick={decrease}>A-</Button>
                <Button onClick={increase}>A+</Button>
            </div>
        </main>
    );
}