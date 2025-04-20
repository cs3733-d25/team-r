import {Label} from "@/components/ui/label.tsx";
import {HeadingLabel} from "@/components/ui/heading-label.tsx";

interface TextDirectionsProps {
    steps: string[];
    distance: string;
    duration: string;
}

function TextDirections({ steps, distance, duration }: TextDirectionsProps) {
    return (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
            {distance && duration && (
                <div className="mb-4 text-sm text-gray-600">
                    <Label>
                        {distance} - {duration}
                    </Label>
                </div>
            )}
            <ol className="list-decimal list-inside space-y-2">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="text-sm font-trade border-b border-gray-100 pb-2 last:border-0"
                        dangerouslySetInnerHTML={{ __html: step }}
                    />
                ))}
            </ol>
        </div>
    );
}

export default TextDirections;
