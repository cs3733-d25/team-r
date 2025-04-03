import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
var Dropdown = function (_a) {
    var selectedValue = _a.selectedValue, onChange = _a.onChange;
    var _b = useState(false), isFocused = _b[0], setIsFocused = _b[1];
    return (_jsxs("div", { className: "flex items-center space-x-10", children: [_jsx("label", { htmlFor: "dropdown", className: "block", children: "Please select the Medical Device you would like to request:" }), _jsxs("select", { id: "dropdown", value: selectedValue, onFocus: function () { return setIsFocused(true); }, onBlur: function () { return setIsFocused(false); }, onChange: function (e) { return onChange(e.target.value); }, className: "p-2 border rounded", children: [!isFocused && (_jsx("option", { value: "", disabled: true, children: "Select a device" })), _jsx("option", { value: "Defibrillator", children: "Defibrillator" }), _jsx("option", { value: "X-Ray Machine", children: "X-Ray Machine" }), _jsx("option", { value: "EKG Machine", children: "EKG Machine" })] })] }));
};
export default Dropdown;
