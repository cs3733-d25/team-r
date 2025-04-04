import React, { useState } from 'react';

interface SanitationRequest {
    room: string;
    department: string;
    timestamp: string;
}

const SanitationForm: React.FC = () => {
    const [formData, setFormData] = useState<SanitationRequest | null>(null);
    const [room, setRoom] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleString();
        const data: SanitationRequest = { room, department, timestamp };
        setFormData(data);
        setRoom('');
        setDepartment('');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Sanitation Service Request</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {formData && (
                <div className="mt-4 p-2 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Submitted Sanitation Request For:</h3>
                    <p>Room: {formData.room}</p>
                    <p>Department: {formData.department}</p>
                    <p>Timestamp: {formData.timestamp}</p>
                </div>
            )}
        </div>
    );
};

export default SanitationForm;
