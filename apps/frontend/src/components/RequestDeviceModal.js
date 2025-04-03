var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
var RequestDeviceModal = function (_a) {
    var deviceType = _a.deviceType, onClose = _a.onClose, onSubmit = _a.onSubmit;
    var _b = useState({
        deviceType: deviceType,
        priority: 'medium',
        deliveryLocation: '',
        deliveryDate: '',
        deliveryTime: '',
        comments: ''
    }), formData = _b[0], setFormData = _b[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        onSubmit(formData);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsx("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-md", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-800", children: ["Request ", deviceType] }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700", children: "\u2715" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-medium mb-1", children: "Priority" }), _jsxs("select", { name: "priority", value: formData.priority, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true, children: [_jsx("option", { value: "low", children: "Low" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "high", children: "High" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700 text-sm font-medium mb-1", children: "Delivery Location" }), _jsx("input", { type: "text", name: "deliveryLocation", value: formData.deliveryLocation, onChange: handleChange, placeholder: "e.g., Room 305, Building B", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm font-medium mb-1", children: "Delivery Date" }), _jsx("input", { type: "date", name: "deliveryDate", value: formData.deliveryDate, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 text-sm font-medium mb-1", children: "Delivery Time" }), _jsx("input", { type: "time", name: "deliveryTime", value: formData.deliveryTime, onChange: handleChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-gray-700 text-sm font-medium mb-1", children: "Additional Comments" }), _jsx("textarea", { name: "comments", value: formData.comments, onChange: handleChange, rows: 3, placeholder: "Any special instructions or requirements", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Submit Request" })] })] })] }) }) }));
};
export default RequestDeviceModal;
