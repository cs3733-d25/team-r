import {Mic} from "react-bootstrap-icons";
import {useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export function VoiceControl() {
    const [speaking, setSpeaking] = useState<boolean>(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const commands = [
        {command: 'end transmission',
            callback: () => {
                alert(transcript)
            }}
    ]

    const handleVoiceControl = () => {
        if (!browserSupportsSpeechRecognition) {
            alert('Your browser does not support speech recognition');
        } else {
            resetTranscript();
            if (!speaking) {
                // Start listening
                SpeechRecognition.startListening();
                setSpeaking(true);
            } else {
                // Stop listening
                SpeechRecognition.stopListening();
                setSpeaking(false);
            }
        }
        console.log(`Transcript: ${transcript}`);
    };

    return (
        <button>
            <Mic
                className={`text-3xl ${speaking ? 'text-red-500' : 'text-gray-500'}`}
                onClick={handleVoiceControl}
                title={speaking ? "Stop Listening" : "Start Listening"}
            />
        </button>
    )
}