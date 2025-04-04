import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
// ExampleButton component definition
var ExampleButton = function (_a) {
    var onClick = _a.onClick, children = _a.children, variant = _a.variant, disabled = _a.disabled;
    return (_jsx("button", { className: "flex-1 ".concat(variant == 'primary' ? ' bg-blue-600 hover:bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800', " font-semibold py-2 px-4 rounded border border-gray-400"), onClick: onClick, disabled: disabled, children: children }));
};
// Export the component so it can be used in other files
export default ExampleButton;
