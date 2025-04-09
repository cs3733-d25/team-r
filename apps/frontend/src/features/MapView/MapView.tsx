import Navbar from '../../components/Navbar.tsx';
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCanvas from '../../components/ImageCanvas.tsx';
import InternalMap from "../../components/InternalMap.tsx";


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
    // async function findDirectionsBFS() {
    //     const response = await axios.post('/api/bfs', {
    //         // converting the parking lot and department to the corresponding node IDs
    //         startPoint: getParkingLotNode(parkingLot),
    //         endPoint: getNearestReceptionNode(department),
    //     });
    //

  async function findDirectionBFS() {
    try {
      // Only should go if both parking lot and department are selectedLocation
      if (!parkingLot || !department) {
        alert("please select a parking lot and a department");
        return;
      }

      const startNode = getParkingLotNode(parkingLot);
      const endNode = getNearestReceptionNode(department);

      console.log(`Finding path from ${startNode} (${parkingLot}) to ${endNode} (${department})`);

      const response = await axios.post('/api/bfs', {
        // irrc backend should want a startingPoint/endingPoint hopefully not a smoothbrain moment
        startingPoint: startNode,
        endingPoint: endNode,
      });

      // loging our response data
      console.log('path found:', response.data);

      //alertig user
      alert(`Path found: ${response.data.join(' → ')}`);
    } catch (error) {
      console.error('Error finding path:', error);
      alert('An error occurred while finding the path.');
    }
  }

    // Main rendering of the MapView component
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow w-full">
                {/*Starting location input div*/}
                <div className="flex items-center justify-between w-full p-2">
                    <label>Starting location:</label>
                    <div className={'flex space-x-2 p-2 justify-end'}>
                        <input
                            value={startingLocation}
                            className="ml-2 p-2 border border-gray-300 rounded"
                            type="text"
                            onChange={(e) => setStartingLocation(e.target.value)}
                        />
                    </div>
                </div>
                {/*Department dropdown div*/}
                <div className="flex items-center justify-between w-full p-2">
                    <label>Department:</label>
                    <div className={'flex space-x-2 p-2 justify-end'}>
                        <select
                            onChange={(e) => setDepartment(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded"
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
                {/*Select a location div*/}
                <div className="flex items-center justify-between w-full p-2">
                    <h3 className={'font-sans'}>Select an MGH location:</h3>
                    <div className="flex p-2 justify-end">
                        <div className={'flex space-x-2'}>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800"
                                onClick={() => {
                                    setSelectedLocation(patriotPlace);
                                }}
                            >
                                Patriot Place
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800"
                                onClick={() => {
                                    setSelectedLocation(chestnutHill);
                                }}
                            >
                                Chestnut Hill
                            </button>
                        </div>
                    </div>
                </div>
                {/*Google maps part*/}
                <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                    <div className="w-full h-[70vh]">
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
                    </div>
                </APIProvider>
                {/*Start of internal map part (Arrived?)*/}
                <div className={'flex flex-col w-full items-center py-4'}>
                    <h1 className={'text-6xl font-bold'}>Arrived?</h1>
                    <p>Select your parking lot for guidance to your department!</p>
                </div>
                {/*Select a parking lot div*/}
                <div className="flex items-center justify-between w-full p-2">
                    <label>Parking Lot:</label>
                    <div className={'flex space-x-2 p-2 justify-end'}>
                        <select
                            onChange={(e) => setParkingLot(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded"
                        >
                            {/*TODO: pull parking lots from DB (if present)*/}
                            <option value="">Select a parking lot...</option>
                            <option>Extended Parking</option>
                            <option>Patient Parking</option>
                            <option>Valet Parking</option>
                        </select>
                    </div>
                </div>
                {/*Canvas that contains markers for internal routing*/}
                {/*TODO: create markers for each entrance*/}
                {/*TODO: figure how to take output from bfs algo and draw the corresponding markers*/}
                {/*TODO: figure out how to then connect markers with a line*/}
                {/*TODO: Marker coordinates are based off image size, and image changes size depending on screen
                    need to find a way to perma link coordinates or prevent map size from changing*/}
                {/*These markers are here as I was trying to find the x and y value for each node, these should be removed once a
                suitable way to link node and marker parameters are found*/}

                {/*manually showing images depending on the parking lot and department*/}
                <InternalMap parkingLot={getParkingLotNode(parkingLot)} reception={getNearestReceptionNode(department)}/>
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
