import React, { useState } from 'react';
import axios from 'axios';

enum RequestPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}


enum Department {
  EMERGENCY = 'Emergency',

}


const SanitationRequestForm = () => {
  const [formData, setFormData] = useState({
    sanitationType: '',
    priority: RequestPriority.MEDIUM,
    department: Department.EMERGENCY,
    roomNumber: '',
    comments: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/sanitation-requests', formData);
        if (response.status === 200) {
          alert('Sanitation request submitted successfully!');
          // Reset form
          setFormData({
            sanitationType: '',
            priority: RequestPriority.MEDIUM,
            department: Department.EMERGENCY,
            roomNumber: '',
            comments: ''
          });
        }
      } catch (error) {
        console.error('Error submitting request:', error);
        alert('Failed to submit request. Please try again.');
      }
    };
}
