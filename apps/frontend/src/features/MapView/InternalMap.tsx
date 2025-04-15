import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20-FLOOR1-LABELED-1.svg';
import patriot20Floor3 from '../../../public/20-FLOOR1-BASIC-1.svg';
import patriot22Floor1 from '../../../public/22-FLOOR4-BASIC-1.svg';
import patriot22Floor3 from '../../../public/22-FLOOR3-LABELED-1.svg';
import patriot22Floor4 from '../../../public/22-FLOOR4-LABELED-1.svg';
import chestnutHill from '../../../public/Chestnut-Hill.svg'
import { goToFloor } from '../MapView/floorNavigation.ts';

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    path?: string[];
}

const InternalMap: React.FC<InternalMapProps> = ({pathCoordinates}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = L.map(mapRef.current, {crs: L.CRS.Simple, minZoom: -2,}).setView([500, 500], 0);

            // bounds for all floorplans
            const bounds: L.LatLngBoundsLiteral = [[0, 0], [1000, 1000],];

            // === FLOOR LAYERS ===
            const floorLayer20_1 = L.layerGroup();
            const floorLayer20_3 = L.layerGroup();
            const floorLayer22_1 = L.layerGroup();
            const floorLayer22_3 = L.layerGroup();
            const floorLayer22_4 = L.layerGroup();
            const floorLayerChestnutHill = L.layerGroup();

            // image overlays
            L.imageOverlay(patriot20Floor1, bounds).addTo(floorLayer20_1);
            L.imageOverlay(patriot20Floor3, bounds).addTo(floorLayer20_3);
            L.imageOverlay(patriot22Floor1, bounds).addTo(floorLayer22_1);
            L.imageOverlay(patriot22Floor3, bounds).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds).addTo(floorLayer22_4);
            L.imageOverlay(chestnutHill, bounds).addTo(floorLayerChestnutHill);

            // Transition Points Between Floors
            const transitionNodes = {
                // 22 patriot place
                'elevatorA': {floor1: [385.55, 546.23], floor3: [464.51, 546.23], floor4: [383.55, 554.24]},
                'st01': {floor1: [387.55, 456.21], floor3: [469.50, 469.21], floor4: [392.55, 457.21]},
                'st02': {floor1: [316.59, 280.17], floor3: [405.54, 314.17], floor4: [316.59, 279.17]},
                'st03': {floor1: [622.42, 885.32], floor3: [678.38, 850.31], floor4: [619.42, 887.32]},
                // 20 patriot place
                'st13': {floor1: [758.34, 187.14], floor3: [758.34, 187.14]},
                'st14': {floor1: [218.74, 818.00], floor3: [218.74, 818.00]},
                'el10': {floor1: [240.64, 771.29], floor3: [240.64, 771.29]}
            };

            // 22 patriot place floor 1 buttons to go up to floor 3
            L.circle(transitionNodes['elevatorA'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator to Floor 3').on('click', () => {map.removeLayer(floorLayer22_1); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_1);
            L.circle(transitionNodes['st01'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 3').on('click', () => {map.removeLayer(floorLayer22_1); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_1);
            L.circle(transitionNodes['st02'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 3').on('click', () => {map.removeLayer(floorLayer22_1); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_1);
            L.circle(transitionNodes['st03'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 3').on('click', () => {map.removeLayer(floorLayer22_1); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_1);
            // 22 patriot place floor 3 buttons to go up to floor 4 or down to floor 1
            L.circle(transitionNodes['elevatorA'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
            L.circle(transitionNodes['st01'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
            L.circle(transitionNodes['st02'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
            L.circle(transitionNodes['st03'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
            // 22 patriot place floor 4 buttons to go down to floor 3
            L.circle(transitionNodes['elevatorA'].floor4 as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator from Floor 1/3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st01'].floor4 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 1/3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st02'].floor4 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 1/3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);
            L.circle(transitionNodes['st03'].floor4 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 1/3').on('click', () => {map.removeLayer(floorLayer22_4); map.addLayer(floorLayer22_3)}).addTo(floorLayer22_4);

            // 20 patriot place
            L.circle(transitionNodes['st13'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 3').on('click', () => {map.removeLayer(floorLayer20_1); map.addLayer(floorLayer20_3)}).addTo(floorLayer20_1);
            L.circle(transitionNodes['st13'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 1').on('click', () => {map.removeLayer(floorLayer20_3); map.addLayer(floorLayer20_1)}).addTo(floorLayer20_3);
            L.circle(transitionNodes['st14'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs to Floor 3').on('click', () => {map.removeLayer(floorLayer20_1); map.addLayer(floorLayer20_3)}).addTo(floorLayer20_1);
            L.circle(transitionNodes['st14'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup('Stairs from Floor 1').on('click', () => {map.removeLayer(floorLayer20_3); map.addLayer(floorLayer20_1)}).addTo(floorLayer20_3);
            L.circle(transitionNodes['el10'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator to Floor 3').on('click', () => {map.removeLayer(floorLayer20_1); map.addLayer(floorLayer20_3)}).addTo(floorLayer20_1);
            L.circle(transitionNodes['el10'].floor3 as [number, number], {color: 'green', radius: 10,}).bindPopup('Elevator from Floor 1').on('click', () => {map.removeLayer(floorLayer20_3); map.addLayer(floorLayer20_1)}).addTo(floorLayer20_3);


            // parking lot markers
            L.marker([576.44, 35.10]).bindPopup('Valet Parking').addTo(floorLayer22_1);
            L.marker([223.65, 18.10]).bindPopup('Patient Parking').addTo(floorLayer22_1);
            L.marker([128.70, 226.15]).bindPopup('Extended Patient Parking').addTo(floorLayer22_1);
            // TODO: update coordinates
            L.marker([576.44, 35.10]).bindPopup('Valet Parking').addTo(floorLayer20_1);
            L.marker([223.65, 18.10]).bindPopup('Patient Parking').addTo(floorLayer20_1);
            L.marker([128.70, 226.15]).bindPopup('Extended Patient Parking').addTo(floorLayer20_1);
            L.marker([0, 0]).bindPopup('Parking Lot').addTo(floorLayerChestnutHill);

            // add a default layer
            floorLayer20_1.addTo(map);

            // === LAYER CONTROLS ===
            const baseLayers = {
                '20 Patriot Place - Floor 1': floorLayer20_1,
                '20 Patriot Place - Floor 3': floorLayer20_3,
                '22 Patriot Place - Floor 1': floorLayer22_1,
                '22 Patriot Place - Floor 3': floorLayer22_3,
                '22 Patriot Place - Floor 4': floorLayer22_4,
                'Chestnut Hill': floorLayerChestnutHill
            };

            L.control.layers(baseLayers).addTo(map);

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
            if (pathCoordinates && pathCoordinates.length > 1) L.polyline(pathCoordinates, {color: 'red', weight: 3, opacity: 0.8}).addTo(map);

            // for getting coordinates (can delete later)
            map.on('click', function (e) {
                console.log(`[${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}],`);
            });

            mapInstance.current = map;

            (window as unknown as { goToFloor: (floor: number) => void }).goToFloor = (floor: number) => {
                goToFloor(floor, map, floorLayer22_1, floorLayer22_3, floorLayer22_4);
            };
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