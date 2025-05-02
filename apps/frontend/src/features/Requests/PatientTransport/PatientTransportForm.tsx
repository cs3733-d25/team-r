import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input.tsx";
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";
import {ErrorCard} from "@/components/ServiceRequests/ErrorCard.tsx";
import {useAuth0} from "@auth0/auth0-react";

// Simple interface for submitted request
interface SubmittedTransport {
    patientID: string;  //PK
    employeeName: string;
    currentBuilding : string;  //FK
    desiredBuilding : string;
    transportationType: string; //radio?

    priority: string;
    department: string;
    comments: string;
    timestamp: string;
    assignedEmployee: string;
}


const TransportationRequestForm = () => {
    const [formData, setFormData] = useState({
        patientID: '',
        employeeName: '',
        currentBuilding :'',
        desiredBuilding : '',
        priority: '',
        department: '',
        comments: '',
        transportationType:'',
        assignedEmployee:'',
    });
    const [userName, setUserName] = useState('');
    const {user} = useAuth0();

    //get the username from the database
    useEffect(() => {
        async function getEmployeeName(){
            const userName = await axios.post('/api/login/userInfo',
                {email: user!.email});
            setUserName(userName.data.firstName);
        }
        getEmployeeName();
    }, [user]);

    //set the form data with the username from the database
    useEffect(() => {
        if (userName) {
            setFormData(prev => ({
                ...prev,
                employeeName: userName
            }));
        }
    }, [userName]);


    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //put this in Dropdown element and it will reset on submit
    const [resetDropdowns, setResetDropdowns] = useState(false); //swaps value to trigger
    const [resetDept, setResetDept] = useState(false); //swaps value for resetting dept
    const [resetDesiredBuilding, setResetDesiredBuilding] = useState(false); //swaps value for desired building


    useEffect(() => {
        console.log("RESET is changed to: ", resetDropdowns)
    }, [resetDropdowns])

    useEffect(() => {
        console.log("RESET Department changed to: ", resetDept)
    }, [resetDept])

    useEffect(() => {
        console.log("RESET Desired Building changed to: ", resetDesiredBuilding)
    }, [resetDesiredBuilding])


    const handleDropdownChange = (name:string, value:string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //helper function for dept
    const renderDepartmentDropdown = () => {
        switch (selectedLocation) {
            case "Healthcare Center (22 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP22" fieldName="department" onChange={handleDepartmentChange} reset={resetDept} />;
            case "Healthcare Center (20 Patriot Pl.)":
                return <Dropdown tableName="departmentsPP20" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
            case "Healthcare Center (Chestnut Hill)":
                return <Dropdown tableName="departmentsCH" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
            case "Faulkner Hospital":
                return <Dropdown tableName="departmentsFAll" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
            case "Main Campus Hospital (75 Francis St.)":
                return <Dropdown tableName="departmentsWAll" fieldName="department" onChange={handleDepartmentChange} reset={resetDept}/>;
            default:
                return null;
        }
    };

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

                setResetDropdowns(!resetDropdowns); //swap state to reset
                setResetDept(!resetDept); //swap state to reset
                setResetDesiredBuilding(!resetDesiredBuilding); //swap state to reset

                // Reset form
                setFormData({
                    patientID: '',
                    employeeName: formData.employeeName,
                    currentBuilding :'',
                    desiredBuilding : '',
                    comments: '',
                    priority: '',
                    department: '',
                    transportationType:'',
                    assignedEmployee: ''
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
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedDesiredBuilding, setDesiredBuilding] = useState<string | null>(null);
    const [selectedDept, setDept] = useState<string | null>(null);


    //used by location dropdown so next dropdown can appear
    const handleLocationChange = (name: string, value: string) => {
        setSelectedLocation(value);
        handleDropdownChange(name, value); // update formData in parent
        console.log("LOCATION change function with name '" + name + "' and value '" + value + "'")
    };

    useEffect(() => { //WHEN location changes...
        console.log("Use Effect detected LOCATION change")
        setResetDept(!resetDept); //swap state to reset
        handleDepartmentChange('department', null);

        if (selectedDesiredBuilding === selectedLocation) {
            setResetDesiredBuilding(!resetDesiredBuilding);
            handleDesiredBuildingChange('department', null);

            console.log("Conflict in LOCATION change, DESIRED BUILDING is reset")
        }
    }, [selectedLocation]);

    const handleDesiredBuildingChange = (name: string, value: string | null) => {
        setDesiredBuilding(value);
        handleDropdownChange(name, value!); // update formData in parent
        console.log("DESIRED BUILDING change function with name '" + name + "' and value '" + value + "'")
    };

    const handleDepartmentChange = (name: string, value: string | null) => {
        setDept(value)
        handleDropdownChange(name, value!);// update formData in parent
    };

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className=" rounded-lg mt-3">
                    <div className="p-5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Patient ID
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            ID must be Patient's First Name.</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="patientID"
                                        value={formData.patientID}
                                        onChange={handleChange}
                                        placeholder="Enter patient ID"
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>
                                {/*assignEmployee*/}
                                <div>
                                    <Label className= "block text-sm font-semibold text-foreground mb-2">
                                        Assigned Employee
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                      Choose an employee to assign to a task
                    </span>
                                    </Label>
                                    <Dropdown customOptions={'employees'} onChange={handleDropdownChange} fieldName={'assignedEmployee'} alternateFieldName={'employee to Assign'} reset={resetDropdowns}></Dropdown>
                                </div>
                            </div>
                            {/* Transportation Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Transportation Type
                                    <span className="text-accent">*</span>
                                    <span className="text-xs text-secondary-foreground block">
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
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Priority Level
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <Dropdown tableName={"priority"} fieldName={"priority"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
                                </div>

                                {/* Current Location and Department */}
                                <div>
                                    {/* Location dropdown */}
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Location
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                        Select the building making the patient request.
                                    </span>
                                    </Label>
                                    <Dropdown tableName={"building"} fieldName={'currentBuilding'} alternateFieldName={'building'} onChange={handleLocationChange} reset={resetDropdowns}/>

                                    {/*select department based on location*/}
                                    {selectedLocation && (
                                        <>
                                            <Label className="block text-sm font-semibold text-foreground mb-2">
                                                Department
                                                <span className="text-accent">*</span>
                                                <span className="text-xs text-secondary-foreground block">
                                                Select a department
                                            </span>
                                            </Label>
                                        </>
                                        )}
                                    {selectedLocation && renderDepartmentDropdown()}
                                    {/*//returns dept dropdown*/}

                                    {/*handle departments if given the location*/}
                                </div>

                                    {/* Current Building */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                    <div>
                                        {selectedLocation && (  //location selected?
                                            <>
                                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                                    Desired Building
                                                    <span className="text-accent">*</span>
                                                    <span className="text-xs text-secondary-foreground block">
                                                    Select a destination
                                                </span>
                                                </Label>
                                                <Dropdown tableName={"building"} fieldName={"desiredBuilding"} alternateFieldName={"building"} onChange={handleDesiredBuildingChange} reset={resetDesiredBuilding} mutuallyExclusiveOption={selectedLocation} ></Dropdown>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/*<p> Selected Location: '{selectedLocation}' </p>*/}
                            {/*<p> Selected Desired Building:  '{selectedDesiredBuilding}'</p>*/}
                            {/*<p> Selected Dept.:  '{selectedDept}'</p>*/}

                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Request Status
                                    <span className="text-accent">*</span>
                                </Label>
                                <Dropdown tableName={"status"} fieldName={"status"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
                            </div>
                            {/* Comments */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Additional Comments
                                    <span className="text-xs text-secondary-foreground block">
                                        Include any specific instructions or details about the
                                        transport request
                                    </span>
                                </Label>
                                <Textarea
                                    name="comments"
                                    value={formData.comments}
                                    className={"bg-input"}
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
                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <ErrorCard message={submitStatus.message} />
                )}

                {/* Confirmation Card */}
                {submittedTransport && !submitStatus?.isError && (
                    <div  className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Employee:</span>{' '}
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
                                    <span className="font-semibold">Current Building:</span>{' '}
                                    {submittedTransport.currentBuilding}
                                </div>
                                <div>
                                    <span className="font-semibold">Destination:</span>{' '}
                                    {submittedTransport.desiredBuilding}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span>{' '}
                                    {submittedTransport.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Patient:</span>{' '}
                                    {submittedTransport.patientID}
                                </div>
                                <div>
                                    <span className="font-semibold">Assigned Employee:</span>{' '}
                                    {submittedTransport.assignedEmployee}
                                </div>
                                <br />
                                <div>
                                    <span className="font-semibold">Comments:</span>{' '}
                                    {submittedTransport.comments || 'None provided'}
                                </div>

                            </div>
                            <div className="mt-3 text-sm text-secondary-foreground">
                                The Transport Request Has Been Submitted and Will Be Filled
                            </div>
                            <Button
                                onClick={() => setSubmittedTransport(null)}
                                className="mt-4 px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-foreground transition duration-200"
                            >
                                Dismiss
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TransportationRequestForm;