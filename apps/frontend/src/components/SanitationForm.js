import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
var SanitationForm = function () {
    var _a = useState(null), formData = _a[0], setFormData = _a[1];
    var _b = useState(''), room = _b[0], setRoom = _b[1];
    var _c = useState(''), department = _c[0], setDepartment = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var timestamp = new Date().toLocaleString();
        var data = { room: room, department: department, timestamp: timestamp };
        setFormData(data);
        setRoom('');
        setDepartment('');
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Sanitation Service Request" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsxs("label", { className: "block", children: ["Room:", _jsx("input", { type: "text", value: room, onChange: function (e) { return setRoom(e.target.value); }, className: "border p-1 rounded w-full", required: true })] }), _jsxs("label", { className: "block", children: ["Department:", _jsx("input", { type: "text", value: department, onChange: function (e) { return setDepartment(e.target.value); }, className: "border p-1 rounded w-full", required: true })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600", children: "Submit" })] }), formData && (_jsxs("div", { className: "mt-4 p-2 border rounded bg-gray-100", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Submitted Sanitation Request For:" }), _jsxs("p", { children: ["Room: ", formData.room] }), _jsxs("p", { children: ["Department: ", formData.department] }), _jsxs("p", { children: ["Timestamp: ", formData.timestamp] })] }))] }));
};
export default SanitationForm;
