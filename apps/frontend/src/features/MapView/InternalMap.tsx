import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import floorPlan from '../../../public/floorplan.svg';

interface InternalMapProps {
    pathCoordinates: [number, number][];  // Only pathCoordinates should be here
}

const InternalMap: React.FC<InternalMapProps> = ({ pathCoordinates }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);  // Ref to the div container
    const mapInstance = useRef<L.Map | null>(null);  // Ref to the Leaflet map instance

    useEffect(() => {
        // Check if the map container is available
        if (mapRef.current && !mapInstance.current) {
            // Initialize the map
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple, // Set the coordinate reference system to Simple (for floor plan)
            }).setView([500, 500], 0.25);

            // Define the bounds of the floor plan image
            const floorPlanBounds: L.LatLngBoundsLiteral = [
                [0, 0],
                [1000, 1000],
            ];

            // Add the floor plan image as an overlay on the map
            L.imageOverlay(floorPlan, floorPlanBounds).addTo(map);

            // If pathCoordinates exist, create a polyline to display the path on the map
            if (pathCoordinates.length > 0) {
                L.polyline(pathCoordinates, { color: 'blue' }).addTo(map);
            }

            // Store the map instance for later cleanup
            mapInstance.current = map;

            // parking markers
            const valetParking = L.marker([600, 520]);
            valetParking.addTo(map)
                .bindPopup('Valet Parking')
                .openPopup();

            const p1 = L.marker([250, 150]);
            p1.addTo(map)
                .bindPopup('Extended Parking')
                .openPopup();

            const p2 = L.marker([400, 250]);
            p2.addTo(map)
                .bindPopup('Patient Parking')
                .openPopup();
            
            // reception markers
            const p3 = L.marker([600, 520]);
            p3.addTo(map)
                .bindPopup('Valet Parking')
                .openPopup();

            mapInstance.current = map;
        }

        // Cleanup the map when the component unmounts or pathCoordinates change
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [pathCoordinates]);  // Re-run the effect when pathCoordinates change

    return <div ref={mapRef} style={{ height: '100%' }} />;  // Render the map container
};

export default InternalMap;