import Navbar from '../../components/Navbar.tsx';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import axios from 'axios';
import InternalMap from '../../features/MapView/InternalMap.tsx';
import Directions from './Directions.tsx';

/**
 * MapView component, returns both the Google map and canvas image (floor plan)
 * @constructor
 */
function MapView() {
    // Get the Google maps API key from environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // Addresses of the two locations
    const patriotPlace = 'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035';
    const chestnutHill = '850 Boylston St, Chestnut Hill, MA 02467';

    /* -- State variables -- */
    const [selectedLocation, setSelectedLocation] = useState<string>(patriotPlace);
    const [startingLocation, setStartingLocation] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [parkingLot, setParkingLot] = useState<string>('');
    const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>([]);
    const [path, setPath] = useState<string[]>([]);

    /**
     * getNearestReceptionNode function returns the nearest reception node given a department
     * @param department - One of the 5 departments
     */
    const getNearestReceptionNode = (department: string) => {
        switch (department) {
            case 'Specialty Clinic':
                return 'r3';
            case 'Imaging Suite':
                return 'r2';
            case 'Phlebotomy':
                return 'r2';
            case 'Pharmacy':
                return 'r2';
            case 'Ambulatory/Urgent Care':
                return 'r2';
            default:
                return '';
        }
    };

    /**
     * getParkingLotNode function returns the parking lot node based on a parking lot
     * @param parkingLot - One of the 3 parking lots
     */
    const getParkingLotNode = (parkingLot: string) => {
        switch (parkingLot) {
            case 'Extended Parking':
                return 'p1';
            case 'Patient Parking':
                return 'p2';
            case 'Valet Parking':
                return 'p3';
            default:
                return '';
        }
    };

    /**
     * findDirectionsBFS calls the BFS API to find the directions from the parking lot to the department
     */
        // In MapView.tsx, update the BFS function
    const findDirectionBFS = async () => {
            try {
                // ... existing code ...

                const response = await axios.post('/api/bfs', {
                    startingPoint: getParkingLotNode(parkingLot),
                    endingPoint: getNearestReceptionNode(department),
                });

                // Set the path as an array of node IDs
                setPath(response.data); // Assuming response.data is ['p2', 'e2', 'r2', etc.]

                // You can also still compute coordinates if needed
                const path = response.data.map((nodeId: string) => mapNodeToCoordinates(nodeId));
                setPathCoordinates(path);

                alert(`Path found: ${response.data.join(' → ')}`);
            } catch (error) {
                console.error('Error finding path:', error);
                alert('An error occurred while finding the path.');
            }
        };


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="text-4xl text-center p-4 font-bold">
                <p>Navigate to a Mass General Brigham location</p>
            </div>
            <div className="flex-grow w-full">
                <div className="flex flex-col md:flex-row w-full gap-4 p-4 items-center">
                    <div className="w-full md:w-1/3 flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2 w-full">
                            <label className="font-medium">Enter your starting location:</label>
                            <input
                                value={startingLocation}
                                className="p-2 border border-gray-300 rounded w-full"
                                type="text"
                                onChange={(e) => setStartingLocation(e.target.value)}
                                placeholder="Enter your starting location"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                            <h3 className="font-medium">Select an MGH location:</h3>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <button
                                    type="button"
                                    className={`px-4 py-2 text-white rounded flex-1 box-border ${selectedLocation === patriotPlace ? 'bg-blue-700 border-black border-4' : 'bg-blue-500 hover:bg-blue-700'}`}
                                    onClick={() => setSelectedLocation(patriotPlace)}
                                >
                                    Patriot Place
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 text-white rounded flex-1 box-border ${selectedLocation === chestnutHill ? 'bg-blue-700 border-black border-4' : 'bg-blue-500 hover:bg-blue-700'}`}
                                    onClick={() => setSelectedLocation(chestnutHill)}
                                >
                                    Chestnut Hill
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh]">
                        <APIProvider apiKey={apiKey}>
                            <Map
                                defaultZoom={8}
                                defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                                className={'w-full h-full'}
                                fullscreenControl={false}
                            />
                            <Directions
                                selectedLocation={selectedLocation}
                                startingLocation={startingLocation}
                            />
                        </APIProvider>
                    </div>
                </div>

                <div className={'flex flex-col w-full items-center py-4'}>
                    <h1 className={'text-5xl font-bold'}>Arrived?</h1>
                    <p>Select your parking lot for guidance to your department!</p>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-4 p-4 justify-center">
                    <div className="w-full md:w-1/3 flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="font-medium">Which parking lot did you park in?</label>
                            <select
                                onChange={(e) => setParkingLot(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                value={parkingLot}
                            >
                                <option value="">Select a parking lot...</option>
                                <option>Extended Parking</option>
                                <option>Patient Parking</option>
                                <option>Valet Parking</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="font-medium">Which department are you travelling to?</label>
                            <select
                                onChange={(e) => setDepartment(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                value={department}
                            >
                                <option value="">Select a department...</option>
                                <option>Specialty Clinic</option>
                                <option>Imaging Suite</option>
                                <option>Phlebotomy</option>
                                <option>Pharmacy</option>
                                <option>Ambulatory/Urgent Care</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh]">
                        {/* Pass pathCoordinates prop to InternalMap */}
                        <InternalMap path={path} pathCoordinates={pathCoordinates} />
                    </div>
                </div>

                {/* Button to trigger BFS pathfinding */}
                <div className="w-full text-center mt-4">
                    <button
                        onClick={findDirectionBFS}
                        className="px-6 py-3 bg-blue-500 text-white rounded"
                    >
                        Find Path
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * mapNodeToCoordinates maps a node ID to its corresponding coordinates.
 * @param nodeId - The node ID (string) that needs to be mapped to coordinates
 * @returns The coordinates corresponding to the node (latitude, longitude)
 */
const mapNodeToCoordinates = (nodeId: string): [number, number] => {
    const nodeCoordinates: Record<string, [number, number]> = {
        r1: [0, 0], // Example coordinates for node 'r1'
        r2: [0, 0], // Example coordinates for node 'r2'
        r3: [0, 0], // Example coordinates for node 'r3'
        p1: [42.273000, -71.807000], // Example coordinates for node 'p1' (Extended Parking)
        p2: [42.272000, -71.806000], // Example coordinates for node 'p2' (Patient Parking)
        p3: [42.271000, -71.805000], // Example coordinates for node 'p3' (Valet Parking)
    };

    return nodeCoordinates[nodeId] || [0, 0]; // Return [0, 0] if nodeId is not found
};

export default MapView;