import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import TextDirections from "@/components/TextDirections.tsx";

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
    const [steps, setSteps] = useState<string[]>([]);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');

    useEffect(() => {
        if (!map || !routesLibrary) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new google.maps.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionService || !directionRenderer || !startingLocation || !selectedLocation) return;

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
                },
                (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
                    if (status === 'OK' && result) {

                        // Extract turn-by-turn text directions
                        const routeSteps = result.routes[0].legs.flatMap((leg) =>
                            leg.steps.map((step) => step.instructions)
                        );

                        // Get distance and duration
                        if (result.routes[0].legs[0]) {
                            setDistance(result.routes[0].legs[0].distance?.text || '');
                            setDuration(result.routes[0].legs[0].duration?.text || '');
                        }

                        setSteps(routeSteps);
                    } else {
                        console.error('Error fetching directions:', status);
                        setSteps([]);
                        setDistance('');
                        setDuration('');
                    }
                }
            )
            .then((response) => {
                directionRenderer.setDirections(response);
            });
    }, [directionService, directionRenderer, selectedLocation, startingLocation, travelMode]);

    // Don't show anything if we don't have both locations or steps
    if (!startingLocation || !selectedLocation || steps.length === 0) {
        return null;
    }

    return (
        <TextDirections steps={steps} distance={distance} duration={duration}/>
    );
}

export default Directions;