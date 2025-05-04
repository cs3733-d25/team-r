import { Mic } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useMapData } from '@/features/MapView/mapService.ts';

/**
 * VoiceControlProps
 * selectedBuilding - the building to get the parking lots and departments from
 * onParkingLotSelected - callback function to be called when a parking lot is selected
 * onDepartmentSelected - callback function to be called when a department is selected
 * onSelectionComplete - callback function to be called when both selections are made
 */
interface VoiceControlProps {
    selectedBuilding: string;
    onParkingLotSelected?: (lotId: string) => void;
    onDepartmentSelected?: (deptId: string) => void;
    onSelectionComplete?: (parkingLotId: string, departmentId: string) => void;
}

/**
 * VoiceControl component - handles the voice control functionality
 * @param selectedBuilding - the current building the user is at
 * @param onParkingLotSelected - callback function to be called when a parking lot is selected
 * @param onDepartmentSelected - callback function to be called when a department is selected
 * @param onSelectionComplete - callback function to be called when both selections are made
 * @constructor
 */
export function VoiceControl({
    selectedBuilding,
    onParkingLotSelected,
    onDepartmentSelected,
    onSelectionComplete,
}: VoiceControlProps) {
    // gets the current building object, which provides access to the parking lots and departments
    const building = useMapData(selectedBuilding);
    const [parkingLot, setParkingLot] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    //some names aren't recognized by voice recognition, so replaces it with what the user would likely try to pronounce it as
    const altNames = new Map<string, string>([
        ['Blood Draw/Phlebotomy', 'blood draw / phlebotomy'],
        ['Orthopaedics', 'orthopedics'],
        ['Speech - Language', 'speech language'],
        ['Surgi-Care', 'surgicare'],
        ['MassGeneral Hospital for Children', 'mass general hospital for children'],
        ['Spaulding Outpatient Care for Children', 'spalding outpatient care for children'],
        ['Multi Specialty Clinic', 'multi-specialty clinic'],
        ['Kidney (Renal) Medicine', 'kidney renal medicine'],
        ['Radiology (MRI/CT Scan)', 'radiology mri ct scan'],
        ['Brigham Dermatology Associates (BDA)', 'brigham dermatology associates'],
        ['Brigham Physicians Group (BPG)', 'brigham physicians group'],
        [
            "Gretchen S. and Edward A. Fish Center for Women's Health",
            "gretchen s and edward a fish center for women's health",
        ],
        [
            'Brigham Obstetrics and Gynecology Group (BOGG)',
            'brigham obstetrics and gynecology group',
        ],
        ['Taiclet Family Center', 'takelet family center'],
        ['Psychiatric/Addiction Recovery', 'psychiatric / addiction recovery'],
        ['Gynecology & Oncology', 'gynecology and oncology'],
        ['Huvos Auditorium', 'juvos auditorium'],
        ['Sadowsky Conference Room', 'sadowski conference room'],
        ['Endocrinology/Diabetes/Hemotology', 'endocrinology/diabetes/hematology'],
        ['Orthopaedic Associates', 'orthopedic associates'],
        ['Ambulatory Radiology (X-ray & CT scan)', 'ambulatory radiology x-ray and ct scan'],
        ['Breast Imaging, Lee Bell Center', 'breast imaging lee bell center'],
        ['Brigham Circle Medical Associates (BCMA)', 'brigham circle medical associates'],
        [
            'Center for Weight Management & Metabolic Surgery',
            'center for weight management and metabolic surgery',
        ],
        ['Endocrine – Diabetes', 'endocrine diabetes'],
        ['Gastroenterology & Hepatology', 'gastroenterology and hepatology'],
        ['Genetics & Genomics Medicine', 'genetics and genomics medicine'],
        ['Chest Diseases, Center for', 'chest diseases center for'],
        ['Ear, Nose and Throat (ENT)', 'ear nose and throat'],
        ['Echocardiography Lab (ECHO)', 'echocardiography lab'],
        ['Plastic & Reconstructive Surgery', 'plastic and reconstructive surgery'],
        ['Weiner Center for Pre-Op Evaluation', 'wiener center for pre-op evaluation'],
    ]);

    /**
     * commands is an array of objects that define the commands for the speech recognition
     * command - the command to be recognized
     * callback - function to be called when the command is recognized
     */
    const commands = [
        {
            command: 'stop listening',
            callback: () => {
                SpeechRecognition.stopListening();
                console.log('Stopped listening');
            },
        },
        {
            command: 'reset',
            callback: () => {
                resetTranscript();
                console.log('Reset transcript');
            },
        },
    ];

    /**
     * useSpeechRecognition is a hook that provides the speech recognition functionality
     */
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        listening,
    } = useSpeechRecognition({ commands });

    /**
     * useEffect that handles action when the final transcript is received
     */
    useEffect(() => {
        console.log('Selected building:', selectedBuilding);
        console.log('Building departments:', building.departments);
        const parkingLots = building.parkingLots.filter(
            (parkingLot) => parkingLot.building === selectedBuilding
        );
        console.log('Parking lots:', parkingLots);

        if (!finalTranscript) return;
        // Handle the final transcript here
        console.log('Transcript:', finalTranscript);

        // checking for parking lot matches in the transcript
        for (const lot of parkingLots) {
            if (finalTranscript.toLowerCase().includes(lot.shortName.toLowerCase())) {
                console.log(`Found parking lot: ${lot.longName} at ${selectedBuilding}`);
                setParkingLot(lot.nodeID);
                if (onParkingLotSelected) onParkingLotSelected(lot.nodeID);
                break;
            }
        }

        for (const dept of building.departments) {
            const altName = altNames.get(dept.name);
            if (typeof altName === 'string') {
                dept.name = altName;
            }
        }

        // Check for department matches in the transcript
        for (const dept of building.departments) {
            if (finalTranscript.toLowerCase().includes(dept.name.toLowerCase())) {
                console.log(`Found department: ${dept.name}`);
                setDepartment(dept.id);
                if (onDepartmentSelected) onDepartmentSelected(dept.id);
                break;
            }
        }
    }, [
        finalTranscript,
        building.parkingLots,
        building.departments,
        onParkingLotSelected,
        onDepartmentSelected,
    ]);

    useEffect(() => {
        // If we have both a parking lot and department selected via voice
        if (parkingLot && department && onSelectionComplete) {
            // Notify the parent component that both selections are made
            onSelectionComplete(parkingLot, department);

            // Reset local state
            setParkingLot('');
            setDepartment('');
            resetTranscript();
        }
    }, [parkingLot, department, onSelectionComplete]);

    /**
     * handleVoiceControl is the main body of the voice control functionality
     * it starts and stops the speech recognition
     */
    const handleVoiceControl = () => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert('Your browser does not support speech recognition');
        } else {
            if (!listening) {
                // reset transcript before next listen
                resetTranscript();
                // Start listening
                SpeechRecognition.startListening({ continuous: true, language: 'en' });
                console.log('Listening...');
                // might be nice to add a sound to indicate that the mic is on...
            } else {
                // Stop listening
                SpeechRecognition.stopListening();
                console.log('Stopped listening');
                resetTranscript();
            }
        }
    };

    return (
        <>
            <button>
                <Mic
                    className={`text-3xl ${listening ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={handleVoiceControl}
                    title={listening ? 'Stop Listening' : 'Start Listening'}
                />
            </button>
            {listening && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-md w-full z-50 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-gray-500">Listening...</h4>
                        <p className="text-md">{transcript || 'Speak now...'}</p>
                    </div>
                </div>
            )}
        </>
    );
}
