import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import FileTranslator from './FileTranslator';
import {TOUR_STEPS_IDS_TRANS} from "@/lib/tour-constants.ts";
import {TourAlertDialog, TourStep, useTour} from "@/components/tour.tsx";

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    error?: {
        error: string;
        message?: string;
    };
}

interface SpeechRecognitionResultList {
    readonly length: number;

    item(index: number): SpeechRecognitionResult;

    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly length: number;

    item(index: number): SpeechRecognitionAlternative;

    [index: number]: SpeechRecognitionAlternative;

    isFinal?: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;

    start(): void;

    stop(): void;

    abort(): void;

    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onstart: () => void;
}

interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
        recognitionInstance?: SpeechRecognition | null;
    }
}

const LANGUAGES = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'ru', name: 'Russian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'pol', name: 'Polish' },
    { code: 'it', name: 'Italian' },
];

export function InlineTranslator() {
    const [sourceText, setSourceText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [micPermissionError, setMicPermissionError] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [mode, setMode] = useState<'text' | 'file'>('text');

    useEffect(() => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (Recognition) {
            window.SpeechRecognition = Recognition;
            setSpeechSupported(!!window.webkitSpeechRecognition || !!window.SpeechRecognition);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const toggleSpeechToText = async () => {
        if (isListening) {
            stopListening();
        } else {
            try {
                // request microphone permission
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setMicPermissionError(false);
                startListening();
            } catch (error) {
                console.error('Microphone permission error:', error);
                setMicPermissionError(true);
            }
        }
    };

    const startListening = () => {
        const SpeechRecognitionClass = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognitionClass) {
            console.error('Speech recognition not supported in this browser');
            return;
        }

        try {
            const recognition = new SpeechRecognitionClass();

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setMicPermissionError(false);
            };

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join('');

                setSourceText(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                if (event.error && event.error.error === 'not-allowed') {
                    setMicPermissionError(true);
                }
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            setMicPermissionError(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsListening(false);
    };

    const handleTranslate = async () => {
        if (isListening) {
            stopListening();
        }

        if (!sourceText.trim()) return;

        setIsLoading(true);
        try {
            const response = await axios.post('/api/inline', {
                text: sourceText,
                targetLanguage: targetLanguage,
            });
            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Translation error:', error);
            setTranslatedText('Error translating text. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const speakText = () => {
        if (!translatedText) return;
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = targetLanguage;
        window.speechSynthesis.speak(utterance);
    };

    //tour component steps
    const steps: TourStep[] = [
        { content: <div>On this page you can translate a selection of text.</div>, selectorId: TOUR_STEPS_IDS_TRANS.CLICK_START, position: "bottom" },
        { content: <div>Click here to choose between text translation or file translation. </div>, selectorId: TOUR_STEPS_IDS_TRANS.CHOOSE, position: "bottom" },
        { content: <div>Enter text here to translate a selection.</div>, selectorId: TOUR_STEPS_IDS_TRANS.TEXT, position: "right" },
        { content: <div>Alternatively, click on this button to use your voice to input text.</div>, selectorId: TOUR_STEPS_IDS_TRANS.MIC, position: "right" },
        { content: <div>Click on this dropdown to choose which language to translate to.</div>, selectorId: TOUR_STEPS_IDS_TRANS.LANGUAGE, position: "right" },
        { content: <div>Once you are done, click here to get your translated text.</div>, selectorId: TOUR_STEPS_IDS_TRANS.TRANSLATE, position: "right" },
    ];
    const { setSteps } = useTour();
    const [openTour, setOpenTour] = useState(true);

    //tour displaying
    useEffect(() => {
        setSteps(steps);

        // check if user has already seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenCSVTour') === 'true';

        if (!hasSeenTour) {
            const timer = setTimeout(() => {
                setOpenTour(true);
                // mark that user has seen the tour
                localStorage.setItem('hasSeenCSVTour', 'true');
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [setSteps]);

    return (
        <div className="bg-white dark:bg-background dark:border-grey-600 rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4" id={TOUR_STEPS_IDS_TRANS.CLICK_START}>Quick Translator</h2>

            <div className="flex space-x-2 mb-4" id={TOUR_STEPS_IDS_TRANS.CHOOSE}>
                <Button
                    variant={mode === 'text' ? 'default' : 'unselected'}
                    onClick={() => setMode('text')}
                >
                    Text
                </Button>
                <Button
                    variant={mode === 'file' ? 'default' : 'unselected'}
                    onClick={() => setMode('file')}
                >
                    File
                </Button>
            </div>
            {mode === 'text' ? (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="sourceText" className="mb-2 block">
                            Text to Translate
                        </Label>
                        <div className="relative">
                            <div id={TOUR_STEPS_IDS_TRANS.TEXT}>
                                <Textarea
                                    id="sourceText"
                                    value={sourceText}
                                    onChange={(e) => setSourceText(e.target.value)}
                                    placeholder="Enter text to translate..."
                                    className="h-24"
                                />
                            </div>
                            {speechSupported && (
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="unselected"
                                    className={`absolute right-2 top-2 ${isListening ? 'text-red-500' : ''}`}
                                    onClick={toggleSpeechToText}
                                    title={isListening ? 'Stop listening' : 'Start dictation'}
                                    id={TOUR_STEPS_IDS_TRANS.MIC}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </Button>
                            )}
                        </div>
                        {micPermissionError && (
                            <p className="text-amber-600 text-sm mt-1">
                                Microphone permission denied. Please allow access to use speech
                                input.
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="targetLanguage" className="mb-2 block">
                            Translate To
                        </Label>
                            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                                <div id={TOUR_STEPS_IDS_TRANS.LANGUAGE}>
                                    <SelectTrigger id="targetLanguage">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                </div>
                                <SelectContent>
                                    {LANGUAGES.map((lang) => (
                                        <SelectItem key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleTranslate}
                        disabled={isLoading || !sourceText.trim()}
                        variant="default"
                        id={TOUR_STEPS_IDS_TRANS.TRANSLATE}
                    >
                        {isLoading ? 'Translating...' : 'Translate'}
                    </Button>

                    {translatedText && (
                        <div className="mt-4 space-y-2">
                            <Label htmlFor="translatedText" className="mb-2 block">
                                Translation
                            </Label>
                            <div className="relative">
                                <div
                                    id="translatedText"
                                    className="p-3 border rounded-md bg-slate-50 min-h-24"
                                >
                                    {translatedText}
                                </div>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="unselected"
                                    onClick={speakText}
                                    title="Speak Translation"
                                    className="absolute right-2 top-2"
                                >
                                    <Volume2 size={18} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <FileTranslator />
            )}
            <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
        </div>
    );
}

export default InlineTranslator;
