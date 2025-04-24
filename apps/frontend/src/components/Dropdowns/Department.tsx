import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import values, {valueKey} from "@/constant-values.ts";

interface DropdownProps {
    tableName: valueKey;
    fieldName: string;
    onChange: (name:string, value: string) => void;
    reset?: boolean;
    currentSelection?: string;
    mutuallyExclusiveOption?: string; //cant select this option from valueKey table
}

const Dropdown: React.FC<DropdownProps> = ({ tableName, fieldName, onChange, reset, currentSelection, mutuallyExclusiveOption}) => {
    let resetForm = true; //if submitted, resetForm will change and the key should change making the dropdown reset
    if (!reset) {resetForm = false;} else {resetForm = true;} //if statement because props.reset can be undefined

    let options = values[tableName]; //was const
    if (mutuallyExclusiveOption) { //given option to not include?
        options = values.building.filter((option) => { return option !== mutuallyExclusiveOption });
    }

    const handleChange = (value:string) => {
        onChange(fieldName, value);
    }

    return (
        <Select onValueChange={handleChange} key={resetForm.toString()}>
            {/*<Select onValueChange={handleChange}>*/}
             <SelectTrigger className={"bg-input"}>
                <SelectValue placeholder={'Select a ' + fieldName}></SelectValue>
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