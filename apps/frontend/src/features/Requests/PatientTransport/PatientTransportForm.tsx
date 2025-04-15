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
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';


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
        priority: "",
        department: "",
        comments: '',
        transportationType:'',

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
                    comments: '',
                    priority: "",
                    department: "",
                    transportationType:'',
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
            <div className="p-6 max-w-7xl mx-auto">

                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <Alert className="mb-4 p-4 rounded-md bg-accent border border-accent-foreground">
                       <AlertDescription className={'text-accent-foreground'}>
                        {submitStatus.message}
                       </AlertDescription>
                    </Alert>
                )}

                {/* Confirmation Card */}
                {submittedTransport && !submitStatus?.isError && (
                    <div  className="mb-6 bg-background rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
                        <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
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
                                    <span className="font-semibold">Employee ID:</span>{' '}
                                    {submittedTransport.employeeID}
                                </div>
                                <div>
                                    <span className="font-semibold">Patient ID:</span>{' '}
                                    {submittedTransport.patientID}
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
                <div className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-primary mt-3">
                    <div className="p-15">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div >
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Employee ID
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
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Transportation Type
                                    <span className="text-accent">*</span>
                                    <span className="text-xs text-gray-500 block">
                                       e.g., Ambulance, Helicopter, etc
                                   </span>

                                    <RadioGroup name = "transportationType" value = {formData.transportationType} onValueChange={(value)=>setFormData((prev)=>({...prev,transportationType: value}))}>
                                        <div className="flex items-center space-x-2 space-y-2">
                                            <RadioGroupItem value="Non-Emergency Ambulance" id="Non-EmergencyAmbulance" />
                                            <Label htmlFor="Non-EmergencyAmbulance">Non-Emergency Ambulance</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 space y-2">
                                            <RadioGroupItem value="Emergency Ambulance" id="EmergencyAmbulance" />
                                            <Label htmlFor="EmergencyAmbulance">Emergency Ambulance</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 space y-2">
                                            <RadioGroupItem value="Helicopter" id="Helicopter" />
                                            <Label htmlFor="Helicopter">Helicopter</Label>
                                        </div>
                                    </RadioGroup>
                                </Label>
                                {/* Priority */}
                                <div >
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div >
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
                                    placeholder="e.g., Patient is agitated, Patient needs fragile transport etc"
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