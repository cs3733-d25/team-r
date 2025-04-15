
import {useState} from "react";
import {Department, RequestPriority, RequestStatus, Buildings} from "../RequestEnums.tsx";
import axios from "axios";
import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import SanitationRequestForm from "@/features/Requests/SanitationForm/SanitationRequestForm.tsx";


interface SubmittedPatientRequest{
    patientID: string;
    assignedEmpID:string;
    priority: RequestPriority | string;
    department: Department | string;
    location: Buildings | string;
    comment: string;
    time: string;
    //status: RequestStatus | null;
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
        //status: null

    })

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

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

                setFormData({

                    patientID: "",
                    assignedEmpID:"",
                    priority: "",
                    department: "",
                    location: "",
                    comment: "",
                    time: new Date().toLocaleString(),
                    //status: null

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
                <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700 border border-red-700">
                    {submitStatus.message}
                </div>
            )}

            {/* Confirmation Card */}
            {submittedPatientRequest && !submitStatus?.isError && (
                <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border-2 border-mgb-light-blue-500">
                    <div className="bg-mgb-light-blue-500 text-white font-bold px-4 py-2 flex items-center">
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
                                <span className="font-semibold">Comment:</span> {submittedPatientRequest.comment}
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
                                <span className="font-semibold">Location:</span> {submittedPatientRequest.location}
                            </div>


                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                            The request has been submitted and will be filled.
                        </div>
                        <button
                            onClick={() => setSubmittedPatientRequest(null)}
                            className="mt-4 px-4 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Patient ID */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Patient ID
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="patientID"
                                    value={formData.patientID}
                                    onChange={handleChange}
                                    placeholder="Enter patient ID"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Priority Level
                                    <span className="text-xs text-gray-500 block">
                      EMERGENCY: Immediate attention required
                      <br/>
                      HIGH: Within 1 hour
                      <br/>
                      MEDIUM: Within 4 hours
                      <br/>
                      LOW: Within 24 hours
                        </span>
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                >
                                    <option value="" disabled hidden>Select Priority</option>
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
                      Select the department making the patient request.
                        </span>
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                >
                                    <option value="" disabled hidden>Select a Department</option>
                                    {Object.values(Department).map(dept => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Location
                                <span className="text-red-500">*</span>
                                <span className="text-xs text-gray-500 block">
                                        Select the building making the patient request.
                                    </span>
                            </label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                            >
                                <option value="" disabled hidden>Select a Location</option>
                                {Object.values(Buildings).map(loc => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
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
    )
}
export default PatientRequestForm;
