import React, { useState } from 'react';
import { ExclamationTriangle, X } from 'react-bootstrap-icons';

//Input any message for the disclaimer when it is called so it can be reused.
interface DisclaimerPopupProps {
    message: string;
}

const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return null; // Don't render the popup if it's not visible
    }

    return (
        <div className="fixed top-20 inset-x-0 mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-4 flex items-center w-1/2 z-50">
            <div className="text-red-600 mr-3 animate-flash">
                <ExclamationTriangle size={64} />
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-red-600">Disclaimer:</p>
                    <X className="relative -top-1 text-2xl cursor-pointer" onClick={() => setIsVisible(false)} />
                </div>
                <p className="text-sm text-gray-800">{message}</p>
            </div>
        </div>
    );
};

export default DisclaimerPopup;
