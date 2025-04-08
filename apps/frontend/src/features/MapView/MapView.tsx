import Navbar from '../../components/Navbar.tsx';
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';


function MapView() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const patriotPlace = "Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035"
    const chestnutHill = "850 Boylston St, Chestnut Hill, MA 02467"
    const [selectedLocation, setSelectedLocation] = useState<string>(patriotPlace);

    console.log(selectedLocation)
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow w-full">
                <div className="flex items-center justify-between w-full p-2">
                    <div>
                        <h3 className={'font-sans'}>Select a location:</h3>
                    </div>
                    <div className="flex p-2 justify-end">
                        <div className={"flex space-x-2"}>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800"
                                onClick={() => {setSelectedLocation(patriotPlace)}}
                            >
                                Patriot Place
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800"
                                onClick={() => {setSelectedLocation(chestnutHill)}}
                            >
                                Chestnut Hill
                            </button>
                        </div>
                    </div>
                </div>

                <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                    <div className="w-full h-full">
                        <Map
                            defaultZoom={15}
                            defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                            onCameraChanged={(ev: MapCameraChangedEvent) =>
                                console.log(
                                    'camera changed:',
                                    ev.detail.center,
                                    'zoom:',
                                    ev.detail.zoom
                                )
                            }
                            style={{ width: '100%', height: '100%' }}
                            fullscreenControl={false}
                        />
                        <Directions selectedLocation={selectedLocation}/>
                    </div>
                </APIProvider>
            </div>
        </div>
    );
}

function Directions(props: { selectedLocation: string }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionService, setDirectionService] = useState<google.maps.DirectionsService>();
    const [directionRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
    // need to remove unecessary states below
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!map || !routesLibrary) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new google.maps.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionService || !directionRenderer) return;

        directionService
            .route({
                origin: '100 Institute Rd, Worcester, MA 01609',
                destination: props.selectedLocation,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            })
            .then((response) => {
                directionRenderer.setDirections(response);
            });
    }, [directionService, directionRenderer, props.selectedLocation]);

    return null;
}

export default MapView;
