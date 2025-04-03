import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import DeviceCard from './DeviceCard';
import RequestDeviceModal from './RequestDeviceModal';
var DeviceTypesList = function () {
    var _a = useState([]), deviceTypes = _a[0], setDeviceTypes = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), selectedDeviceType = _c[0], setSelectedDeviceType = _c[1];
    var _d = useState(false), showRequestModal = _d[0], setShowRequestModal = _d[1];
    useEffect(function () {
        // for now we are just throwing in data that we are just throwing in
        //
        var mockDeviceTypes = [
            { type: 'ECG Monitor', count: 15, availableCount: 8 },
            { type: 'Ventilator', count: 10, availableCount: 4 },
            { type: 'Infusion Pump', count: 25, availableCount: 12 },
            { type: 'Defibrillator', count: 8, availableCount: 5 },
            { type: 'Patient Monitor', count: 20, availableCount: 7 },
            { type: 'Oxygen Concentrator', count: 12, availableCount: 3 },
        ];
        setTimeout(function () {
            setDeviceTypes(mockDeviceTypes);
            setLoading(false);
        }, 800); // for funseys here's a network delay  idk I was bored
    }, []);
    var handleRequestDevice = function (deviceType) {
        setSelectedDeviceType(deviceType);
        setShowRequestModal(true);
    };
    return (_jsx("div", { children: loading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: deviceTypes.map(function (device) { return (_jsx(DeviceCard, { deviceType: device.type, totalCount: device.count, availableCount: device.availableCount, onRequest: function () { return handleRequestDevice(device.type); } }, device.type)); }) }), showRequestModal && selectedDeviceType && (_jsx(RequestDeviceModal, { deviceType: selectedDeviceType, onClose: function () { return setShowRequestModal(false); }, onSubmit: function (data) {
                        console.log('Request submitted:', data);
                        setShowRequestModal(false);
                    } }))] })) }));
};
export default DeviceTypesList;
