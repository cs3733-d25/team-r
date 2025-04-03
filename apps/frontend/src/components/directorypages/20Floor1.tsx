import {displaydept} from "./22floor4.tsx";
export function TwentyFloorOne(){
    return(
        <ul>
            <li onClick={() => displaydept("Blood Draw/Phlebotomy")} className={"hover:bg-[#67d1f5]"}>Blood Draw/Phlebotomy</li>
            <li onClick={() => displaydept("Pharmacy")} className={"hover:bg-[#67d1f5]"}>Pharmacy</li>
            <li onClick={() => displaydept("Radiology")} className={"hover:bg-[#67d1f5]"}>Radiology</li>
            <li onClick={() => displaydept("Cardiovascular Services")} className={"hover:bg-[#67d1f5]"}>Cardiovascular Services</li>
            <li onClick={() => displaydept("Urology")} className={"hover:bg-[#67d1f5]"}>Urology</li>
            <li onClick={() => displaydept("Urgent Care Center")} className={"hover:bg-[#67d1f5]"}>Urgent Care Center</li>
        </ul>
    )
}
export default TwentyFloorOne;