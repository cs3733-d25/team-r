import React, { useState } from 'react';
import MedDeviceDropdown from "./MedDeviceDropdown.tsx";
import PriorityRequest from "./PriorityRequest.tsx";

interface DeviceRequest {
    selectDevice: string;
    priority: string;
    room: string;
    department: string;
    timestamp: string;
    comment: string;
}

const DeviceReqForm: React.FC = () => {
    const [selectDevice, setSelectedValue] = useState<string>(() => {
        return localStorage.getItem('dropdownValue') || '';
    });
    const [priority, setPriority] = useState('');
    const [formData, setFormData] = useState<DeviceRequest | null>(null);
    const [room, setRoom] = useState('');
    const [department, setDepartment] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString();
        const data: DeviceRequest = { selectDevice, priority, room, department, timestamp, comment };
        setFormData(data);
        setRoom('');
        setDepartment('');
        setComment('');
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Medical Device Request</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <MedDeviceDropdown selectedValue={selectDevice} onChange={setSelectedValue}/>
                <PriorityRequest selectedValue={priority} onChange={setPriority}/>
                <label className="block">
                    Room:
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="border p-1 rounded w-full"
                        required
                    />
                </label>
                <label className="block">
                    Department:
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="border p-1 rounded w-full"
                        required
                    />
                </label>
                <label className="block">
                    Additional Comment(s):
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border p-1 rounded w-full"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {formData && (
                <div className="mt-4 p-2 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Submitted Device Request For: {formData.selectDevice}</h3>
                    <p>Priority Level: {formData.priority}</p>
                    <p>Room: {formData.room}</p>
                    <p>Department: {formData.department}</p>
                    <p>Request sent at: {formData.timestamp}</p>
                    <p>Comment(s): {formData.comment}</p>
                </div>
            )}
        </div>
    );
};

export default DeviceReqForm;
