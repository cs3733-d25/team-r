import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import axios from 'axios';
import { Mic, MicOff } from 'lucide-react';

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
];

export function InlineTranslator() {
    const [sourceText, setSourceText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);

    useEffect(() => {
        setSpeechSupported(!!window.webkitSpeechRecognition || !!window.SpeechRecognition);
    }, []);

    const toggleSpeechToText = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        const SpeechRecognitionClass = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognitionClass) {
            console.error('Speech recognition not supported in this browser');
            return;
        }
        const recognition = new SpeechRecognitionClass();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
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
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();

        // store recognition instance to stop it later
        window.recognitionInstance = recognition;
    };

    const stopListening = () => {
        if (window.recognitionInstance) {
            window.recognitionInstance.stop();
            window.recognitionInstance = null;
        }
        setIsListening(false);
    };

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;

        setIsLoading(true);
        try {
            const response = await axios.post('/api/translation/inline', {
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

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Quick Translator</h2>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="sourceText" className="mb-2 block">
                        Text to Translate
                    </Label>
                    <div className="relative">
                        <Textarea
                            id="sourceText"
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                            placeholder="Enter text to translate..."
                            className="h-24"
                        />
                        {speechSupported && (
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className={`absolute right-2 top-2 ${isListening ? 'text-red-500' : ''}`}
                                onClick={toggleSpeechToText}
                                title={isListening ? 'Stop listening' : 'Start dictation'}
                            >
                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            </Button>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="targetLanguage" className="mb-2 block">
                        Translate To
                    </Label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                        <SelectTrigger id="targetLanguage">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
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
                    variant="secondary"
                >
                    {isLoading ? 'Translating...' : 'Translate'}
                </Button>

                {translatedText && (
                    <div className="mt-4">
                        <Label htmlFor="translatedText" className="mb-2 block">
                            Translation
                        </Label>
                        <div
                            id="translatedText"
                            className="p-3 border rounded-md bg-slate-50 min-h-24"
                        >
                            {translatedText}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InlineTranslator;
