import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LocationDepartmentDropdown from '@/components/Dropdowns/Location-Department';
import {useAuth0} from "@auth0/auth0-react";
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";

interface SubmittedRequest {
    employeeName: string;
    language: string;
    priority: string;
    department: string;
    building: string;
    roomNumber: string;
    notes: string;
    timestamp: string;
    status: string;
    assignedEmployee: string;
}

const TranslateRequestForm = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        language: '',
        priority: '',
        department: '',
        building: '',
        roomNumber: '',
        notes: '',
        status: '',
        assignedEmployee: '',
    });
    //use auth0 to get the current user data
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

    const [submitStatus, setSubmitStatus] = useState<{ message: string; isError: boolean } | null>(null);
    const [resetDropdowns, setResetDropdowns] = useState(false);
    const [submittedRequest, setSubmittedRequest] = useState<SubmittedRequest | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('/api/translate/', {
                ...formData,
                priority: formData.priority.toString()
            });

            if (response.status === 200) {
                setSubmittedRequest({ ...formData, timestamp: new Date().toLocaleString() });
                setSubmitStatus({ message: 'Translator request submitted successfully!', isError: false });
                setResetDropdowns(!resetDropdowns);

                setFormData({
                    employeeName: formData.employeeName,
                    language: '',
                    priority: '',
                    department: '',
                    building: '',
                    roomNumber: '',
                    notes: '',
                    status: '',
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

    //call backend for username
    const [username, setusername] = useState("");
    useEffect(() => {
        async function getName() {
            try {
                const response = await axios.get("api/login/session");
                setusername(response.data.username);
            } catch (err) {
                console.error("Error fetching username:", err);
            }
        }

        getName();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="rounded-lg mt-3">
                <div className="p-5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Language Needed<span className="text-accent">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    placeholder="e.g., Spanish, Mandarin"
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
                                <Dropdown customOptions={'employees'} onChange={handleDropdownChange} fieldName={'assignedEmployee'} alternateFieldName={"employee to assign"} reset={resetDropdowns}></Dropdown>
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Priority Level<span className="text-accent">*</span>
                                </Label>
                                <Dropdown tableName="priority" fieldName="priority" onChange={handleDropdownChange} reset={resetDropdowns} />
                            </div>

                            <LocationDepartmentDropdown onChange={handleDropdownChange} reset={resetDropdowns}/>

                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Request Status<span className="text-accent">*</span>
                                </Label>
                                <Dropdown tableName="status" fieldName="status" onChange={handleDropdownChange} reset={resetDropdowns}/>
                            </div>

                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Room Number<span className="text-accent">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    placeholder="e.g., 3-124"
                                    className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="block text-sm font-semibold text-foreground mb-2">
                                Additional Notes
                            </Label>
                            <Textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="e.g., Legal document, Medical appointment, Specific dialect needed..."
                                rows={4}
                                className="w-full px-4 py-2 rounded-md border border-border bg-input"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" variant="default">Submit Request</Button>
                        </div>
                    </form>
                </div>
            </div>

            {submitStatus && submitStatus.isError && (
                <Alert className="mb-4 p-4 rounded-md bg-destructive/40 border border-accent-foreground">
                    <AlertDescription className="text-foreground">
                        {submitStatus.message}
                    </AlertDescription>
                </Alert>
            )}

            {submittedRequest && !submitStatus?.isError && (
                <div className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
                    <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Request Confirmation
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Your translator request has been submitted</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Employee: </span>
                                {submittedRequest.employeeName}
                            </div>
                            <div>
                                <span className="font-semibold">Language: </span>
                                {submittedRequest.language}
                            </div>
                            <div>
                                <span className="font-semibold">Priority: </span>
                                {submittedRequest.priority}</div>

                                <div>
                                    <span className="font-semibold">Location: </span>
                                    {submittedRequest.building}
                                </div>
                            <div>
                                <span className="font-semibold">Department: </span>
                                {submittedRequest.department}
                            </div>


                            <div>
                                <span className="font-semibold">Room: </span>
                                {submittedRequest.roomNumber}
                            </div>
                            <div>
                                <span className="font-semibold">Assigned Employee: </span>
                                {submittedRequest.assignedEmployee}
                            </div>
                            <div>
                                <span className="font-semibold">Status: </span>
                                {submittedRequest.status}
                            </div>
                            <br/>
                            <div>
                                <span className="font-semibold">Comments: </span>
                                {submittedRequest.notes || "None provided"}
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-secondary-foreground">
                            The Translator Request Has Been Submitted and Will Be Addressed.
                        </div>
                        <Button onClick={() => setSubmittedRequest(null)} className="mt-4 px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-foreground transition duration-200">
                            Dismiss
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranslateRequestForm;