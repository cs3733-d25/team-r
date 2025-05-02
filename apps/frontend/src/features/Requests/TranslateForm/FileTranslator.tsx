import {useState} from 'react'
import axios from 'axios'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select.tsx';
import {Button} from '@/components/ui/button.tsx';

export function FileTranslator() {
    const [file, setFile] = useState<File | null>(null)
    const [targetLanguage, setTargetLanguage] = useState('es')
    const [translatedText, setTranslatedText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null)
    }

    const handleFileUpload = async () => {
        if (!file) return
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('targetLanguage', targetLanguage)

        try {
            const resp = await axios.post('/api/upload-translate', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setTranslatedText(resp.data.translatedText)
        } catch (err) {
            console.error(err)
            setTranslatedText('Error translating file.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Label>Upload File (.txt)</Label>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <Label>Translate To</Label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    {['es','fr','de'].map(code => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleFileUpload} disabled={!file || isLoading}>
                {isLoading ? 'Translating…' : 'Upload & Translate'}
            </Button>
            {translatedText && (
                <div>
                    <Label>Result</Label>
                    <pre>{translatedText}</pre>
                </div>
            )}
        </div>
    )
}

export default FileTranslator