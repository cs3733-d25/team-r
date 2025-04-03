import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
var PriorityRequest = function (_a) {
    var selectedValue = _a.selectedValue, onChange = _a.onChange;
    return (_jsxs("div", { className: "flex items-center space-x-7", children: [_jsx("label", { className: "block", children: "Select the Priority Level (1 being least, 5 being highest priority) :" }), Array.from({ length: 5 }, function (_, i) { return (_jsxs("label", { className: "flex items-center space-x-1", children: [_jsx("input", { type: "radio", name: "priority", value: String(i + 1), checked: selectedValue === String(i + 1), onChange: function (e) { return onChange(e.target.value); } }), _jsx("span", { children: i + 1 })] }, i + 1)); })] }));
};
export default PriorityRequest;
