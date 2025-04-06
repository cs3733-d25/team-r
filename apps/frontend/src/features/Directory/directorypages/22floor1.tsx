import {displaydept} from "./22floor4.tsx";

export function Floor22_1() {
    return (
        <div className={"floor-22-1"}>
            <ul>
                <li onClick={() => displaydept('MassGeneral Hospital for Children')} className={"hover:bg-[#67d1f5]"}>MassGeneral Hospital for Children</li>
                <li onClick={() => displaydept('Spaulding Outpatient Center for Children')} className={"hover:bg-[#67d1f5]"}>Spaulding Outpatient Center for Children</li>
            </ul>
        </div>
    )
}