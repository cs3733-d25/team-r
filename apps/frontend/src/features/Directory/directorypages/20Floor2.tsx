import {displaydept} from "./22floor4.tsx";

export function TwentyFloorTwo(){
    return (
        <ul>
            <li onClick={() => displaydept("Orthopaedics")} className={"hover:bg-[#67d1f5]"}>Orthopaedics</li>
                <li onClick={() => displaydept("Hand and Upper Extremity")} className={"hover:bg-[#67d1f5]"}>Hand and Upper Extremity</li>
                <li onClick={() => displaydept("Arthroplasty")} className={"hover:bg-[#67d1f5]"}>Arthroplasty</li>
                <li onClick={() => displaydept("Pediatric Trauma")} className={"hover:bg-[#67d1f5]"}>Pediatric Trauma</li>
                <li onClick={() => displaydept("Physiatry")} className={"hover:bg-[#67d1f5]"}>Physiatry</li>
                <li onClick={() => displaydept("Podiatry")} className={"hover:bg-[#67d1f5]"}>Podiatry</li>

            <li onClick={() => displaydept("Rehabilitation Services")} className={"hover:bg-[#67d1f5]"}>Rehabilitation Services</li>

                <li onClick={() => displaydept("Cardiac Rehab")} className={"hover:bg-[#67d1f5]"}>Cardiac Rehab</li>
                <li onClick={() => displaydept("Occupational Therapy")} className={"hover:bg-[#67d1f5]"}>Occupational Therapy</li>

                    <li onClick={() => displaydept("Hand Therapy")} className={"hover:bg-[#67d1f5]"}>Hand Therapy</li>
                    <li onClick={() => displaydept("Upper Extremity")} className={"hover:bg-[#67d1f5]"}>Upper Extremity</li>

                <li onClick={() => displaydept("Physical Therapy")} className={"hover:bg-[#67d1f5]"}>Physical Therapy</li>
                <li onClick={() => displaydept("Speech - Language")} className={"hover:bg-[#67d1f5]"}>Speech - Language</li>

            <li onClick={() => displaydept("Clinical Labs")} className={"hover:bg-[#67d1f5]"}>Clinical Lab</li>
            <li onClick={() => displaydept("Surgi-Care")} className={"hover:bg-[#67d1f5]"}>Surgi-Care</li>
        </ul>
    )
}
export default TwentyFloorTwo;