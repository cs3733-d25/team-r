import {useEffect, useState} from "react";
import axios from "axios";
import Dropdown from "../../../components/Dropdowns/Dropdown.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";
import {ErrorCard} from "@/components/ServiceRequests/ErrorCard.tsx";
import {useAuth0} from "@auth0/auth0-react";


interface SubmittedPatientRequest{
    patientID: string;
    assignedEmpID:string;
    priority: string;
    department: string;
    location: string;
    comment: string;
    time: string;
    status: string;
    request: string;
    employeeName: string;
}

export const PatientRequestForm = () => {
    const [formData, setFormData] = useState({

        patientID: "",
        assignedEmpID:"",
        priority: "",
        department: "",
        location: "",
        comment: "",
        time: new Date().toString(),
        status: '',
        request: ' ',
        employeeName: '',

    })
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

    //submittedPatientRequest holds info for confirmation card
    const [submittedPatientRequest, setSubmittedPatientRequest] = useState<SubmittedPatientRequest | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null)

        try {
            const response = await axios.post('api/patientreq', {
                ...formData,
            });

            if (response.status === 200) {
                setSubmittedPatientRequest({
                    ...formData,
                    time: new Date().toLocaleString()
                });

                setSubmitStatus({
                    message: 'Patient request request submitted successfully!',
                    isError: false
                });

                setResetDropdowns(!resetDropdowns);

                setFormData({

                    patientID: "",
                    assignedEmpID:"",
                    priority: "",
                    department: "",
                    location: "",
                    comment: "",
                    time: new Date().toLocaleString(),
                    status: '',
                    request: ' ',
                    employeeName: ''

                });
            }
        } catch (error) {
            console.error('Error submitting request', error);
            setSubmitStatus({
                message: 'Failed to submit request. Please try again.',
                isError: true
            })
        }
    }

    const handleDropdownChange = (name:string, value:string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

        <div className="p-6 max-w-7xl mx-auto">

            <div
                >
                <div className="p-6">
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
                            {/*nonemergent request*/}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Nonemergent Request
                                    <span className="text-accent">*</span>
                                </Label>

                                <Dropdown tableName={"nonemergentRequest"} fieldName={"request"} onChange={handleDropdownChange}></Dropdown>
                            </div>

                            {/* Priority */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Priority Level
                                    <span className="text-accent">*</span>
                                </Label>
                                <Dropdown tableName={"priority"} fieldName={"priority"} onChange={handleDropdownChange}></Dropdown>
                            </div>
                            {/* Location and Department */}
                            <LocationDepartmentDropdown onChange={handleDropdownChange} ></LocationDepartmentDropdown>
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    Request Status
                                    <span className="text-accent">*</span>
                                </label>
                                <Dropdown tableName={"status"} fieldName={"status"} onChange={handleDropdownChange}></Dropdown>
                            </div>
                        </div>
                        {/* Additional Instructions */}
                        <div>
                            <Label className="block text-sm font-semibold text-foreground mb-2">
                                Comments:
                                <span className="text-xs text-secondary-foreground block">
                                        Include any additional comments or instructions.
                                    </span>
                            </Label>
                            <Textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
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
            {submitStatus && submitStatus.isError && (
                <ErrorCard message={submitStatus.message} />
            )}
            {/* Confirmation Card */}
            {submittedPatientRequest && !submitStatus?.isError && (
                <div  className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
                    <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                        </svg>
                        Request Confirmation
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Your request has been submitted</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="font-semibold">Employee Name: </span>
                                {submittedPatientRequest.employeeName}
                            </div>
                            <div>
                                <span className="font-semibold">Patient ID:</span> {submittedPatientRequest.patientID}
                            </div>
                            <div>
                                <span className="font-semibold">Priority:</span> {submittedPatientRequest.priority}
                            </div>
                            <div>
                                <span className="font-semibold">Department:</span> {submittedPatientRequest.department}
                            </div>
                            <div>
                                <span className="font-semibold">Non Emergent Request:</span> {submittedPatientRequest.request}
                            </div>
                            <div>
                                <span className="font-semibold">Location:</span> {submittedPatientRequest.location}
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span> {submittedPatientRequest.status}
                            </div>
                            <div>
                                <span className="font-semibold">Comment:</span> {submittedPatientRequest.comment}
                            </div>


                        </div>
                        <div className="mt-3 text-sm text-secondary-foreground">
                            The request has been submitted and will be filled.
                        </div>
                        <Button
                            onClick={() => setSubmittedPatientRequest(null)}
                            className="mt-4 px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary-foreground transition duration-200"
                        >
                            Dismiss
                        </Button>
                    </div>
                </div>
            )}

        </div>
</>
    )
}
export default PatientRequestForm;
