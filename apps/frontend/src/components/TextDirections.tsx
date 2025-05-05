import { Label } from '@/components/ui/label.tsx';
import {VolumeMute, VolumeUp} from 'react-bootstrap-icons';
import {useState} from "react";
import { Arrow90degLeft, Arrow90degRight, ArrowUp, ArrowDownUp } from 'react-bootstrap-icons';
import {displayInfo} from "@/features/MapView/DisplayInformation.tsx";


interface TextDirectionsProps {
    steps: string[];
    distance?: string;
    duration?: string;
    useMeters?: boolean;
    onUseMetersChange?: (useMeters: boolean) => void;
    isInternal?: boolean;
}

/**
 * TextDirections component - displays text directions for internal and external maps, allows for TTS
 * @param steps - array of text directions
 * @param distance - distance of the route (optional)
 * @param duration - time it takes to travel (optional)
 * @param useMeters - whether to display distances in meters
 * @param onUseMetersChange - callback to toggle the use of meters vs feet
 * @param isInternal - is internal directions or not
 * @constructor
 */
function TextDirections({ steps, distance, duration, useMeters, onUseMetersChange, isInternal}: TextDirectionsProps) {
    const [speaking, setSpeaking] = useState<boolean>(false);
    //const [useMeters, setUseMeters] = useState<boolean>(false);
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
        if (lowerText.includes('up') || lowerText.includes('down')) {
            return <ArrowDownUp className="w-5 h-5" />;
        }
        else{
            return null;
        }
    };


    return (
        steps.length > 0 && (
        <div className="absolute top-4 right-4 bg-white dark:bg-background rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
            <div className="flex justify-between mb-4 text-sm text-gray-600">
                <Label className="font-bold text-xl text-black dark:text-white">
                    {isInternal ? "Directions" : `${distance} - ${duration}`}
                </Label>

                <div className="flex items-center gap-4">
                    {isInternal && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Feet</span>
                        {displayInfo(
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={useMeters}
                                onChange={() => onUseMetersChange?.(!useMeters)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>,
                        "Click on this button to switch between feet and meters in text directions.")}
                        <span className="text-sm font-medium">Meters</span>
                    </div>)}
                {displayInfo(
                    speaking ? (
                        <VolumeUp className={'text-3xl text-left'} onClick={handleTTS} />
                    ) : (
                        <VolumeMute className={'text-3xl text-left'} onClick={handleTTS} />
                    ),
                    "Click on this button to toggle text-to-speech directions."
                )}
              </div>
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
