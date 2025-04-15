// import React, { useState } from 'react';
// import {Label} from "@/components/ui/label.tsx";
//
// interface DropdownProps {
//     selectedValue: string;
//     onChange: (value: string) => void;
// }
//
//
// const Dropdown: React.FC<DropdownProps> = ({ selectedValue, onChange }) => {
//     const [isFocused, setIsFocused] = useState<boolean>(false);
//
//     return (
//         <div className="flex items-center space-x-10">
//             <Label htmlFor="dropdown" className="block">
//                 Please select the Medical Device you would like to request:
//             </Label>
//             <select
//                 id="dropdown"
//                 value={selectedValue}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="p-2 border rounded bg-input"
//             >
//                  {!isFocused && (
//                     <option value="" disabled>
//                         Select a device
//                     </option>
//                 )}
//                 <option value="">Select a device</option>
//                 <option value="Defibrillator">Defibrillator</option>
//                 <option value="X-Ray Machine">X-Ray Machine</option>
//                 <option value="EKG Machine">EKG Machine</option>
//             </select>
//         </div>
//     );
// };
//
// export default Dropdown;
