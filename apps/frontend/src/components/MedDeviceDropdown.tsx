import React, { useState } from 'react';

interface DropdownProps {
    selectedValue: string;
    onChange: (value: string) => void;
}


const Dropdown: React.FC<DropdownProps> = ({ selectedValue, onChange }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div className="flex items-center space-x-10">
            <label htmlFor="dropdown" className="block">
                Please select the Medical Device you would like to request:
            </label>
            <select
                id="dropdown"
                value={selectedValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onChange(e.target.value)}
                className="p-2 border rounded"
            >
                 {!isFocused && (
                    <option value="" disabled>
                        Select a device
                    </option>
                )}
                <option value="Defibrillator">Defibrillator</option>
                <option value="X-Ray Machine">X-Ray Machine</option>
                <option value="EKG Machine">EKG Machine</option>
            </select>
        </div>
    );
};

export default Dropdown;
