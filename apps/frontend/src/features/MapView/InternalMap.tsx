import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20-FLOOR1-LABELED-1.svg';
import patriot22Floor3 from '../../../public/22-FLOOR3-LABELED-1.svg';
import patriot22Floor4 from '../../../public/22-FLOOR4-LABELED-1.svg';
//import chestnutHill from '../../../public/Chestnut Hill.svg'

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    path?: string[];
}

const InternalMap: React.FC<InternalMapProps> = ({pathCoordinates}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
                minZoom: -2,
            }).setView([500, 500], 0);

            // bounds for all floorplans
            const bounds: L.LatLngBoundsLiteral = [
                [0, 0],
                [1000, 1000],
            ];

            // === FLOOR LAYERS ===
            const floorLayer20_1 = L.layerGroup();
            const floorLayer22_3 = L.layerGroup();
            const floorLayer22_4 = L.layerGroup();
            //const floorLayerChestnutHill = L.layerGroup();

            // image overlays
            L.imageOverlay(patriot20Floor1, bounds).addTo(floorLayer20_1);
            L.imageOverlay(patriot22Floor3, bounds).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds).addTo(floorLayer22_4);
            //L.imageOverlay(chestnutHill, bounds).addTo(floorLayerChestnutHill);


            // === PARKING LOT LAYERS ===
            const patriotValetParking = L.layerGroup();
            const patriotPatientParking = L.layerGroup();
            const patriotExtendedParking = L.layerGroup();
            //const chestnutParking = L.layerGroup();
            // TODO: add parking lot to patriot floor 1
            // TODO: connect 20 and 22 patriot place

            // parking markers (update coordinates)
            L.marker([150, 100]).bindPopup('Valet Parking').addTo(patriotValetParking);
            L.marker([300, 200]).bindPopup('Patient Parking').addTo(patriotPatientParking);
            L.marker([450, 300]).bindPopup('Extended Patient Parking').addTo(patriotExtendedParking);

            // Add default layer (e.g., floor 20-1)
            floorLayer20_1.addTo(map);

            // === LAYER CONTROLS ===
            const baseLayers = {
                '20 Patriot Place - Floor 1': floorLayer20_1,
                '22 Patriot Place - Floor 3': floorLayer22_3,
                '22 Patriot Place - Floor 4': floorLayer22_4
            };

            const overlays = {
                'Valet Parking': patriotValetParking,
                'Patient Parking': patriotPatientParking,
                'Extended Patient Parking': patriotExtendedParking
            };

            L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

            // connect patriot place buildings
            const bridge = L.polyline([
                [600, 500], // 20 Patriot Place
                [700, 500], // midpoint
                [800, 500], // 22 Patriot Place
            ], {
                color: 'blue',
                weight: 2,
                dashArray: '5, 5',
            }).addTo(map);

            // path
            if (pathCoordinates && pathCoordinates.length > 1) {
                L.polyline(pathCoordinates, {
                    color: 'red',
                    weight: 3,
                    opacity: 0.8
                }).addTo(map);
            }

            // for getting coordinates (delete later)
            map.on('click', function (e) {
                console.log(`[${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}],`);
            });

            mapInstance.current = map;
        }

        // clean up
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [pathCoordinates]);

    return (
        <div
            ref={mapRef}
            style={{ height: '100vh', width: '100%', border: '1px solid #ccc' }}
        />
    );
};

export default InternalMap;