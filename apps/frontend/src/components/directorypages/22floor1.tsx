import {displaydept} from "./22floor4.tsx";

export function Floor22_1() {
    return (
        <div className={"floor-22-1"}>
            Floor 1:
            <ul>
                <li onClick={() => displaydept('MassGeneral Hospital for Children')}>MassGeneral Hospital for Children</li>
                <li onClick={() => displaydept('Spaulding Outpatient Center for Children')}>Spaulding Outpatient Center for Children</li>
            </ul>
        </div>
    )
}