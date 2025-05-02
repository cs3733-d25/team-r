import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

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

    const handleTranslate = async () => {
        if (!sourceText.trim()) return;

        setIsLoading(true);
        try {
            const response = await axios.post('/api/translation/inline', {
                text: sourceText,
                targetLanguage,
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
                    <Label htmlFor="sourceText">Text to Translate</Label>
                    <Textarea
                        id="sourceText"
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        placeholder="Enter text to translate..."
                        className="h-24"
                    />
                </div>

                <div>
                    <Label htmlFor="targetLanguage">Translate To</Label>
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
                        <Label htmlFor="translatedText">Translation</Label>
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