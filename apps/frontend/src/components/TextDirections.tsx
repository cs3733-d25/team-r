import { Label } from '@/components/ui/label.tsx';
import {VolumeUp} from 'react-bootstrap-icons';
import {useState} from "react";

interface TextDirectionsProps {
    steps: string[];
    distance?: string;
    duration?: string;
}

/**
 * TextDirections component - displays text directions for internal and external maps, allows for TTS
 * @param steps - array of text directions
 * @param distance - distance of the route (optional)
 * @param duration - time it takes to travel (optional)
 * @constructor
 */
function TextDirections({ steps, distance, duration }: TextDirectionsProps) {
    const [speaking, setSpeaking] = useState<boolean>(false);

    /**
     * handleTTS - handles the text-to-speech functionality
     * only accepts external maps for now
     */
    const handleTTS = () => {
        if (!speaking) {
            // remove HTML tags from the steps using regex
            const cleanedSteps = steps.map((step) => step.replace(/<[^>]+>/g, ''));
            // convert the string array of steps to a single string
            const speech = new SpeechSynthesisUtterance(cleanedSteps.join('. '));
            // show the steps in the console
            console.log(speech);
            // set lang
            speech.lang = 'en-US';
            speech.rate = 0.85;
            // speak
            window.speechSynthesis.speak(speech);
            setSpeaking(true);
        } else {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    };

    return (
        steps.length > 0 && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
            <div className="flex justify-between mb-4 text-sm text-gray-600">
                    <Label className="text-xl text-black">
                        {distance && duration
                            ? `${distance} - ${duration}`
                            : "Read directions aloud:"
                        }
                    </Label>
                <VolumeUp className={'text-3xl text-left'} onClick={handleTTS} />
            </div>
            <ol className="list-decimal list-inside space-y-2">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="text-sm font-trade border-b border-gray-100 pb-2 last:border-0"
                        dangerouslySetInnerHTML={{ __html: step }}
                    />
                ))}
            </ol>
        </div>)
    );
}

export default TextDirections;
