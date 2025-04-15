import { useState } from 'react';
import { Department, RequestPriority } from '../RequestEnums.tsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavbarMGH } from '@/components/NavbarMGH.tsx';

interface SubmittedDevice {
    device: string;
    priority: string;
    room: string;
    department: string;
    comment: string;
    timestamp: string;
}

export const DeviceReqForm = () => {
    const [formData, setFormData] = useState({
        device: '',
        priority: '',
        room: '',
        department: '',
        comment: '',
    });

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //submittedDevice holds info for confirmation card
    const [submittedDevice, setSubmittedDevice] = useState<SubmittedDevice | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('api/device', {
                ...formData,
                priority: formData.priority.toString(),
            });

            if (response.status === 200) {
                setSubmittedDevice({
                    ...formData,
                    timestamp: new Date().toLocaleString(),
                });

                setSubmitStatus({
                    message: 'Device request submitted successfully!',
                    isError: false,
                });

                setFormData({
                    device: '',
                    priority: '',
                    room: '',
                    department: '',
                    comment: '',
                });
            }
        } catch (error) {
            console.error('Error submitting request', error);
            setSubmitStatus({
                message: 'Failed to submit request. Please try again.',
                isError: true,
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <NavbarMGH />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-0">Medical Device Request System</h1>
                <h2 className="text-xl font-bold mb-6">Owen Miller & Keagan Hitt</h2>
                <Link
                    key={'Device Request Page'}
                    to={'/devicerequestpage'}
                    className={
                        'px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200'
                    }
                >
                    See All Requests
                </Link>
                <br />
                <br />
                <div className="bg-secondary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-foreground">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Device Select */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Select a Device
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <select
                                        name="device"
                                        value={formData.device}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 bg-input"
                                    >
                                        {Object.values(RequestPriority).map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Priority */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Priority Level
                                        <span className="text-xs text-secondary-foreground block">
                                            EMERGENCY: Immediate attention required
                                            <br />
                                            HIGH: Within 1 hour
                                            <br />
                                            MEDIUM: Within 4 hours
                                            <br />
                                            LOW: Within 24 hours
                                        </span>
                                    </Label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 bg-input"
                                    >
                                        {Object.values(RequestPriority).map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Room Name */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Room
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Enter the name of the room to send the device to.
                                        </span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="room"
                                        value={formData.room}
                                        onChange={handleChange}
                                        placeholder="Enter the name of the room to send the device to."
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Department */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Department
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Select the department making the device request.
                                        </span>
                                    </Label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 bg-input"
                                    >
                                        {Object.values(Department).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Comments */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Comments
                                        <span className="text-xs text-secondary-foreground block">
                                            Include any additional comments about the device request here.
                                        </span>
                                    </Label>
                                    <textarea
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        placeholder="Include any additional comments about the device request here."
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200"
                                >
                                    Submit Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <Alert className="mb-4 p-4 rounded-md bg-accent border border-accent-foreground">
                        <AlertDescription className={'text-accent-foreground'}>
                            {submitStatus.message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Confirmation Card */}
                {submittedDevice && !submitStatus?.isError && (
                    <div className="mb-6 bg-background rounded-lg shadow-md overflow-hidden border-2 border-secondary">
                        <div className="bg-secondary text-secondary-foreground font-bold px-4 py-2 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Request Confirmation
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Your device request has been submitted
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Device:</span>{' '}
                                    {submittedDevice.device}
                                </div>
                                <div>
                                    <span className="font-semibold">Priority:</span>{' '}
                                    {submittedDevice.priority}
                                </div>
                                <div>
                                    <span className="font-semibold">Room:</span>{' '}
                                    {submittedDevice.room}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span>{' '}
                                    {submittedDevice.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Comment:</span>{' '}
                                    {submittedDevice.comment}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                The device request has been submitted and will be filled.
                            </div>
                            <button
                                onClick={() => setSubmittedDevice(null)}
                                className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
