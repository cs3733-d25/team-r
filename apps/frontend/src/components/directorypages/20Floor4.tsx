import {displaydept} from "./22floor4.tsx";

export function TwentyFloorFour(){
    return(
        <ul>
            <li onClick={() => displaydept("Electromyography")}>Electromyography</li>
            <li onClick={() => displaydept("Nutrition")}>Nutrition</li>
            <li onClick={() => displaydept("Pain Medicine")}>Pain Medicine</li>
            <li onClick={() => displaydept("Physiatry")}>Physiatry</li>
            <li onClick={() => displaydept("Pulmonary Function Testing")}>Pulmonary Function Testing</li>
            <li onClick={() => displaydept("Day Surgery Center")}>Day Surgery Center</li>
        </ul>
    )
}

export default TwentyFloorFour;