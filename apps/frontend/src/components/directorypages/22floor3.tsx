import {displaydept} from "./22floor4.tsx";

export function Floor22_3() {
    return (
        <div className={'floor-22-3'}>
            Floor 3:
            <ul>
                <li onClick={() => displaydept('Multi Specialty Clinic')}>
                    Multi Specialty Clinic
                </li>
                <li onClick={() => displaydept('Allergy')}>Allergy</li>
                <li onClick={() => displaydept('Cardiac Arrythmia')}>Cardiac Arrythmia</li>
                <li onClick={() => displaydept('Dermatology')}>Dermatology</li>
                <li onClick={() => displaydept('Endocrinology')}>Endocrinology</li>
                <li onClick={() => displaydept('Gastroenterology')}>Gastroenterology</li>
                <li onClick={() => displaydept('Kidney (Renal) Medicine')}>
                    Kidney (Renal) Medicine
                </li>
                <li onClick={() => displaydept('Neurology')}>Neurology</li>
                <li onClick={() => displaydept('Neurosurgery')}>Neurosurgery</li>
                <li onClick={() => displaydept('Ophthalmology')}>Ophthalmology</li>
                <li onClick={() => displaydept('Optometry')}>Optometry</li>
                <li onClick={() => displaydept('Pulmonology')}>Pulmonology</li>
                <li onClick={() => displaydept('Rheumatology')}>Rheumatology</li>
                <li onClick={() => displaydept('Vein Care Services')}>Vein Care Services</li>
                <li onClick={() => displaydept("Women's Health")}>Women's Health</li>
                <li onClick={() => displaydept('Patient Financial Services')}>
                    Patient Financial Services
                </li>
            </ul>
        </div>
    );
}