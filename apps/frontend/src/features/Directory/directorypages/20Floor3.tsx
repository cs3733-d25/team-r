import {displaydept} from "./22floor4.tsx";

export function TwentyFloorThree(){
    return(
        <ul>
            <li onClick={() => displaydept("Surgical Specialties")} className={"hover:bg-[#67d1f5]"}>Surgical Specialties</li>
                <li onClick={() => displaydept("Audiology")} className={"hover:bg-[#67d1f5]"}>Audiology</li>
                <li onClick={() => displaydept("ENT")} className={"hover:bg-[#67d1f5]"}>ENT</li>
                <li onClick={() => displaydept("General and Gastrointestinal Surgery")} className={"hover:bg-[#67d1f5]"}>General and Gastrointestinal Surgery</li>
                <li onClick={() => displaydept("Plastic Surgery")} className={"hover:bg-[#67d1f5]"}>Plastic Surgery</li>
                <li onClick={() => displaydept("Thoracic Surgery")} className={"hover:bg-[#67d1f5]"}>Thoracic Surgery</li>
                <li onClick={() => displaydept("Vascular Surgery")} className={"hover:bg-[#67d1f5]"}>Vascular Surgery</li>
                <li onClick={() => displaydept("Weight Management and Wellness")} className={"hover:bg-[#67d1f5]"}>Weight Management and Wellness</li>
            <li onClick={() => displaydept("Sports")} className={"hover:bg-[#67d1f5]"}>Sports</li>
                <li onClick={() => displaydept("X-Ray Suite")} className={"hover:bg-[#67d1f5]"}>X-Ray Suite</li>
        </ul>
    )
}
export default TwentyFloorThree;