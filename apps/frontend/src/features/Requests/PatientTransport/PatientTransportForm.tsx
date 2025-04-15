import React, { useState } from 'react';
import axios from 'axios';
import {Department, RequestPriority, Buildings} from "../RequestEnums.tsx";
import {NavbarMGH} from '../../../components/NavbarMGH.tsx';
import { Link } from 'react-router-dom';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input.tsx";


// Simple interface for submitted request
interface SubmittedTransport {
    patientID: string;  //PK
    employeeID: string;
    employeeName: string;
    currentBuilding : Buildings | string;  //FK
    desiredBuilding : Buildings | string;
    transportationType: string; //radio?

    priority: RequestPriority |string;
    department: Department | string;
    comments: string;
    timestamp: string;

}


const TransportationRequestForm = () => {
    const [formData, setFormData] = useState({
        patientID: '',
        employeeID: '',
        employeeName: '',
        currentBuilding :"",
        desiredBuilding : "",
        transportationType: '',
        priority: "",
        department: "",
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
            const response = await axios.post('/api/transportreq/', {
                ...formData,
                priority: formData.priority.toString()
            });
            console.log('message is here')
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
                    patientID: '',
                    employeeName:'',
                    employeeID: '',
                    currentBuilding :"",
                    desiredBuilding : "",
                    transportationType: '',
                    comments: '',
                    priority: "",
                    department: "",
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
                <h1 className="text-2xl font-bold mb-0">Transport Request System</h1>
                <h2 className="text-xl font-bold mb-6">Alex Lowczyk & Joshua Gifford</h2>

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
                                    <span className="font-semibold">Employee Name:</span>{' '}
                                    {submittedTransport.employeeName}
                                </div>
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
                <div className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-foreground mt-3">
                    <div className="p-15">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div >
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Employee Name
                                    <span className="text-accent">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="employeeID"
                                    value={formData.employeeID}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 rounded-md border border-border"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Patient ID
                                    <span className="text-accent">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="patientID"
                                    value={formData.patientID}
                                    onChange={handleChange}
                                    placeholder="Enter patient ID"
                                    className="w-full px-4 py-2 rounded-md border border-border"
                                    required
                                />
                            </div>
                            </div>
                            {/* Transportation Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Transportation Type
                                    <span className="text-accent">*</span>
                                    <span className="text-xs block">
                                        e.g., Ambulance, Helicopter, etc
                                    </span>
                                </Label>
                                <RadioGroup defaultValue={"non-emergency ambulance" }>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="non-emergency ambulance" id="non-emergency ambulance"  />
                                        <Label htmlFor="non-emergency ambulance" >Non-Emergency Ambulance</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="emergency ambulance"  id="emergency ambulance"  />
                                        <Label htmlFor="emergency ambulance" >Emergency Ambulance</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 pb-5">
                                        <RadioGroupItem value="helicopter"  id="helicopter"  />
                                        <Label htmlFor="helicopter" >Helicopter</Label>
                                    </div>
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
                                        <option value="" disabled hidden>Select Priority</option>
                                        {Object.values(RequestPriority).map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                                {/* Department */}
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Department
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-gray-500 block">
                                            Select the department requiring transportation
                                        </span>
                                    </Label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={ handleChange}
                                    >
                                        <option value="" disabled hidden>Select Department</option>
                                        {Object.values(Department).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Current Building */}
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Current Building
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <select
                                        name="currentBuilding"
                                        value={formData.currentBuilding}
                                        onChange={ handleChange}

                                    >

                                        {Object.values(Buildings).map((build : Buildings) =>
                                        {
                                            const differentBuild = (build != formData.desiredBuilding);
                                            return(
                                                <>
                                                    <option value="" disabled hidden>Select Current Building</option>
                                                    { differentBuild?<option key={build} value={build}>
                                                        {build}
                                                    </option>:null}

                                                </>
                                            );

                                        })}
                                    </select>
                                </div>
                                <div>
                                    <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Desired Building
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <select
                                        name="desiredBuilding"
                                        value={formData.desiredBuilding}
                                        onChange={ handleChange}
                                    >

                                        {Object.values(Buildings).map((build : Buildings) =>
                                        {
                                            const differentBuild = build !== formData.currentBuilding;
                                            return(
                                                <>
                                                    <option value="" disabled hidden>Select Desired Building</option>
                                                    { differentBuild?<option key={build} value={build}>
                                                        {build}
                                                    </option>:null}

                                                </>
                                            );

                                        })}

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
