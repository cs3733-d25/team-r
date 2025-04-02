import {displaydept} from "./22floor4.tsx";

export function TwentyFloorTwo(){
    return (
        <ul>
            <li onClick={() => displaydept("Orthopaedics")}>Orthopaedics</li>
                <li onClick={() => displaydept("Hand and Upper Extremity")}>Hand and Upper Extremity</li>
                <li onClick={() => displaydept("Arthroplasty")}>Arthroplasty</li>
                <li onClick={() => displaydept("Pediatric Trauma")}>Pediatric Trauma</li>
                <li onClick={() => displaydept("Physiatry")}>Physiatry</li>
                <li onClick={() => displaydept("Podiatry")}>Podiatry</li>

            <li onClick={() => displaydept("Rehabilitation Services")}>Rehabilitation Services</li>

                <li onClick={() => displaydept("Cardiac Rehab")}>Cardiac Rehab</li>
                <li onClick={() => displaydept("Occupational Therapy")}>Occupational Therapy</li>

                    <li onClick={() => displaydept("Hand Therapy")}>Hand Therapy</li>
                    <li onClick={() => displaydept("Upper Extremity")}>Upper Extremity</li>

                <li onClick={() => displaydept("Physical Therapy")}>Physical Therapy</li>
                <li onClick={() => displaydept("Speech - Language")}>Speech - Language</li>

            <li onClick={() => displaydept("Clinical Labs")}>Clinical Lab</li>
            <li onClick={() => displaydept("Surgi-Care")}>Surgi-Care</li>
        </ul>
    )
}
export default TwentyFloorTwo;