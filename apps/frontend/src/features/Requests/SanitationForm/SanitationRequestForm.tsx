import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import Dropdown from "@/components/Dropdowns/Dropdown.tsx";
import LocationDepartmentDropdown from "@/components/Dropdowns/Location-Department.tsx";
import {ErrorCard} from "@/components/ServiceRequests/ErrorCard.tsx";
import {useAuth0} from "@auth0/auth0-react";

// Simple interface for submitted request
interface SubmittedRequest {
  employeeName: string;
  sanitationType: string;
  priority: string;
  department: string;
  location: string;
  roomNumber: string;
  comments: string;
  timestamp: string;
  status:string;
  assignedEmployee: string;
}


const SanitationRequestForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    sanitationType: '',
    priority: '',
    department: '',
    roomNumber: '',
    comments: '',
    status:'',
    location:'',
    assignedEmployee:'',

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
          roomNumber: '',
          comments: '',
          status: '',
          location: '',
          assignedEmployee: '',

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
  //get username from backend
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
          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className= "block text-sm font-semibold text-foreground mb-2">
                    Sanitation Type
                    <span className="text-accent">*</span>
                    <span className="text-xs text-secondary-foreground block">
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

                {/*assignEmployee*/}
                <div>
                  <Label className= "block text-sm font-semibold text-foreground mb-2">
                    Assigned Employee
                    <span className="text-accent">*</span>
                    <span className="text-xs text-secondary-foreground block">
                      Choose an employee to assign to a task
                    </span>
                  </Label>
                  <Dropdown customOptions={'employees'} onChange={handleDropdownChange} fieldName={'assignedEmployee'}></Dropdown>
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
                <LocationDepartmentDropdown onChange={handleDropdownChange} ></LocationDepartmentDropdown>
                {/* Status */}

                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Request Status
                    <span className="text-accent">*</span>
                  </Label>
                  <Dropdown tableName={"status"} fieldName={"status"} onChange={handleDropdownChange}></Dropdown>
                </div>
                {/* Room Number */}
                <div>
                  <Label className="block text-sm font-semibold text-foreground mb-2">
                    Room Number
                    <span className="text-accent">*</span>
                    <span className="text-xs text-secondary-foreground block">
                      Format: Floor-Room (e.g., 3-124, L1-001)
                    </span>
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

              {/* Comments */}
              <div>
                <Label className="block text-sm font-semibold text-foreground mb-2">
                  Additional Comments
                  <span className="text-xs text-secondary-foreground block">
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
        {/* Status Message */}
        {submitStatus && submitStatus.isError && (
            <ErrorCard message={submitStatus.message} />
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
                    <span className="font-semibold">Room:</span> {submittedRequest.roomNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span> {submittedRequest.status}
                  </div>
                  <div>
                    <span className="font-semibold">Assigned Employee:</span> {submittedRequest.assignedEmployee}
                  </div>
                  <div>
                    <span className="font-semibold">Comments:</span> {submittedRequest.comments || "None provided"}
                  </div>
                </div>
                <div  className="mt-3 text-sm text-secondary-foreground">
                  The Sanitation Request Has Been Submitted and Will Be Filled.
                </div>
                <Button
                    onClick={() => setSubmittedRequest(null)}
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

export default SanitationRequestForm;
