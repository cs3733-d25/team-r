import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar.tsx';

enum Department {
  CARDIOLOGY = 'CARDIOLOGY',
  NEUROLOGY = 'NEUROLOGY',
  IT = 'IT',
  FACILITIES = 'FACILITIES',
  ADMINISTRATION = 'ADMINISTRATION'
}

enum RequestPriority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

const SanitationRequestForm = () => {
  const [formData, setFormData] = useState({
    sanitationType: '',
    priority: RequestPriority.medium,
    department: Department.ADMINISTRATION,
    room: '',
    comments: '',
    userID: 8
  });

  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/sanitation', {
        ...formData,
        priority: formData.priority.toString()
      });

      if (response.status === 200) {
        setSubmitStatus({
          message: 'Sanitation request submitted successfully!',
          isError: false
        });

        // Reset form
        setFormData({
          sanitationType: '',
          priority: RequestPriority.medium,
          department: Department.ADMINISTRATION,
          room: '',
          comments: '',
          userID: 8
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
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sanitation Request System</h1>

        {/* Status Message */}
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-md ${
            submitStatus.isError
              ? 'bg-red-100 text-red-700 border border-red-700'
              : 'bg-green-100 text-green-700 border border-green-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sanitation Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sanitation Type
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 block">
                      e.g., Spill cleanup, Biohazard, General cleaning
                    </span>
                  </label>
                  <input
                    type="text"
                    name="sanitationType"
                    value={formData.sanitationType}
                    onChange={handleChange}
                    placeholder="Enter sanitation type"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                    required
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      Select the department requiring sanitation
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

                {/* Room Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Number
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 block">
                      Format: Floor-Room (e.g., 3-124, L1-001)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    placeholder="e.g., 3-124"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                    required
                  />
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Comments
                  <span className="text-xs text-gray-500 block">
                    Include any specific instructions or details about the sanitation request
                  </span>
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="e.g., Liquid spill near entrance, Biohazard materials present, Special cleaning instructions..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
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
  );
};

export default SanitationRequestForm;
