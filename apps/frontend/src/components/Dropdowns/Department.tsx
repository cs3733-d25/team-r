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
import values, {valueKey} from "@/constant-values.ts";

/*
function getOptions(table: string) {
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        async function retrieveOptions() {
            try {
                const response = await axios.get('/api/enum/' + table + '/');
                console.log('response from /api/enum/' + table + ' get', response.data);
                const options = response.data.map((department: string) => (
                    <SelectItem key={department} value={department} className={"bg-input hover:bg-accent"}>
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
*/



interface DropdownProps {
    tableName: valueKey ;
    //fieldName: string;
    onChange: (name:string, value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ tableName, onChange }) => {
    const options = values[tableName];

    const handleChange = (value:string) => {
        onChange(tableName, value);
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className={"bg-input"}>
                <SelectValue placeholder={'Select a ' + tableName}></SelectValue>
            </SelectTrigger>
            <SelectContent className={"bg-input"} >
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    );
};

export default Dropdown;