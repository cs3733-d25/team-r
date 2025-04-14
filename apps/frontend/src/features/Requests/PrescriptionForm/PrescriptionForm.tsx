import { useState } from 'react';
import { Department, RequestPriority } from '../RequestEnums.tsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectGroup, SelectItem } from '@/components/ui/select.tsx';
import { NavbarMGH } from '@/components/NavbarMGH.tsx';

interface SubmittedPrescription {
    employee: string;
    employeeID: string;
    patientID: string;
    priority: RequestPriority;
    department: Department;
    numberOfPills: number;
    refills: number;
    morningPillCount: number;
    middayPillCount: number;
    eveningPillCount: number;
    nightPillCount: number;
    days: number;
    additionalInstructions: string;
    drugName: string;
    timestamp: string;
}

interface RadioProps {
    days: number;
}

export const PrescriptionForm = () => {
    const [formData, setFormData] = useState({
        employee: '',
        employeeID: '',
        patientID: '',
        priority: RequestPriority.medium,
        department: Department.PHARMACY,
        numberOfPills: 0,
        refills: 0,
        morningPillCount: 0,
        middayPillCount: 0,
        eveningPillCount: 0,
        nightPillCount: 0,
        days: 0,
        additionalInstructions: '',
        drugName: '',
    });

    const [submitStatus, setSubmitStatus] = useState<{
        message: string;
        isError: boolean;
    } | null>(null);

    //submittedPrescription holds info for confirmation card
    const [submittedPrescription, setSubmittedPrescription] =
        useState<SubmittedPrescription | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus(null);

        try {
            const response = await axios.post('api/prescription', {
                ...formData,
                priority: formData.priority.toString(),
            });

            if (response.status === 200) {
                setSubmittedPrescription({
                    ...formData,
                    timestamp: new Date().toLocaleString(),
                });

                setSubmitStatus({
                    message: 'Prescription request submitted successfully!',
                    isError: false,
                });

                setFormData({
                    employee: '',
                    employeeID: '',
                    patientID: '',
                    priority: RequestPriority.medium,
                    department: Department.PHARMACY,
                    numberOfPills: 0,
                    refills: 0,
                    morningPillCount: 0,
                    middayPillCount: 0,
                    eveningPillCount: 0,
                    nightPillCount: 0,
                    days: 0,
                    additionalInstructions: '',
                    drugName: '',
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const RadioDays = (props: RadioProps) => {
        return (
            <div className="px-3 flex flex-row items-end">
                <Label className="block text-sm font-semibold text-foreground mb-2 text-center px-2">
                    {props.days}
                </Label>
                <Input
                    type="radio"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    required
                />
            </div>
        )
    }

    return (
        <>
            <NavbarMGH />
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-0">Prescription Request System</h1>
                <h2 className="text-xl font-bold mb-6">Owen Miller & Keagan Hitt</h2>
                <Link
                    key={'Prescription Request Page'}
                    to={'/prescriptionpage'}
                    className={
                        'px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200'
                    }
                >
                    See All Requests
                </Link>
                <br />
                <br />
                <div className="bg-secondary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-foreground">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Employee Name */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Employee Name
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="employee"
                                        value={formData.employee}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Employee ID */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Employee ID
                                        <span className="text-accent">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="employeeID"
                                        value={formData.employeeID}
                                        onChange={handleChange}
                                        placeholder="Enter employee ID"
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Patient ID */}
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
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Priority */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Priority Level
                                        <span className="text-xs text-secondary-foreground block">
                                            EMERGENCY: Immediate attention required
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
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 bg-input"
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
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Department
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Select the department making the prescription request.
                                        </span>
                                    </Label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 bg-input"
                                    >
                                        {Object.values(Department).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Drug Name */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Drug Name
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Enter the name of the drug being prescribed.
                                        </span>
                                    </Label>
                                    <Input
                                        type="text"
                                        name="drugName"
                                        value={formData.drugName}
                                        onChange={handleChange}
                                        placeholder="Enter the name of the drug being prescribed."
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Drug Quantity */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Drug Quantity
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Enter the amount of the drug being prescribed.
                                        </span>
                                    </Label>
                                    <Input
                                        type="number"
                                        name="numberOfPills"
                                        value={formData.numberOfPills}
                                        onChange={handleChange}
                                        placeholder="Enter the amount of the drug being prescribed."
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>

                                {/* Refills */}
                                <div>
                                    <Label className="block text-sm font-semibold text-foreground mb-2">
                                        Refill Quantity
                                        <span className="text-accent">*</span>
                                        <span className="text-xs text-secondary-foreground block">
                                            Enter the number of refills available.
                                        </span>
                                    </Label>
                                    <Input
                                        type="number"
                                        name="refills"
                                        value={formData.refills}
                                        onChange={handleChange}
                                        placeholder="Enter the number of refills available."
                                        className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                        required
                                    />
                                </div>
                            </div>

                            <h2 className={'text-foreground font-bold'}>Instructions for Patient:</h2>
                            {/* Pill Quantities per Time */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                    Quantity of Drug to be Taken by Patient at Each Time:
                                </Label>
                                <div className="flex flex-row justify-center">
                                    <div className="px-3">
                                        <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                            Morning:
                                        </Label>
                                        <Input
                                            type="number"
                                            name="morningPillCount"
                                            value={formData.morningPillCount}
                                            onChange={handleChange}
                                            placeholder="Enter the number of refills available."
                                            className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                            required
                                        />
                                    </div>
                                    <div className="px-3">
                                        <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                            Midday:
                                        </Label>
                                        <Input
                                            type="number"
                                            name="middayPillCount"
                                            value={formData.middayPillCount}
                                            onChange={handleChange}
                                            placeholder="Enter the number of refills available."
                                            className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                            required
                                        />
                                    </div>
                                    <div className="px-3">
                                        <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                            Evening:
                                        </Label>
                                        <Input
                                            type="number"
                                            name="eveningPillCount"
                                            value={formData.eveningPillCount}
                                            onChange={handleChange}
                                            placeholder="Enter the number of refills available."
                                            className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                            required
                                        />
                                    </div>
                                    <div className="px-3">
                                        <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                            Bedtime:
                                        </Label>
                                        <Input
                                            type="number"
                                            name="nightPillCount"
                                            value={formData.nightPillCount}
                                            onChange={handleChange}
                                            placeholder="Enter the number of refills available."
                                            className="w-full px-4 py-2 rounded-md border border-border bg-input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Days */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2 text-center">
                                    Days per Week to Take Drug:
                                </Label>
                                <div className="flex flex-row justify-center">
                                    <RadioDays days={1} />
                                    <RadioDays days={2} />
                                    <RadioDays days={3} />
                                    <RadioDays days={4} />
                                    <RadioDays days={5} />
                                    <RadioDays days={6} />
                                    <RadioDays days={7} />
                                </div>
                            </div>

                            {/* Additional Instructions */}
                            <div>
                                <Label className="block text-sm font-semibold text-foreground mb-2">
                                    Additional Instructions
                                    <span className="text-xs text-secondary-foreground block">
                                        Include any additional instructions necessary to take the
                                        prescription.
                                    </span>
                                </Label>
                                <textarea
                                    name="additionalInstructions"
                                    value={formData.additionalInstructions}
                                    onChange={handleChange}
                                    placeholder="Include any additional instructions necessary to take the prescription."
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
                {/*formData.days*/}

                {/* Status Message */}
                {submitStatus && submitStatus.isError && (
                    <Alert className="mb-4 p-4 rounded-md bg-accent border border-accent-foreground">
                        <AlertDescription className={'text-accent-foreground'}>
                            {submitStatus.message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Confirmation Card */}
                {submittedPrescription && !submitStatus?.isError && (
                    <div className="mb-6 bg-background rounded-lg shadow-md overflow-hidden border-2 border-secondary">
                        <div className="bg-secondary text-secondary-foreground font-bold px-4 py-2 flex items-center">
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
                                Your prescription request has been submitted
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Drug Name:</span>{' '}
                                    {submittedPrescription.drugName}
                                </div>
                                <div>
                                    <span className="font-semibold">Employee ID:</span>{' '}
                                    {submittedPrescription.employeeID}
                                </div>
                                <div>
                                    <span className="font-semibold">Patient ID:</span>{' '}
                                    {submittedPrescription.patientID}
                                </div>
                                <div>
                                    <span className="font-semibold">Priority:</span>{' '}
                                    {submittedPrescription.priority}
                                </div>
                                <div>
                                    <span className="font-semibold">Department:</span>{' '}
                                    {submittedPrescription.department}
                                </div>
                                <div>
                                    <span className="font-semibold">Morning Pill Count:</span>{' '}
                                    {submittedPrescription.morningPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Midday Pill Count:</span>{' '}
                                    {submittedPrescription.middayPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Evening Pill Count:</span>{' '}
                                    {submittedPrescription.eveningPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Bedtime Pill Count:</span>{' '}
                                    {submittedPrescription.nightPillCount}
                                </div>
                                <div>
                                    <span className="font-semibold">Days per Week:</span>{' '}
                                    {submittedPrescription.days}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Additional Instructions:</span>{' '}
                                    {submittedPrescription.additionalInstructions ||
                                        'None provided'}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-semibold">Submitted:</span>{' '}
                                    {submittedPrescription.timestamp}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                                The prescription request has been submitted and will be filled.
                            </div>
                            <button
                                onClick={() => setSubmittedPrescription(null)}
                                className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
