import {NavbarMGH} from '@/components/NavbarMGH.tsx';
import Directions from '@/features/MapView/Directions.tsx';
import {APIProvider, Map, useMap} from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {HeadingLabel} from '@/components/ui/heading-label';

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
function MapController({ selectedLocation }: { selectedLocation: string }) {
    const map = useMap();

    /**
     * broken useEffect, will flash screen with zoomed in locations before displaying
     */
    useEffect(() => {
        if (!map || !selectedLocation) return;

        const geocoder = new google.maps.Geocoder();

        geocoder
            .geocode({ address: selectedLocation })
            .then((response) => {
                const { results } = response;
                if (results[0]) {
                    const location = results[0].geometry.location;
                    map.panTo(location);
                    map.setZoom(15);
                }
            })
            .catch((error) => {
                console.error('Geocoding error:', error);
            });
    }, [map, selectedLocation]);

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
    const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation || '');
    type LocationInput =
        | string
        | {
              lat: number;
              lng: number;
          };
    const [startingLocation, setStartingLocation] = useState<LocationInput>('');
    const [travelMode, setTravelMode] = useState<string>('DRIVING');
    const navigate = useNavigate();
    const location = useLocation();
    const status = location.state?.status;

    /**
     * getBuildingIdentifier function, turns the location string into a building identifier
     * @param location
     */
    const getBuildingIdentifier = (location: string) => {
        if (location === patriotPlace20) return 'PATRIOT_PLACE_20';
        if (location === patriotPlace22) return 'PATRIOT_PLACE_22';
        if (location === chestnutHill) return 'CHESTNUT_HILL';
        if (location === faulkner) return 'FAULKNER';
        return '';
    };

    /**
     * useEffect to get the user's current location
     */

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setStartingLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => {
                alert(`Error getting location: ${err.message}`);
            }
        );
    };

    return (
        <div className={'flex flex-col h-screen overflow-hidden'}>
            {status == 'logged-in' ? <NavbarMGH /> : <NavbarMGH page={'home'} />}
            <div className={'flex-1 w-full relative'}>
                <APIProvider apiKey={apiKey} libraries={['places']}>
                    <Map
                        defaultZoom={8}
                        defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                        className={'w-full h-full'}
                        fullscreenControl={false}
                        mapTypeControl={false}
                    />
                    {/* on the fritz, will flash screen with zoomed in locations before displaying
                    Temporarily disabled for now, in Jira as a bug fix*/}
                    {/*<MapController selectedLocation={selectedLocation} />*/}
                    <Directions
                        selectedLocation={selectedLocation}
                        startingLocation={
                            typeof startingLocation === 'string'
                                ? startingLocation
                                : `${startingLocation.lat},${startingLocation.lng}`
                        }
                        travelMode={travelMode}
                    />
                </APIProvider>

                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <HeadingLabel>Directions</HeadingLabel>
                    <div className="space-y-4 flex-grow overflow-auto">
                        <div className="flex flex-col space-y-2">
                            <Input
                                type={'text'}
                                placeholder={'Starting location'}
                                onChange={(e) => setStartingLocation(e.target.value)}
                            />
                            <div className={"flex items-center justify-center"}>
                                <Label>Or</Label>
                            </div>
                            <Button onClick={getLocation}>Use my Location</Button>
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
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className={'px-2 mb-3'}>Destination</Label>
                            <div className="flex flex-col space-y-2">
                                {/* variant: if not the current button selected, set to light blue (selected). Dark blue (secondary) if clicked on */}
                                <Button
                                    variant={
                                        selectedLocation !== patriotPlace20
                                            ? 'selected'
                                            : 'secondary'
                                    }
                                    onClick={() => setSelectedLocation(patriotPlace20)}
                                >
                                    Patriot Place 20
                                </Button>
                                <Button
                                    variant={
                                        selectedLocation !== patriotPlace22
                                            ? 'selected'
                                            : 'secondary'
                                    }
                                    onClick={() => setSelectedLocation(patriotPlace22)}
                                >
                                    Patriot Place 22
                                </Button>
                                <Button
                                    variant={
                                        selectedLocation !== chestnutHill ? 'selected' : 'secondary'
                                    }
                                    onClick={() => setSelectedLocation(chestnutHill)}
                                >
                                    Chestnut Hill
                                </Button>
                                <Button
                                    variant={
                                        selectedLocation !== faulkner ? 'selected' : 'secondary'
                                    }
                                    onClick={() => setSelectedLocation(faulkner)}
                                >
                                    Faulkner
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* I've arrived button */}
                    <div className="mt-4 pt-2 border-t border-gray-200">
                        <Button
                            disabled={selectedLocation === ''}
                            className={'w-full'}
                            onClick={() =>
                                navigate('/internal-map', {
                                    state: {
                                        selectedLocation,
                                        buildingIdentifier: getBuildingIdentifier(selectedLocation),
                                    },
                                })
                            }
                        >
                            I've Arrived
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
