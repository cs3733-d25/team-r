import {displaydept} from "./22floor4.tsx";

export function Floor22_3() {
    return (
        <div className={'floor-22-3'}>
            <ul>
                <li onClick={() => displaydept('Multi Specialty Clinic')} className={"hover:bg-[#67d1f5]"}>
                    Multi Specialty Clinic
                </li>
                <li onClick={() => displaydept('Allergy')} className={"hover:bg-[#67d1f5]"}>Allergy</li>
                <li onClick={() => displaydept('Cardiac Arrythmia')} className={"hover:bg-[#67d1f5]"}>Cardiac Arrythmia</li>
                <li onClick={() => displaydept('Dermatology')} className={"hover:bg-[#67d1f5]"}>Dermatology</li>
                <li onClick={() => displaydept('Endocrinology')} className={"hover:bg-[#67d1f5]"}>Endocrinology</li>
                <li onClick={() => displaydept('Gastroenterology')} className={"hover:bg-[#67d1f5]"}>Gastroenterology</li>
                <li onClick={() => displaydept('Kidney (Renal) Medicine')} className={"hover:bg-[#67d1f5]"}>
                    Kidney (Renal) Medicine
                </li>
                <li onClick={() => displaydept('Neurology')} className={"hover:bg-[#67d1f5]"}>Neurology</li>
                <li onClick={() => displaydept('Neurosurgery')} className={"hover:bg-[#67d1f5]"}>Neurosurgery</li>
                <li onClick={() => displaydept('Ophthalmology')} className={"hover:bg-[#67d1f5]"}>Ophthalmology</li>
                <li onClick={() => displaydept('Optometry')} className={"hover:bg-[#67d1f5]"}>Optometry</li>
                <li onClick={() => displaydept('Pulmonology')} className={"hover:bg-[#67d1f5]"}>Pulmonology</li>
                <li onClick={() => displaydept('Rheumatology')} className={"hover:bg-[#67d1f5]"}>Rheumatology</li>
                <li onClick={() => displaydept('Vein Care Services')} className={"hover:bg-[#67d1f5]"}>Vein Care Services</li>
                <li onClick={() => displaydept("Women's Health")} className={"hover:bg-[#67d1f5]"}>Women's Health</li>
                <li onClick={() => displaydept('Patient Financial Services')} className={"hover:bg-[#67d1f5]"}>
                    Patient Financial Services
                </li>
            </ul>
        </div>
    );
}