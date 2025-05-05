import Directions from '@/features/MapView/Directions.tsx';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { HeadingLabel } from '@/components/ui/heading-label';
import { ZoomIn } from 'lucide-react';
import { displayInfo } from '@/features/MapView/DisplayInformation.tsx';

/**
 * ExternalMapProps
 * passed in from parent (navbar) to pre-select a location
 */
interface ExternalMapProps {
    selectedLocation?: string;
}

/**
 * MapController component, used to control the zoom of the map
 * @param selectedLocation - the location to be zoomed in on
 * @constructor
 */
const MapController = ({ selectedLocation }: { selectedLocation: string }) => {
    const map = useMap();

    /**
     * broken useEffect, will flash screen with zoomed in locations before displaying
     */
    const zoomIn = () => {
        if (map && selectedLocation) {
            const geocoder = new google.maps.Geocoder();

            geocoder
                .geocode({ address: selectedLocation })
                .then((response) => {
                    const { results } = response;
                    if (results[0]) {
                        const location = results[0].geometry.location;
                        map.panTo(location);
                        map.setZoom(17);
                    }
                })
                .catch((error) => {
                    console.error('Geocoding error:', error);
                });
        }
    };

    return (
        displayInfo(
            <div className="mt-2 relative -top-14 right-0">
                <Button
                    variant="unselected"
                    disabled={selectedLocation === ''}
                    className={'rounded-full'}
                    onClick={zoomIn}
                >
                    <ZoomIn />
                </Button>
            </div>,
            "Once a path has been entered, click this to zoom into your destination.")
    );
};

function ReverseGeocoder({
    coordinates,
    onAddressFound,
}: {
    coordinates: { lat: number; lng: number } | null;
    onAddressFound: (address: string) => void;
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !coordinates) return;

        const geocoder = new google.maps.Geocoder();

        geocoder
            .geocode({ location: coordinates })
            .then((response) => {
                if (response.results[0]) {
                    onAddressFound(response.results[0].formatted_address);
                }
            })
            .catch((error) => {
                console.error('Reverse geocoding error:', error);
            });
    }, [coordinates, map, onAddressFound]);

    return null;
}

/**
 * ExternalMap component
 * @param initialLocation - the location to be pre-selected
 * @param status
 * @constructor
 */
