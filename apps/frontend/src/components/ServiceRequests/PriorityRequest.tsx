import React from 'react';

interface PriorityProps{
    selectedValue: string;
    onChange: (value: string) => void;
}

const PriorityRequest: React.FC<PriorityProps> = ({ selectedValue, onChange}) => {
    return (
        <div className="flex items-center space-x-7">
            <label className="block">
                Select the Priority Level (1 being least, 5 being highest priority) :
            </label>
            {Array.from({ length: 5 }, (_, i) => (
                <label key={i + 1} className="flex items-center space-x-1">
                    <input
                    type="radio"
                    name="priority"
                    value={String(i + 1)}
                    checked={selectedValue === String(i + 1)}
                    onChange={(e) => onChange(e.target.value)}
                    />
                    <span>{i + 1}</span>
                </label>
            ))}
        </div>
    );
};

export default PriorityRequest;