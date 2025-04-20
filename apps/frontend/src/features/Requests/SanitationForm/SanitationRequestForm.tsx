import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar.tsx';
import { Link } from 'react-router-dom';
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import Dropdown from "@/components/Dropdowns/Department.tsx";
import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";

// Simple interface for submitted request
interface SubmittedRequest {
  employeeName: string;
  sanitationType: string;
  priority: string;
  department: string;
  location: string;
  room: string;
  comments: string;
  timestamp: string;
  status:string;
}


const SanitationRequestForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    sanitationType: '',
    priority: '',
    department: '',
    room: '',
    comments: '',
    status:'',
    location:'',

  });
  const handleDropdownChange = (name:string, value:string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  //put this in Dropdown element and it will reset on submit
  const [resetDropdowns, setResetDropdowns] = useState(false);

  // Add state for the confirmation card
  const [submittedRequest, setSubmittedRequest] = useState<SubmittedRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/sanitation', {
        ...formData,
        priority: formData.priority.toString()
      });

      if (response.status === 200) {
        // Store the request data for the confirmation card
          setSubmittedRequest({
            ...formData,
            timestamp: new Date().toLocaleString()
          });

        setSubmitStatus({
          message: 'Sanitation request submitted successfully!',
          isError: false
        });

        setResetDropdowns(!resetDropdowns);

        // Reset form
        setFormData({
          employeeName: '',
          sanitationType: '',
          priority: '',
          department: '',
          room: '',
          comments: '',
          status: '',
          location: '',

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
      <div className="max-w-7xl mx-auto">

        {/* Status Message */}
        {submitStatus && submitStatus.isError && (
            <Alert className="mb-4 p-4 rounded-md bg-accent border border-accent-foreground">
              <AlertDescription className={'text-accent-foreground'}>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
        )}

        {/* Confirmation Card */}
        {submittedRequest && !submitStatus?.isError && (
          <div  className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
            <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Request Confirmation
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Your sanitation request has been submitted</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold">Employee Name:</span> {submittedRequest.employeeName}
                </div>
                <div>
                  <span className="font-semibold">Sanitation Type:</span> {submittedRequest.sanitationType}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span> {submittedRequest.priority}
                </div>
                <div>
                  <span className="font-semibold">Department:</span> {submittedRequest.department}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {submittedRequest.location}
                </div>
                <div>
                  <span className="font-semibold">Room:</span> {submittedRequest.room}
                </div>
                <div>
                  <span className="font-semibold">Sanitation Type:</span> {submittedRequest.status}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Comments:</span> {submittedRequest.comments || "None provided"}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Submitted:</span> {submittedRequest.timestamp}
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                A staff member will be assigned to handle your request based on priority.
              </div>
              <button
                onClick={() => setSubmittedRequest(null)}
                className="mt-4 px-4 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        <div className=" rounded-lg mt-3">
          <div className="p-5">
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
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 rounded-md border border-border bg-input"
                      required
                  />
                </div>
                {/* Sanitation Type */}
                <div>
                  <Label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sanitation Type
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 block">
                      e.g., Spill cleanup, Biohazard, General cleaning
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="sanitationType"
                    value={formData.sanitationType}
                    onChange={handleChange}
                    placeholder="Enter sanitation type"
                    className="w-full px-4 py-2 rounded-md border border-border bg-input"
                    required
                  />
                </div>

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
                  <Dropdown tableName={"priority"} fieldName={"priority"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
                </div>

                {/* Location and Department */}
                <LocationDepartmentDropdown onChange={handleDropdownChange} ></LocationDepartmentDropdown>

                {/* Room Number */}
                <div>
                  <Label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Number
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 block">
                      Format: Floor-Room (e.g., 3-124, L1-001)
                    </span>
                  </Label>
                  <Input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    placeholder="e.g., 3-124"
                    className="w-full px-4 py-2 rounded-md border border-border bg-input"
                    required
                  />
                </div>
              </div>
              {/* Status */}
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-2">
                  Request Status
                  <span className="text-accent">*</span>
                </Label>
                <Dropdown tableName={"status"} fieldName={"status"} onChange={handleDropdownChange} reset={resetDropdowns}></Dropdown>
              </div>
              {/* Comments */}
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Comments
                  <span className="text-xs text-gray-500 block">
                    Include any specific instructions or details about the sanitation request
                  </span>
                </Label>
                <Textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="e.g., Liquid spill near entrance, Biohazard materials present, Special cleaning instructions..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-border bg-input"
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

export default SanitationRequestForm;