export function ExternalMap({ selectedLocation: initialLocation }: ExternalMapProps) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const patriotPlace20 = 'Mass General Brigham, 20 Patriot Pl, Foxborough, MA 02035';
    const patriotPlace22 = 'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035';
    const chestnutHill = '850 Boylston St, Chestnut Hill, MA 02467';
    const faulkner = '1153 Centre Street, Faulkner, Boston MA 02130';
    const mainCampus = '75 Francis St, Boston MA 02115';
    const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation || '');
    type LocationInput =
        | string
        | {
              lat: number;
              lng: number;
          };
    const [startingLocation, setStartingLocation] = useState<LocationInput>('');
    const [displayAddress, setDisplayAddress] = useState<string>('');
    const [currentCoordinates, setCurrentCoordinates] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [travelMode, setTravelMode] = useState<string>('DRIVING');
    const navigate = useNavigate();
    const location = useLocation();
    //props passed from login.tsx
    const status = location.state?.status;
    const username = location.state?.username;
    const userType = location.state?.userType;

    /**
     * getBuildingIdentifier function, turns the location string into a building identifier
     * @param location
     */
    const getBuildingIdentifier = (location: string) => {
        if (location === patriotPlace20) return 'Healthcare Center (20 Patriot Pl.)';
        if (location === patriotPlace22) return 'Healthcare Center (22 Patriot Pl.)';
        if (location === chestnutHill) return 'Healthcare Center (Chestnut Hill)';
        if (location === faulkner) return 'Faulkner Hospital';
        if (location === mainCampus) return 'Main Campus Hospital (75 Francis St.)';
        return '';
    };

    /**
     * Gets the user's current location
     * @returns {void}
     */
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setStartingLocation(coords);
                setCurrentCoordinates(coords);
            },
            (err) => {
                alert(`Error getting location: ${err.message}`);
            }
        );
    };

    /**
     * Converts a given LocationInput to a string representation of coords
     */
    const convertLocationToString = (location: LocationInput) => {
        if (typeof location === 'string') {
            return location;
        } else if (
            displayAddress &&
            currentCoordinates?.lat === location.lat &&
            currentCoordinates?.lng === location.lng
        ) {
            return displayAddress;
        } else {
            return `${location.lat},${location.lng}`;
        }
    };

    return (
        <div className={'flex flex-col h-[calc(100vh-65px)] overflow-hidden'}>
            <div className={'flex-1 w-full relative'}>
                <APIProvider apiKey={apiKey} libraries={['places']}>
                    <Map
                        defaultZoom={8}
                        defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                        className={'w-full h-full'}
                        fullscreenControl={false}
                        mapTypeControl={false}
                    />
                    {/* on the fritz, will flash screen with zoomed in locations before displaying */}
                    {/* Temporarily disabled for now, in Jira as a bug fix*/}
                    {/*<MapController selectedLocation={selectedLocation} />*/}
                    <ReverseGeocoder
                        coordinates={currentCoordinates}
                        onAddressFound={setDisplayAddress}
                    />
                    <Directions
                        selectedLocation={selectedLocation}
                        startingLocation={
                            typeof startingLocation === 'string'
                                ? startingLocation
                                : `${startingLocation.lat},${startingLocation.lng}`
                        }
                        travelMode={travelMode}
                    />
                    <div className={'absolute top-138 right-3'}>
                        <MapController selectedLocation={selectedLocation} />
                    </div>
                </APIProvider>

                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <HeadingLabel>Directions</HeadingLabel>
                    <div className="space-y-4 flex-grow overflow-auto">
                        <div className="flex flex-col space-y-2">
                            {displayInfo(
                                <Input
                                    type={'text'}
                                    placeholder={'Starting location'}
                                    value={convertLocationToString(startingLocation)}
                                    onChange={(e) => {
                                        setStartingLocation(e.target.value);
                                        setCurrentCoordinates(null);
                                        setDisplayAddress('');
                                    }}
                                />,
                                'Enter your starting location.'
                            )}
                            <div className={'flex items-center justify-center'}>
                                <Label>Or</Label>
                            </div>
                            {displayInfo(
                                <Button onClick={getLocation} className={'w-full'}>
                                    Use my Location
                                </Button>,
                                'Allow our application to use your location and find a route to one of our hospitals.'
                            )}
                            {displayInfo(
                                <Select onValueChange={(value) => setTravelMode(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Mode of transport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Travel Mode</SelectLabel>
                                            <SelectItem value={'DRIVING'}>Car</SelectItem>
                                            <SelectItem value={'TRANSIT'}>
                                                Public Transportation
                                            </SelectItem>
                                            <SelectItem value={'BICYCLING'}>Bicycle</SelectItem>
                                            <SelectItem value={'WALKING'}>Walk</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>,
                                'Select a mode of transport to travel to the hospital.'
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className={'px-2 mb-3'}>Destination</Label>
                            {displayInfo(
                                <div className="flex flex-col space-y-2">
                                    {/* variant: if not the current button selected, set to light blue (selected). Dark blue (secondary) if clicked on */}
                                    <Button
                                        variant={
                                            selectedLocation !== patriotPlace20
                                                ? 'unselected'
                                                : 'secondary'
                                        }
                                        onClick={() => setSelectedLocation(patriotPlace20)}
                                    >
                                        Healthcare Center (20 Patriot Place)
                                    </Button>
                                    <Button
                                        variant={
                                            selectedLocation !== patriotPlace22
                                                ? 'unselected'
                                                : 'secondary'
                                        }
                                        onClick={() => setSelectedLocation(patriotPlace22)}
                                    >
                                        Healthcare Center (22 Patriot Place)
                                    </Button>
                                    <Button
                                        variant={
                                            selectedLocation !== chestnutHill
                                                ? 'unselected'
                                                : 'secondary'
                                        }
                                        onClick={() => setSelectedLocation(chestnutHill)}
                                    >
                                        Healthcare Center (Chestnut Hill)
                                    </Button>
                                    <Button
                                        variant={
                                            selectedLocation !== faulkner
                                                ? 'unselected'
                                                : 'secondary'
                                        }
                                        onClick={() => setSelectedLocation(faulkner)}
                                    >
                                        Faulkner Hospital
                                    </Button>
                                    <Button
                                        variant={
                                            selectedLocation !== mainCampus
                                                ? 'unselected'
                                                : 'secondary'
                                        }
                                        onClick={() => setSelectedLocation(mainCampus)}
                                    >
                                        Main Campus Hospital
                                    </Button>
                                </div>,
                                'Select a destination hospital.'
                            )}
                        </div>
                    </div>

                    {/* I've arrived button */}
                    <div className="mt-4 pt-2 border-t border-gray-200">
                        {displayInfo(
                            <Button
                                disabled={selectedLocation === ''}
                                className={'w-full'}
                                onClick={() =>
                                    navigate('/internal-map', {
                                        state: {
                                            selectedLocation,
                                            buildingIdentifier:
                                                getBuildingIdentifier(selectedLocation),
                                        },
                                    })
                                }
                            >
                                I've Arrived
                            </Button>,
                            'Once you have entered all above information, click this button to move on to navigation inside of the hospital.'
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
