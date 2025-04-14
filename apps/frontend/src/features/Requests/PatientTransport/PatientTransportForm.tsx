import React, { useState } from 'react';
import axios from 'axios';
import {Department, RequestPriority} from "../RequestEnums.tsx";
import {NavbarMGH} from '../../../components/NavbarMGH.tsx';
import { Link } from 'react-router-dom';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea";

enum Building {
    PATRIOT_PLACE_22 = "Patriot_Place_22",
    PATRIOT_PLACE_20 = "Patriot_Place_20",
    CHESTNUT_HILL = "Chestnut_hill"
}

// Simple interface for submitted request
interface SubmittedTransport {
    userID: string;  //PK
    currentBuilding : Building;  //FK
    desiredBuilding : Building;
    transportationType: string; //radio?

    priority: RequestPriority;
    department: Department;
    comments: string;
    timestamp: string;

}


const TransportationRequestForm = () => {
    const [formData, setFormData] = useState({
        userID: '',
        currentBuilding :"Patriot_Place_22" ,
        desiredBuilding : "Patriot_Place_20",
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
                    currentBuilding :"Patriot_Place_22" ,
                    desiredBuilding : "Patriot_Place_20",
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
            <NavbarMGH />
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
                                Your transportation request has been submitted
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Transportation Type:</span>{' '}
                                    {submittedTransport.transportationType}
                                </div>
                                <div>
                                    <span className="font-semibold">Priority:</span>{' '}
                                    {submittedTransport.priority}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span>{' '}
                                    {submittedTransport.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Current Building:</span>{' '}
                                    {submittedTransport.currentBuilding}
                                </div>
                                <div>
                                    <span className="font-semibold">Desired Building:</span>{' '}
                                    {submittedTransport.desiredBuilding}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Comments:</span>{' '}
                                    {submittedTransport.comments || 'None provided'}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Submitted:</span>{' '}
                                    {submittedTransport.timestamp}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                A staff member will be assigned to handle your request based on
                                priority.
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
                    className={
                        'px-6 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200'
                    }
                >
                    See All Requests
                </Link>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Transportation Type */}
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Transportation Type
                                    <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-500 block">
                                        e.g., Ambulance, Helicopter, etc
                                    </span>
                                </Label>
                                <RadioGroup>
                                    <RadioGroupItem value="non-emergency ambulance" id="non-emergency ambulance" />
                                    <Label htmlFor="ambulance">Non Emergency Ambulance</Label>
                                    <RadioGroupItem value="emergency ambulance" id="emergency ambulance" />
                                    <Label htmlFor="ambulance">Emergency Ambulance</Label>
                                    <RadioGroupItem value="helicopter" id="helicopter" />
                                    <Label htmlFor="helicopter">Helicopter</Label>


                                </RadioGroup>


                                {/* Priority */}
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                    </Label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={ handleChange}
                                    >
                                        {Object.values(RequestPriority).map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Department */}
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Department
                                        <span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-500 block">
                                            Select the department requiring transportation
                                        </span>
                                    </Label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={ handleChange}
                                    >
                                        {Object.values(Department).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Current Building */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Current Building
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="currentBuilding"
                                        value={formData.currentBuilding}
                                        onChange={ handleChange}
                                    >
                                        {Object.values(Building).map((build) => (
                                            <option key={build} value={build}>
                                                {build}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Desired Building
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="desiredBuilding"
                                        value={formData.desiredBuilding}
                                        onChange={ handleChange}
                                    >
                                        {Object.values(Building).map((build) => (
                                            <option key={build} value={build}>
                                                {build}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Comments */}
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Additional Comments
                                    <span className="text-xs text-gray-500 block">
                                        Include any specific instructions or details about the
                                        transport request
                                    </span>
                                </Label>
                                <Textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    placeholder="e.g., Liquid spill near entrance, Biohazard materials present, Special cleaning instructions..."
                                    rows={4}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                   variant="default"
                                >
                                    Submit Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransportationRequestForm;
