import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20-FLOOR1-LABELED-1.svg';
import patriot20Floor3 from '../../../public/20-FLOOR1-BASIC-1.svg';
import patriot22Floor1 from '../../../public/22-FLOOR4-BASIC-1.svg';
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
            const floorLayer20_3 = L.layerGroup();
            const floorLayer22_1 = L.layerGroup();
            const floorLayer22_3 = L.layerGroup();
            const floorLayer22_4 = L.layerGroup();
            //const floorLayerChestnutHill = L.layerGroup();

            // image overlays
            L.imageOverlay(patriot20Floor1, bounds).addTo(floorLayer20_1);
            L.imageOverlay(patriot20Floor3, bounds).addTo(floorLayer20_3);
            L.imageOverlay(patriot22Floor1, bounds).addTo(floorLayer22_1);
            L.imageOverlay(patriot22Floor3, bounds).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds).addTo(floorLayer22_4);
            //L.imageOverlay(chestnutHill, bounds).addTo(floorLayerChestnutHill);

            // Transition Points Between Floors
            const transitionNodes = {
                // 22 patriot place
                'elevatorA': {from: [464.51, 546.23], to: [383.55, 554.24]},
                'st01': {from: [469.50, 469.21], to: [392.55, 457.21]},
                'st02': {from: [405.54, 314.17], to: [316.59, 279.17]},
                'st03': {from: [678.38, 850.31], to: [619.42, 887.32]},
                // 20 patriot place
                'st13': {from: [767.24, 243.00], to: [767.24, 243.00]},
                'st14': {from: [218.74, 818.00], to: [218.74, 818.00]},
                'el10': {from: [191.74, 757.50], to: [191.74, 757.50]}
            };

            L.circle(transitionNodes['elevatorA'].from as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator to Floor 4').on('click', () => {map.removeLayer(floorLayer22_3); map.addLayer(floorLayer22_4)}).addTo(floorLayer22_3);
            L.circle(transitionNodes['elevatorA'].to as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator from Floor 3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st01'].from as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 4').on('click', () => {map.removeLayer(floorLayer22_3); map.addLayer(floorLayer22_4)}).addTo(floorLayer22_3);
            L.circle(transitionNodes['st01'].to as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st02'].from as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 4').on('click', () => {map.removeLayer(floorLayer22_3); map.addLayer(floorLayer22_4)}).addTo(floorLayer22_3);
            L.circle(transitionNodes['st02'].to as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st03'].from as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 4').on('click', () => {map.removeLayer(floorLayer22_3); map.addLayer(floorLayer22_4)}).addTo(floorLayer22_3);
            L.circle(transitionNodes['st03'].to as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);


            // === PARKING LOT LAYERS ===
            const patriotValetParking = L.layerGroup();
            const patriotPatientParking = L.layerGroup();
            const patriotExtendedParking = L.layerGroup();
            //const chestnutParking = L.layerGroup();

            // parking markers (update coordinates)
            L.marker([576.44, 35.10]).bindPopup('Valet Parking').addTo(patriotValetParking);
            L.marker([223.65, 18.10]).bindPopup('Patient Parking').addTo(patriotPatientParking);
            L.marker([128.70, 226.15]).bindPopup('Extended Patient Parking').addTo(patriotExtendedParking);

            // add a default layer
            floorLayer20_1.addTo(map);

            // === LAYER CONTROLS ===
            const baseLayers = {
                '20 Patriot Place - Floor 1': floorLayer20_1,
                '20 Patriot Place - Floor 3': floorLayer20_3,
                '22 Patriot Place - Floor 1': floorLayer22_1,
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
            const bridge1 = L.polyline([
                [241.63, 101.12], // 20 Patriot Place
                [242.63, 68.11], // 22 Patriot Place
            ], {
                color: 'blue',
                weight: 2,
                dashArray: '5, 5',
            })
            .bindPopup('Bridge to 22 Patriot Place')
            .on('click', () => {
                map.removeLayer(floorLayer20_3);
                map.addLayer(floorLayer22_3);
            })
            .addTo(floorLayer20_3);

            const bridge2 = L.polyline([
                [353.57, 642.26], // 22 Patriot Place
                [134.70, 785.30], // 20 Patriot Place
            ], {
                color: 'red',
                weight: 2,
                dashArray: '5, 5',
            })
            .bindPopup('Bridge to 20 Patriot Place')
            .on('click', () => {
                map.removeLayer(floorLayer22_3);
                map.addLayer(floorLayer20_3);
            })
            .addTo(floorLayer22_3);

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