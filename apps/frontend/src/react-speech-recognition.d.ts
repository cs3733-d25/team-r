declare module 'react-speech-recognition' {
    export interface SpeechRecognitionOptions {
        transcript: string;
        listening: boolean;
        resetTranscript: () => void;
        commands: Array<{ command: string; callback: () => void }>;
        browserSupportsSpeechRecognition: boolean;
    }

    export function useSpeechRecognition(): SpeechRecognitionOptions;
    export default class SpeechRecognition {
        static startListening: () => void;
        static stopListening: () => void;
    }
}