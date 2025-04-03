import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import MedDeviceDropdown from "./MedDeviceDropdown.tsx";
import PriorityRequest from "./PriorityRequest.tsx";
var DeviceReqForm = function () {
    var _a = useState(function () {
        return localStorage.getItem('dropdownValue') || '';
    }), selectDevice = _a[0], setSelectedValue = _a[1];
    var _b = useState(''), priority = _b[0], setPriority = _b[1];
    var _c = useState(null), formData = _c[0], setFormData = _c[1];
    var _d = useState(''), room = _d[0], setRoom = _d[1];
    var _e = useState(''), department = _e[0], setDepartment = _e[1];
    var _f = useState(''), comment = _f[0], setComment = _f[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        var timestamp = new Date().toLocaleString();
        var data = { selectDevice: selectDevice, priority: priority, room: room, department: department, timestamp: timestamp, comment: comment };
        setFormData(data);
        setRoom('');
        setDepartment('');
        setComment('');
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Medical Device Request" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsx(MedDeviceDropdown, { selectedValue: selectDevice, onChange: setSelectedValue }), _jsx(PriorityRequest, { selectedValue: priority, onChange: setPriority }), _jsxs("label", { className: "block", children: ["Room:", _jsx("input", { type: "text", value: room, onChange: function (e) { return setRoom(e.target.value); }, className: "border p-1 rounded w-full", required: true })] }), _jsxs("label", { className: "block", children: ["Department:", _jsx("input", { type: "text", value: department, onChange: function (e) { return setDepartment(e.target.value); }, className: "border p-1 rounded w-full", required: true })] }), _jsxs("label", { className: "block", children: ["Additional Comment(s):", _jsx("input", { type: "text", value: comment, onChange: function (e) { return setComment(e.target.value); }, className: "border p-1 rounded w-full", required: true })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded hover:bg-blue-600", children: "Submit" })] }), formData && (_jsxs("div", { className: "mt-4 p-2 border rounded bg-gray-100", children: [_jsxs("h3", { className: "text-lg font-semibold", children: ["Submitted Device Request For: ", formData.selectDevice] }), _jsxs("p", { children: ["Priority Level: ", formData.priority] }), _jsxs("p", { children: ["Room: ", formData.room] }), _jsxs("p", { children: ["Department: ", formData.department] }), _jsxs("p", { children: ["Request sent at: ", formData.timestamp] }), _jsxs("p", { children: ["Comment(s): ", formData.comment] })] }))] }));
};
export default DeviceReqForm;
