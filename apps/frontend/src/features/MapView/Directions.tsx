import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface DirectionProps {
    selectedLocation: string;
    startingLocation: string;
    travelMode: string;
}

function Directions({ selectedLocation, startingLocation, travelMode }: DirectionProps) {
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
        const googleTravelMode =
            travelMode === 'WALKING'
                ? google.maps.TravelMode.WALKING
                : travelMode === 'TRANSIT'
                  ? google.maps.TravelMode.TRANSIT
                  : travelMode === 'BICYCLING'
                    ? google.maps.TravelMode.BICYCLING
                    : google.maps.TravelMode.DRIVING;

        directionService
            .route({
                origin: startingLocation,
                destination: selectedLocation,
                travelMode: googleTravelMode,
            })
            .then((response) => {
                directionRenderer.setDirections(response);
            });
    }, [directionService, directionRenderer, selectedLocation, startingLocation, travelMode]);

    return null;
}

export default Directions;
