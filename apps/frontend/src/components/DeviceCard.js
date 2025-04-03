import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
var DeviceCard = function (_a) {
    var deviceType = _a.deviceType, totalCount = _a.totalCount, availableCount = _a.availableCount, onRequest = _a.onRequest;
    var availabilityPercentage = Math.round((availableCount / totalCount) * 100);
    var statusColor = 'bg-green-500';
    if (availabilityPercentage < 30) {
        statusColor = 'bg-red-500';
    }
    else if (availabilityPercentage < 60) {
        statusColor = 'bg-yellow-500';
    }
    return (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: deviceType }), _jsx("div", { className: "w-4 h-4 rounded-full ".concat(statusColor) })] }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex justify-between text-sm text-gray-600 mb-1", children: [_jsx("span", { children: "Availability" }), _jsxs("span", { children: [availableCount, " of ", totalCount] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: "h-2.5 rounded-full ".concat(statusColor), style: { width: "".concat(availabilityPercentage, "%") } }) })] }), _jsx("button", { onClick: onRequest, disabled: availableCount === 0, className: "w-full py-2 px-4 rounded-md text-white font-medium ".concat(availableCount > 0
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'), children: availableCount > 0 ? 'Request Device' : 'Currently Unavailable' })] }) }));
};
export default DeviceCard;
