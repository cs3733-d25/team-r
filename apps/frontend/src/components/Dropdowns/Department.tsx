import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SelectLabel } from '@radix-ui/react-select';

function getOptions(table: string) {
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        async function retrieveOptions() {
            try {
                const response = await axios.get('/api/enum/' + table + '/');
                console.log('response from /api/enum/' + table + ' get', response.data);
                const options = response.data.map((department: string) => (
                    <SelectItem key={department} value={department}>
                        {department}
                    </SelectItem>
                ));
                console.log(options);
                setDropdownOptions(options);
            } catch (error) {
                console.log(error);
            }
        }
        retrieveOptions();
    }, []);

    return dropdownOptions;
}

interface DropdownProps {
    tableName: string;
    fieldName: string;
    onChange: (name:string, value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ tableName, fieldName, onChange }) => {
    const handleChange = (value:string) => {
        onChange(fieldName, value);
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue placeholder={'Select a ' + tableName}></SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    {getOptions(tableName)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Dropdown;
