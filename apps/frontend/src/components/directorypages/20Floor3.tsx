import {displaydept} from "./22floor4.tsx";

export function TwentyFloorThree(){
    return(
        <ul>
            <li onClick={() => displaydept("Surgical Specialties")}>Surgical Specialties</li>
                <li onClick={() => displaydept("Audiology")}>Audiology</li>
                <li onClick={() => displaydept("ENT")}>ENT</li>
                <li onClick={() => displaydept("General and Gastrointestinal Surgery")}>General and Gastrointestinal Surgery</li>
                <li onClick={() => displaydept("Plastic Surgery")}>Plastic Surgery</li>
                <li onClick={() => displaydept("Thoracic Surgery")}>Thoracic Surgery</li>
                <li onClick={() => displaydept("Vascular Surgery")}>Vascular Surgery</li>
                <li onClick={() => displaydept("Weight Management and Wellness")}>Weight Management and Wellness</li>
            <li onClick={() => displaydept("Sports")}>Sports</li>
                <li onClick={() => displaydept("X-Ray Suite")}>X-Ray Suite</li>
        </ul>
    )
}
export default TwentyFloorThree;