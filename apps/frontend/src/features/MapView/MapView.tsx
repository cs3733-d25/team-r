import Navbar from '../../components/Navbar.tsx';
import {APIProvider, Map, MapCameraChangedEvent, useMap, useMapsLibrary,} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import axios from 'axios';
import InternalMap from '../../components/InternalMap.tsx';

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
    // selectedLocation is the location selected by the user (patriotPlace or chestnutHill, default is patriotPlace)
    const [selectedLocation, setSelectedLocation] = useState<string>(patriotPlace);
    // startingLocation is the location entered by the user (current location)
    const [startingLocation, setStartingLocation] = useState<string>('');
    // department is the department selected by the user in the dropdown
    const [department, setDepartment] = useState<string>('');
    // parkingLot is the parking lot selected by the user in the dropdown
    const [parkingLot, setParkingLot] = useState<string>('');

    /**
     * getNearestReceptionNode function returns the nearest reception node given a department
     * @param department - One of the 5 departments
     */
    // TODO: find a better way to write this function for scalability on iteration 2 & 3
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

    /*TODO: figure out what the return of this function is and how to use it.
     *  does it return a json that we can then access? How can we access the
     *  fields of the object? */
    async function findDirectionsBFS() {
        const response = await axios.post('/api/bfs', {
            // converting the parking lot and department to the corresponding node IDs
            startPoint: getParkingLotNode(parkingLot),
            endPoint: getNearestReceptionNode(department),
        });
    }

    // Main rendering of the MapView component
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className={"text-4xl text-center p-4 font-bold"}>
                <p>Navigate to a Mass General Brigham location</p>
            </div>
            <div className="flex-grow w-full">
                {/* Google Maps Section with side-by-side layout */}
                <div className="flex flex-col md:flex-row w-full gap-4 p-4 items-center">
                    {/* Left side - Input controls */}
                    <div className="w-full md:w-1/3 flex flex-col space-y-4">
                        {/*Starting location input div*/}
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

                        {/*Select a location div*/}
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

                    {/* Right side - Google Maps */}
                    <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh]">
                        <APIProvider
                            apiKey={apiKey}
                            onLoad={() => console.log('Maps API has loaded.')}
                        >
                            <Map
                                defaultZoom={8}
                                defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                                onCameraChanged={(ev: MapCameraChangedEvent) =>
                                    console.log(
                                        'camera changed:',
                                        ev.detail.center,
                                        'zoom:',
                                        ev.detail.zoom
                                    )
                                }
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

                {/* -- START INTERNAL MAPPING PART -- */}

                <div className={'flex flex-col w-full items-center py-4'}>
                    <h1 className={'text-5xl font-bold'}>Arrived?</h1>
                    <p>Select your parking lot for guidance to your department!</p>
                </div>
                {/* Container for side-by-side layout */}
                <div className="flex flex-col md:flex-row w-full gap-4 p-4 justify-center">
                    {/* Left side - Form controls */}
                    <div className="w-full md:w-1/3 flex flex-col space-y-4">
                        {/*Select a parking lot div*/}
                        <div className="flex flex-col space-y-2">
                            <label className="font-medium">
                                Which parking lot did you park in?
                            </label>
                            <select
                                onChange={(e) => setParkingLot(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                value={parkingLot}
                            >
                                {/*TODO: pull parking lots from DB (if present)*/}
                                <option value="">Select a parking lot...</option>
                                <option>Extended Parking</option>
                                <option>Patient Parking</option>
                                <option>Valet Parking</option>
                            </select>
                        </div>

                        {/*Department dropdown div*/}
                        <div className="flex flex-col space-y-2">
                            <label className="font-medium">
                                Which department are you travelling to?
                            </label>
                            <select
                                onChange={(e) => setDepartment(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                                value={department}
                            >
                                {/*TODO: pull departments from DB instead of this*/}
                                <option value="">Select a department...</option>
                                <option>Specialty Clinic</option>
                                <option>Imaging Suite</option>
                                <option>Phlebotomy</option>
                                <option>Pharmacy</option>
                                <option>Ambulatory/Urgent Care</option>
                            </select>
                        </div>
                    </div>

                    {/* Right side - Internal Map */}
                    <div className="w-full md:w-2/3">
                        {/*Canvas that contains markers for internal routing*/}
                        {/*TODO: create markers for each entrance*/}
                        {/*TODO: figure how to take output from bfs algo and draw the corresponding markers*/}
                        {/*TODO: figure out how to then connect markers with a line*/}
                        {/*TODO: Marker coordinates are based off image size, and image changes size depending on screen
        {/*These markers are here as I was trying to find the x and y value for each node, these should be removed once a
            need to find a way to perma link coordinates or prevent map size from changing
                        suitable way to link node and marker parameters are found*/}

                        {/*manually showing images depending on the parking lot and department*/}
                        <InternalMap
                            parkingLot={getParkingLotNode(parkingLot)}
                            reception={getNearestReceptionNode(department)}
                        />
                    </div>
                </div>
                {/*<ImageCanvas
                    markers={[
                        {
                            x: 130,
                            y: 150,
                            label: 'Google Maps Dropoff',
                        },
                        {
                            x: 200,
                            y: 450,
                            label: 'Patient Parking',
                        },
                        {
                            x: 200,
                            y: 580,
                            label: 'Extended Parking',
                        },
                        {
                            x: 540,
                            y: 270,
                            label: 'Valet Parking',
                        },
                        {
                            x: 400,
                            y: 320,
                            label: 'Reception 1',
                        },
                        {
                            x: 500,
                            y: 470,
                            label: 'Reception 2',
                        },
                        {
                            x: 675,
                            y: 620,
                            label: 'Reception 3',
                        },
                    ]}
                />*/}
            </div>
        </div>
    );
}

/**
 * Directions component, handles the Google Maps directions
 * @param props - props.selectedLocation and props.startingLocation
 * @constructor
 */
function Directions(props: { selectedLocation: string; startingLocation: string }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
    const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
    useEffect(() => {
        if (!map || !routesLibrary) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new google.maps.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    // useEffect to render the directions on the map
    useEffect(() => {
        if (!directionService || !directionRenderer) return;

        directionService
            .route({
                // Origin is the starting location entered by the user (current location)
                origin: props.startingLocation,
                // Destination is the selected location (Patriot Place or Chestnut Hill)
                destination: props.selectedLocation,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionRenderer.setDirections(response);
            });
    }, [directionService, directionRenderer, props.selectedLocation, props.startingLocation]);

    // Not entirely sure why we need to return null, but works just fine
    return null;
}

export default MapView;
