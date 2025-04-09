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

function MapView() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const patriotPlace = 'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035';
    const chestnutHill = '850 Boylston St, Chestnut Hill, MA 02467';
    const [selectedLocation, setSelectedLocation] = useState<string>(patriotPlace);
    const [startingLocation, setStartingLocation] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [parkingLot, setParkingLot] = useState<string>('');

    const getNearestReception = (department: string) => {
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

    const getParkingLot = (parkingLot: string) => {
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

    async function findDirectionsBFS(startPoint: string, endPoint: string) {
        const response = await axios.post('/api/bfs', {
            startPoint: getParkingLot(parkingLot),
            endPoint: getNearestReception(department),
        });
    }

    console.log(selectedLocation);
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow w-full">
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
                <div className="flex items-center justify-between w-full p-2">
                    <label>Department:</label>
                    <div className={'flex space-x-2 p-2 justify-end'}>
                        <select
                            onChange={(e) => setDepartment(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded"
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
                <div className={'flex flex-col w-full items-center py-4'}>
                    <h1 className={'text-6xl font-bold'}>Arrived?</h1>
                    <p>Select your parking lot for guidance to your department!</p>
                </div>
                <div className="flex items-center justify-between w-full p-2">
                    <label>Parking Lot:</label>
                    <div className={'flex space-x-2 p-2 justify-end'}>
                        <select
                            onChange={(e) => setParkingLot(e.target.value)}
                            className="ml-2 p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select a parking lot...</option>
                            <option>Extended Parking</option>
                            <option>Patient Parking</option>
                            <option>Valet Parking</option>
                        </select>
                    </div>
                </div>
                <ImageCanvas
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
                />
            </div>
        </div>
    );
}

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

    useEffect(() => {
        if (!directionService || !directionRenderer) return;

        directionService
            .route({
                origin: props.startingLocation,
                destination: props.selectedLocation,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionRenderer.setDirections(response);
            });
    }, [directionService, directionRenderer, props.selectedLocation, props.startingLocation]);

    return null;
}

export default MapView;
