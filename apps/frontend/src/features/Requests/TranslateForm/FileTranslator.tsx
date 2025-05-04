import { useRef, useState } from 'react';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';

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

export function FileTranslator() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [targetLanguage, setTargetLanguage] = useState(LANGUAGES[0].code);
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null);
    };

    const handleFileUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetLanguage', targetLanguage);

        try {
            const resp = await axios.post('/api/upload-translate', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTranslatedText(resp.data.translatedText);
        } catch (err) {
            console.error(err);
            setTranslatedText('Error translating file.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Label htmlFor="sourceText" className="mb-2 block">
                Upload & Translate File
            </Label>

            <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="flex items-center space-x-4">
                <Button variant="unselected" onClick={() => fileInputRef.current?.click()}>
                    {file ? 'Change File' : 'Choose File'}
                </Button>
                {file && <span className="text-gray-700">{file.name}</span>}
            </div>

            <div className="space-y-1">
                <Label>Translate To</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger>
                        <SelectValue placeholder="Language" />
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

            <Button onClick={handleFileUpload} disabled={!file || isLoading} className="w-full">
                {isLoading ? 'Translating…' : 'Upload & Translate'}
            </Button>

            {translatedText && (
                <div>
                    <Label>Result</Label>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-64 whitespace-pre-wrap break-words">
                        {translatedText}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default FileTranslator;
