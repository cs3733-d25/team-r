import React, { useState } from 'react';
import axios from 'axios';
import {Department, RequestPriority} from "../RequestEnums.tsx";
import Navbar from '../../components/Navbar.tsx';
import { Link } from 'react-router-dom';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {DropdownMenu, DropdownMenuItem} from "@/components/ui/dropdown-menu.tsx";


// Simple interface for submitted request
interface SubmittedTransport {
    userID: string;  //PK
    currentBuilding : string;  //FK
    desiredBuilding : string;
    transportationType: string; //radio?

    priority: RequestPriority;
    department: Department;
    comments: string;
    timestamp: string;

}


const TransportationRequestForm = () => {
    const [formData, setFormData] = useState({
        userID: '',
        currentBuilding : '',
        desiredBuilding : '',
        transportationType: '',

        priority: RequestPriority.medium,
        department: Department.AMBULATORY_URGENCARE,
        // room: '',
        comments: '',

    });

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    // Add state for the confirmation card
    const [submittedTransport, setSubmittedTransport] = useState<SubmittedTransport | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('/api/transport-request', {
                ...formData,
                priority: formData.priority.toString()
            });

            if (response.status === 200) {
                // Store the request data for the confirmation card
                setSubmittedTransport({
                    ...formData,
                    timestamp: new Date().toLocaleString()
                });

                setSubmitStatus({
                    message: 'Patient Transport request submitted successfully!',
                    isError: false
                });

                // Reset form
                setFormData({
                    userID: '',
                    currentBuilding : '',
                    desiredBuilding : '',
                    transportationType: '',
                    comments: '',
                    priority: RequestPriority.medium,
                    department: Department.AMBULATORY_URGENCARE,
                });
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setSubmitStatus({
                message: 'Failed to submit request. Please try again.',
                isError: true
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Transportation Request System</h1>
                <h2>Made by Alex Lowczyk and Joshua Gifford</h2>

                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700 border border-red-700">
                        {submitStatus.message}
                    </div>
                )}

                {/* Confirmation Card */}
                {submittedTransport && !submitStatus?.isError && (
                    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border-2 border-mgb-light-blue-500">
                        <div className="bg-mgb-light-blue-500 text-white font-bold px-4 py-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Request Confirmation
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Your transportation request has been submitted</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Transportation Type:</span> {submittedTransport.transportationType}
                                </div>
                                <div>
                                    <span className="font-semibold">Priority:</span> {submittedTransport.priority}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span> {submittedTransport.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Current Building:</span> {submittedTransport.currentBuilding}
                                </div>
                                <div>
                                    <span className="font-semibold">Desired Building:</span> {submittedTransport.desiredBuilding}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Comments:</span> {submittedTransport.comments || "None provided"}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Submitted:</span> {submittedTransport.timestamp}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                A staff member will be assigned to handle your request based on priority.
                            </div>
                            <button
                                onClick={() => setSubmittedTransport(null)}
                                className="mt-4 px-4 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}
                <Link
                    key={'Transportation Request Page'}
                    to={'/transportpage'}
                    className={"px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"}
                >
                    See All Requests
                </Link>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Transportation Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Transportation Type
                                        <span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-500 block">
                      e.g., Ambulance, Helicopter, etc
                    </span>
                                    </label>
                                    <RadioGroup
                                        name="transportType"
                                        value={formData.transportationType}
                                        <RadioGroupItem>
                                    >Enter Transportation Type</RadioGroup>
                                < /div>

                                {/* Priority */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Priority Level
                                        <span className="text-xs text-gray-500 block">
                      URGENT: Immediate attention required
                      <br />
                      HIGH: Within 1 hour
                      <br />
                      MEDIUM: Within 4 hours
                      <br />
                      LOW: Within 24 hours
                    </span>
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                    >
                                        {Object.values(RequestPriority).map(priority => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Department
                                        <span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-500 block">
                      Select the department requiring sanitation
                    </span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                    >
                                        {Object.values(Department).map(dept => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Room Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Current Building
                                        <span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-500 block">
                      Format: Floor-Room (e.g., 3-124, L1-001)
                    </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="room"
                                        value={formData.currentBuilding}
                                        onChange={handleChange}
                                        placeholder="e.g., 3-124"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Comments */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Additional Comments
                                    <span className="text-xs text-gray-500 block">
                    Include any specific instructions or details about the sanitation request
                  </span>
                                </label>
                                <textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="e.g., Liquid spill near entrance, Biohazard materials present, Special cleaning instructions..."
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SanitationRequestForm;
