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

  const HandleChange = (e: React.ChangeEVent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
       <h2 className="text-2xl font-bold mb-6">Sanitation Request Form</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Sanitation Type
             <input
               type="text"
               name="sanitationType"
               value={formData.sanitationType}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
               required
             />
           </label>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">
             Priority
             <select
               name="priority"
               value={formData.priority}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
             >
               {Object.values(RequestPriority).map(priority => (
                 <option key={priority} value={priority}>
                   {priority}
                 </option>
               ))}
             </select>
           </label>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">
             Department
             <select
               name="department"
               value={formData.department}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
             >
               {Object.values(Department).map(dept => (
                 <option key={dept} value={dept}>
                   {dept}
                 </option>
               ))}
             </select>
           </label>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">
             Room Number
             <input
               type="text"
               name="roomNumber"
               value={formData.roomNumber}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
               required
             />
           </label>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">
             Comments
             <textarea
               name="comments"
               value={formData.comments}
               onChange={handleChange}
               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
               rows={3}
             />
           </label>
         </div>

         <button
           type="submit"
           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
         >
           Submit Request
         </button>
       </form>
     </div>
   );
 };

 export default SanitationRequestForm;
