import React from "react";
import { AlertTriangle } from "lucide-react"; //Alert symbol similar to the wireframe

//Input any message for the disclaimer when it is called so it can be reused.
interface DisclaimerPopupProps {
    message: string;
}

const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ message }) => {
    return (
        <div className="fixed top-15 inset-x-0 mx-auto bg-white border border-gray-300 rounded-xl shadow-lg p-4 flex items-center max-w-md">
            <div className="text-red-600 mr-3">
                <AlertTriangle size={32} />
            </div>
            <div>
                <p className="font-bold text-red-600">Disclaimer:</p>
                <p className="text-sm text-gray-800">{message}</p>
            </div>
        </div>
    );
};

export default DisclaimerPopup;
