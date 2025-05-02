import {useEffect, useState} from 'react';
import axios from 'axios';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";
import {ErrorCard} from "@/components/ServiceRequests/ErrorCard.tsx";
import {useAuth0} from "@auth0/auth0-react";

interface SubmittedDevice {
    device: string;
    room: string;
    priority: string;
    department: string;
    building: string;
    comment: string;
    employeeName: string;
    //employeeID: string;
    status: string;
    timestamp: string;
    assignedEmployee: string;
}

export const DeviceReqForm = () => {
    const [formData, setFormData] = useState({
        device: '',
        priority: '',
        room: '',
        department: '',
        building: '',
        comment: '',
        employeeName: '',
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
    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //put this in Dropdown element and it will reset on submit
    const [resetDropdowns, setResetDropdowns] = useState(false);

    //submittedDevice holds info for confirmation card
    const [submittedDevice, setSubmittedDevice] = useState<SubmittedDevice | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('api/devicereq/', {
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

                setResetDropdowns(!resetDropdowns);

                setFormData({
                    device: '',
                    priority: '',
                    room: '',
                    department: '',
                    comment: '',
                    employeeName: '',
                    //employeeID: '',
                    status: '',
                    building: '',
                    assignedEmployee: ''
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleDropdownChange = (name:string, value:string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
        <>

            <div className="max-w-7xl mx-auto">
                <div className=" rounded-lg mt-3">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Device Select */}
                                {/*<div>*/}
                                {/*    <Label className="block text-sm font-semibold text-foreground mb-2">*/}
                                {/*        Select a Device*/}
                                {/*        <span className="text-accent">*</span>*/}
                                {/*    </Label>*/}

                                {/*    <Dropdown tableName={"medicalDevice"} fieldName={'device'} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>*/}
                                {/*</div>*/}
                                <div>
                                    <Label className= "block text-sm font-semibold text-foreground mb-2">
                                        Device
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                             e.g., X-Ray, EKG, Syringe
                                        </span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="device"
                                        value={formData.device}
                                        onChange={handleChange}
                                        placeholder="Enter a medical device"
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
                                    <Dropdown customOptions={'employees'} onChange={handleDropdownChange} fieldName={'assignedEmployee'} alternateFieldName={'employee to assign'} reset={resetDropdowns}></Dropdown>
                                </div>
                                {/* Priority */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Priority Level
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <Dropdown tableName={"priority"} fieldName={"priority"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
                                </div>


                                {/* Location and Department */}
                                <LocationDepartmentDropdown onChange={handleDropdownChange} reset={resetDropdowns}></LocationDepartmentDropdown>

                                {/* Status */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Request Status
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <Dropdown tableName={"status"} fieldName={"status"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
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
                                <br />
                            </div>

                            {/* Comments */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Comments
                                    <span className="text-xs text-secondary-foreground block">
                                        Enter any additional comments.
                                    </span>
                                    </Label>
                                    <Textarea
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange2}
                                        placeholder="Include any additional comments or instructions."
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                    />
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


            </div>
            {submitStatus && submitStatus.isError && (
                <ErrorCard message={submitStatus.message} />
            )}

            {/* Confirmation Card */}
            {submittedDevice && !submitStatus?.isError && (
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
                            Your device request has been submitted
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Employee:</span>{' '}
                                {submittedDevice.employeeName}
                            </div>
                            <div>
                                <span className="font-semibold">Device:</span>{' '}
                                {submittedDevice.device}
                            </div>
                            <div>
                                <span className="font-semibold">Priority:</span>{' '}
                                {submittedDevice.priority}
                            </div>
                            <div>
                                <span className="font-semibold">Building:</span>{' '}
                                {submittedDevice.building}
                            </div>
                            <div>
                                <span className="font-semibold">Department:</span>{' '}
                                {submittedDevice.department}
                            </div>
                            <div>
                                <span className="font-semibold">Room:</span>{' '}
                                {submittedDevice.room}
                            </div>
                            <div>
                                <span className="font-semibold">Assigned Employee:</span>{' '}
                                {submittedDevice.assignedEmployee}
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>{' '}
                                {submittedDevice.status}
                            </div>
                            <br />
                            <div>
                                <span className="font-semibold">Comments:</span>{' '}
                                {submittedDevice.comment}
                            </div>

                        </div>
                        <div className="mt-3 text-sm text-secondary-foreground">
                            The device request has been submitted and will be filled.
                        </div>
                        <Button
                            onClick={() => setSubmittedDevice(null)}
                            className="mt-4 px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-foreground transition duration-200"
                        >
                            Dismiss
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
