import {displaydept} from "./22floor4.tsx";

export function TwentyFloorFour(){
    return(
        <ul>
            <li onClick={() => displaydept("Electromyography")} className={"hover:bg-[#67d1f5]"}>Electromyography</li>
            <li onClick={() => displaydept("Nutrition")} className={"hover:bg-[#67d1f5]"}>Nutrition</li>
            <li onClick={() => displaydept("Pain Medicine")} className={"hover:bg-[#67d1f5]"}>Pain Medicine</li>
            <li onClick={() => displaydept("Physiatry")} className={"hover:bg-[#67d1f5]"}>Physiatry</li>
            <li onClick={() => displaydept("Pulmonary Function Testing")} className={"hover:bg-[#67d1f5]"}>Pulmonary Function Testing</li>
            <li onClick={() => displaydept("Day Surgery Center")} className={"hover:bg-[#67d1f5]"}>Day Surgery Center</li>
        </ul>
    )
}

export default TwentyFloorFour;