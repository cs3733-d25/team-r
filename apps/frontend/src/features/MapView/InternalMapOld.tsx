/*
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import floorPlan from '../../../public/floorplan.svg';

interface InternalMapProps {
    pathCoordinates?: [number, number][];  // Optional path coordinates
    path?: string[];  // Optional path as node IDs (e.g., ['p2', 'e2', 'r2'])
}

const InternalMap: React.FC<InternalMapProps> = ({ pathCoordinates, path }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const pathLayerRef = useRef<L.Polyline | null>(null);

    useEffect(() => {
        // Map of node IDs to their coordinates on the floor plan
        const nodeCoordinates: Record<string, [number, number]> = {
            p1: [250, 150],  // Extended Parking
            p2: [400, 250],  // Patient Parking
            p3: [600, 520],  // Valet Parking
            e1: [530, 400],  // Entrance
            e2: [410, 395],  // Entrance
            e3: [210, 790],  // Entrance
            r1: [570, 375],  // Reception
            r2: [415, 480],  // Reception
            r3: [270, 660],  // Reception
            h1: [400, 455],  // Hallway 1
            h2: [245, 640],  // Hallway 2
            h3: [190, 690],  // Hallway
            h4: [235, 730],  // Hallway
            h5: [235, 760],  // Hallway
            h6: [210, 760],  // Hallway
            s1: [210, 790],  // Sidewalk
            s2: [90, 750]    // Sidewalk
        };

        // Check if the map container is available
        if (mapRef.current && !mapInstance.current) {
            // Initialize the map
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
            }).setView([500, 500], 0.25);

            // Define the bounds of the floor plan image
            const floorPlanBounds: L.LatLngBoundsLiteral = [
                [0, 0],
                [1000, 1000],
            ];

            // Add the floor plan image
            L.imageOverlay(floorPlan, floorPlanBounds).addTo(map);

            mapInstance.current = map;
        }

        // Draw path if provided
        if (mapInstance.current) {
            // Remove existing path if any
            if (pathLayerRef.current) {
                pathLayerRef.current.remove();
                pathLayerRef.current = null;
            }

            // Draw path based on node IDs if provided
            if (path && path.length > 1) {
                const pathPoints = path.map(nodeId => nodeCoordinates[nodeId] || [0, 0]);
                pathLayerRef.current = L.polyline(pathPoints, {
                    color: 'blue',
                    weight: 5,
                    opacity: 0.7,
                    dashArray: '10, 10', // Creates a dashed line for better visibility
                    lineCap: 'round'
                }).addTo(mapInstance.current);

                // Show markers only for start (first) and end (last) nodes
                const startNode = path[0];
                const endNode = path[path.length - 1];

                // Add start marker
                const startMarker = L.marker(nodeCoordinates[startNode]).addTo(mapInstance.current)
                    .bindPopup(`Start: ${startNode}`).openPopup();

                // Add end marker
                const endMarker = L.marker(nodeCoordinates[endNode]).addTo(mapInstance.current)
                    .bindPopup(`End: ${endNode}`).openPopup();

                // Fit map to the path
                mapInstance.current.fitBounds(pathLayerRef.current.getBounds(), { padding: [50, 50] });
            }

            // Or draw path based on raw coordinates if provided
            else if (pathCoordinates && pathCoordinates.length > 1) {
                pathLayerRef.current = L.polyline(pathCoordinates, {
                    color: 'blue',
                    weight: 5,
                    opacity: 0.7
                }).addTo(mapInstance.current);

                const startCoordinates = pathCoordinates[0];
                const endCoordinates = pathCoordinates[pathCoordinates.length - 1];

                // Add start marker
                L.marker(startCoordinates).addTo(mapInstance.current)
                    .bindPopup('Start').openPopup();

                // Add end marker
                L.marker(endCoordinates).addTo(mapInstance.current)
                    .bindPopup('End').openPopup();

            }
        }

        return () => {
            if (pathLayerRef.current) {
                pathLayerRef.current.remove();
            }
        };
    }, [pathCoordinates, path]);

    return <div ref={mapRef} style={{ height: '100%' }} />;
};

export default InternalMap;*/