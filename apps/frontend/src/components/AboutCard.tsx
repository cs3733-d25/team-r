import { useState } from 'react';
import { Label } from '@/components/ui/label.tsx';

interface AboutCardProps {
    name: string;
    role: string;
    photoURL: string;
    quote: string;
    quoteAuthor: string;
}

export function AboutCard({ name, role, photoURL, quote, quoteAuthor}: AboutCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div
            className="relative w-96 h-48 transition-transform duration-300 hover:scale-105 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`absolute w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-card shadow-md rounded-2xl p-4 flex flex-row items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden">
                            <img
                                src={photoURL}
                                alt={name}
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-left">
                        <Label className="text-xl font-bold">{name}</Label>
                        <Label className="text-gray-600 dark:text-gray-400 text-sm">{role}</Label>
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-card shadow-md rounded-2xl p-6 flex flex-col justify-center items-center">
                    <Label className="text-center italic">"{quote}"</Label>
                    <Label className="text-right font-semibold mt-3">- {quoteAuthor}</Label>
                </div>
            </div>
        </div>
    );
};