import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import values, {valueKey} from "@/constant-values.ts";
import axios from "axios";
import {useEffect, useState} from "react";

interface DropdownProps {
    tableName?: valueKey; //make optional so dropdown can be used for db
    fieldName: string;
    onChange: (name:string, value: string) => void;
    reset?: boolean;
    currentSelection?: string;
    mutuallyExclusiveOption?: string; //cant select this option from valueKey table
    alternateFieldName?: string; //in case the field name is not user-friendly
    customOptions?: string;
}

/**
 *
 * @param tableName ->
 * @param customOptions -> works for employees - request employee names from database
 * @param fieldName
 * @param onChange
 * @param reset
 * @param currentSelection
 * @param mutuallyExclusiveOption
 * @param alternateFieldName
 * @constructor
 */
const Dropdown: React.FC<DropdownProps> = ({ tableName, customOptions, fieldName, onChange, reset, currentSelection, mutuallyExclusiveOption, alternateFieldName}) => {
    //let resetForm = true; //if submitted, resetForm will change and the key should change making the dropdown reset
    //if (!reset) {resetForm = false;} else {resetForm = true;} //if statement because props.reset can be undefined

    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const getOptions = async () => {
            if (customOptions === 'employees') {
                try {
                    const response = await axios.get('/api/employee/assigned');
                    const names = response.data.map((emp: any) => `${emp.id} `);
                    setOptions(names);
                } catch (error) {
                    console.error("Error loading employee options:", error);
                }
            } else if (tableName) {
                let defaultOptions = values[tableName];
                if (mutuallyExclusiveOption) {
                    defaultOptions = defaultOptions.filter(option => option !== mutuallyExclusiveOption);
                }
                setOptions(defaultOptions);
            }
        };

        getOptions();
    }, [tableName, customOptions, mutuallyExclusiveOption]);

    const resetForm = !!reset;

    const handleChange = (value: string) => {
        onChange(fieldName, value);
    };

    return (
        <Select onValueChange={handleChange} key={resetForm.toString()}>
            {/*<Select onValueChange={handleChange}>*/}
             <SelectTrigger className={"bg-input"}>
                <SelectValue placeholder={alternateFieldName ? 'Select a ' + alternateFieldName : 'Select a ' + fieldName}></SelectValue>
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