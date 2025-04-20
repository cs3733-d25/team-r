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
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
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
                        setDirections(result);

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
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10">
            <h3 className="font-bold text-lg mb-2">Directions</h3>
            {distance && duration && (
                <div className="mb-4 text-sm text-gray-600">
                    <p>{distance} - {duration}</p>
                </div>
            )}
            <ol className="list-decimal list-inside space-y-2">
                {steps.map((step, index) => (
                    <li key={index}
                        className="text-sm border-b border-gray-100 pb-2 last:border-0"
                        dangerouslySetInnerHTML={{ __html: step }}
                    />
                ))}
            </ol>
        </div>
    );
}

export default Directions;