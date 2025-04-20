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

interface DropdownProps {
    tableName: string;
    fieldName: string;
    onChange: (name:string, value: string) => void;
    reset?: boolean;
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
    let resetForm = true; //if submitted, resetForm will change and the key should change making the dropdown reset
    if (!props.reset) {resetForm = false;} else {resetForm = true;} //if statement becasue props.reset can be undefined

    const handleChange = (value:string) => {
        props.onChange(props.fieldName, value);
    }

    return (
        <Select onValueChange={handleChange} key={resetForm.toString()}>
            <SelectTrigger className={"bg-input"}>
                <SelectValue placeholder={'Select a ' + props.fieldName}></SelectValue>
            </SelectTrigger>
            <SelectContent className={"bg-input"} >
                <SelectGroup>
                    {getOptions(props.tableName)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default Dropdown;
