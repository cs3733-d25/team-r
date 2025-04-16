import {NavbarMGH} from '@/components/NavbarMGH.tsx';
import Directions from '@/features/MapView/Directions.tsx';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useNavigate} from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

/**
 * ExternalMapProps
 * passed in from parent (navbar) to pre-select a location
 */
interface ExternalMapProps {
    selectedLocation?: string;
}

function MapController({ location }: { location: string }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !location) return;
        
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
            if (status === 'OK' && results && results[0]?.geometry?.location) {
                map.panTo(results[0].geometry.location);
                map.setZoom(15);
            }
        });
    }, [map, location]);

    return null;
}


/**
 * ExternalMap component
 * @param initialLocation - the location to be pre-selected
 * @constructor
 */
export function ExternalMap({ selectedLocation: initialLocation }: ExternalMapProps) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const patriotPlace20 = 'Mass General Brigham, 20 Patriot Pl, Foxborough, MA 02035';
    const patriotPlace22 = 'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035';
    const chestnutHill = '850 Boylston St, Chestnut Hill, MA 02467';
    const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation || '');
    const [startingLocation, setStartingLocation] = useState<string>('');
    const [travelMode, setTravelMode] = useState<string>("DRIVING");
    const navigate = useNavigate();

    return (
        // <p>Hello world</p>
        <div className={'flex flex-col h-screen overflow-hidden'}>
            <NavbarMGH />
            <div className={'flex-1 w-full relative'}>
                <APIProvider apiKey={apiKey} libraries={['places']}>
                    <Map
                        defaultZoom={8}
                        defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                        className={'w-full h-full'}
                        fullscreenControl={false}
                        mapTypeControl={false}
                    />
                    <MapController location={selectedLocation} />
                    <Directions
                        selectedLocation={selectedLocation}
                        startingLocation={startingLocation}
                        travelMode={travelMode}
                    />
                </APIProvider>

                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <Label className={'p-2 font-bold text-2xl'}>Directions</Label>
                    <div className="space-y-4 flex-grow overflow-auto">
                        {/* Your existing directions content */}
                        <div className="flex flex-col space-y-2">
                            <Input
                                type={'text'}
                                placeholder={'Starting location'}
                                onChange={(e) => setStartingLocation(e.target.value)}
                            />
                            <Select onValueChange={(value) => setTravelMode(value)}>
                            <SelectTrigger>
                                    <SelectValue placeholder="Mode of transport" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Travel Mode</SelectLabel>
                                        <SelectItem value={'DRIVING'}>
                                            Car
                                        </SelectItem>
                                        <SelectItem value={'TRANSIT'}>
                                            Public Transportation
                                        </SelectItem>
                                        <SelectItem value={'BICYCLING'}>
                                            Bicycle
                                        </SelectItem>
                                        <SelectItem value={'WALKING'}>
                                            Walk
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className={'px-2 mb-3'}>Destination</Label>
                            <div className="flex flex-col space-y-2">
                                <Button
                                    variant={selectedLocation === '' || selectedLocation === patriotPlace20 ? 'default' : 'secondary'}
                                    onClick={() => setSelectedLocation(patriotPlace20)}
                                >
                                    20 Patriot Place
                                </Button>
                                <Button
                                    variant={selectedLocation === '' || selectedLocation === patriotPlace22 ? 'default' : 'secondary'}
                                    onClick={() => setSelectedLocation(patriotPlace22)}
                                >
                                    22 Patriot Place
                                </Button>
                                <Button
                                    variant={selectedLocation === '' || selectedLocation === chestnutHill ? 'default' : 'secondary'}
                                    onClick={() => setSelectedLocation(chestnutHill)}
                                >
                                    Chestnut Hill
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* I've arrived button */}
                    <div className="mt-4 pt-2 border-t border-gray-200">
                        <Button className={'w-full'} onClick={() => navigate('/internal-map',
                        { state: { selectedLocation } })}
                        >
                            I've Arrived!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}