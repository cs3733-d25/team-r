import {useState} from "react";
import {Department, RequestPriority} from "../RequestEnums.tsx";
import axios from "axios";
import Navbar from "../../../components/Navbar.tsx";
import {Link} from "react-router-dom";

interface SubmittedPrescription {
    employee: string;
    employeeID: string;
    patientID: string;
    priority: RequestPriority;
    department: Department;
    morningPillCount: number;
    middayPillCount: number;
    eveningPillCount: number;
    nightPillCount: number;
    days: number;
    additionalInstructions: string;
    drugName: string;
    timestamp: string;
}

export const PrescriptionForm = () => {
    const [formData, setFormData] = useState({
        employee: "",
        employeeID: "",
        patientID: "",
        priority: RequestPriority.medium,
        department: Department.PHARMACY,
        morningPillCount: 0,
        middayPillCount: 0,
        eveningPillCount: 0,
        nightPillCount: 0,
        days: 0,
        additionalInstructions: "",
        drugName: ""
    })

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //submittedPrescription holds info for confirmation card
    const [submittedPrescription, setSubmittedPrescription] = useState<SubmittedPrescription | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null)

        try {
            const response = await axios.post('api/prescription', {
                ...formData,
                priority: formData.priority.toString()
            });

            if (response.status === 200) {
                setSubmittedPrescription({
                    ...formData,
                    timestamp: new Date().toLocaleString()
                });

                setSubmitStatus({
                    message: 'Prescription request submitted successfully!',
                    isError: false
                });

                setFormData({
                    employee: "",
                    employeeID: "",
                    patientID: "",
                    priority: RequestPriority.medium,
                    department: Department.PHARMACY,
                    morningPillCount: 0,
                    middayPillCount: 0,
                    eveningPillCount: 0,
                    nightPillCount: 0,
                    days: 0,
                    additionalInstructions: "",
                    drugName: ""
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
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-0">Prescription Request System</h1>
                <h2 className="text-xl font-bold mb-6">Owen Miller & Keagan Hitt</h2>

                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <div className="mb-4 p-4 rounded-md bg-red-100 text-red-700 border border-red-700">
                        {submitStatus.message}
                    </div>
                )}

                {/* Confirmation Card */}
                {submittedPrescription && !submitStatus?.isError && (
                    <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden border-2 border-mgb-light-blue-500">
                        <div className="bg-mgb-light-blue-500 text-white font-bold px-4 py-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Request Confirmation
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Your prescription request has been submitted</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Drug Name:</span> {submittedPrescription.drugName}
                                </div>
                                <div>
                                    <span className="font-semibold">Employee ID:</span> {submittedPrescription.employeeID}
                                </div>
                                <div>
                                    <span className="font-semibold">Patient ID:</span> {submittedPrescription.patientID}
                                </div>
                                <div>
                                    <span className="font-semibold">Priority:</span> {submittedPrescription.priority}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span> {submittedPrescription.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Morning Pill Count:</span> {submittedPrescription.morningPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Midday Pill Count:</span> {submittedPrescription.middayPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Evening Pill Count:</span> {submittedPrescription.eveningPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Bedtime Pill Count:</span> {submittedPrescription.nightPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Days per Week:</span> {submittedPrescription.days}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Additional Instructions:</span> {submittedPrescription.additionalInstructions || "None provided"}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Submitted:</span> {submittedPrescription.timestamp}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                The prescription request has been submitted and will be filled.
                            </div>
                            <button
                                onClick={() => setSubmittedPrescription(null)}
                                className="mt-4 px-4 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}
                <Link
                    key={'Prescription Request Page'}
                    to={'/prescriptionpage'}
                    className={"px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"}
                >
                    See All Requests
                </Link>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Employee Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Employee Name
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employee"
                                        value={formData.employee}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        required
                                    />
                                </div>

                                {/* Employee ID */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Employee ID
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employeeID"
                                        value={formData.employeeID}
                                        onChange={handleChange}
                                        placeholder="Enter employee ID"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        required
                                    />
                                </div>

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
                      Select the department making the prescription request.
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
                            </div>

                            {/* Additional Instructions */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Additional Instructions
                                    <span className="text-xs text-gray-500 block">
                    Include any additional instructions necessary to take the prescription.
                  </span>
                                </label>
                                <textarea
                                    name="additionalInstructions"
                                    value={formData.additionalInstructions}
                                    onChange={handleChange}
                                    placeholder="Include any additional instructions necessary to take the prescription."
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                />
                            </div>

                            {/* Drug Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Drug Name
                                    <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-500 block">
                        Enter the name of the drug being prescribed.
                      </span>
                                </label>
                                <input
                                    type="text"
                                    name="drugName"
                                    value={formData.drugName}
                                    onChange={handleChange}
                                    placeholder="Enter the name of the drug being prescribed."
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                                    required
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
    )
}