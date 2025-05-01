import { Label } from '@/components/ui/label.tsx';
import {VolumeMute, VolumeUp} from 'react-bootstrap-icons';
import {useState} from "react";
import { Arrow90degLeft, Arrow90degRight, ArrowUp } from 'react-bootstrap-icons';
import {displayInfo} from "@/features/MapView/DisplayInformation.tsx";

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
     * does both internal and external maps
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

    const getDirectionIcon = (text:string)=>{
        const lowerText = text.toLowerCase();
        if (lowerText.includes('left')) {
            return <Arrow90degLeft className="w-5 h-5" />;
        }
        if (lowerText.includes('right')) {
            return <Arrow90degRight className="w-5 h-5" />;
        }
        if (lowerText.includes('straight')) {
            return <ArrowUp className="w-5 h-5" />;
        }
        else{
            return null;
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
                {displayInfo(
                    speaking ? (
                        <VolumeUp className={'text-3xl text-left'} onClick={handleTTS} />
                    ) : (
                        <VolumeMute className={'text-3xl text-left'} onClick={handleTTS} />
                    ),
                    "Click on this button to toggle text-to-speech directions."
                )}
            </div>
            <ol className="list-decimal list-inside space-y-2">
                {steps.map((step, index) => {
                    const icon = getDirectionIcon(step.replace(/<[^>]+>/g, ''));

                    return (
                        <li
                            key={index}
                            className="flex items-center gap-2 text-sm font-trade border-b border-gray-100 pb-2 last:border-0"
                        >
                            {icon && <span className="flex-shrink-0">{icon}</span>}
                            <span dangerouslySetInnerHTML={{ __html: step }} />
                        </li>
                    );
                })}
            </ol>
        </div>)
    );
}

export default TextDirections;
