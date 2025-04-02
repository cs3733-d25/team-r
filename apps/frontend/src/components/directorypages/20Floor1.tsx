import {displaydept} from "./22floor4.tsx";
export function TwentyFloorOne(){
    return(
        <ul>
            <li onClick={() => displaydept("Blood Draw/Phlebotomy")}>Blood Draw/Phlebotomy</li>
            <li onClick={() => displaydept("Pharmacy")}>Pharmacy</li>
            <li onClick={() => displaydept("Radiology")}>Radiology</li>
            <li onClick={() => displaydept("Cardiovascular Services")}>Cardiovascular Services</li>
            <li onClick={() => displaydept("Urology")}>Urology</li>
            <li onClick={() => displaydept("Urgent Care Center")}>Urgent Care Center</li>
        </ul>
    )
}
export default TwentyFloorOne;