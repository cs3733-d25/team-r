import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20patriot1.svg';
import patriot22Floor1 from '../../../public/22patriot1.svg';
import patriot22Floor3 from '../../../public/22patriot3.svg';
import patriot22Floor4 from '../../../public/22patriot4.svg';
import chestnutHill from '../../../public/chestnutHill1.svg';
import faulkner from '../../../public/faulkner1.svg';
import {
    transitionNodes,
    addFloorTransitionMarkers,
    connectBuildings,
    goToFloor,
} from '../MapView/floorNavigation.ts';
import './leaflet.css';
import {
    fetchCheckIn,
    fetchEdges20_1,
    fetchElevators,
    fetchEdges22_1,
    fetchEdges22_3,
    fetchEdges22_4,
    fetchEdgesChestnut,
    fetchEntrances,
    fetchParkingLots,
} from '@/features/MapView/mapService.ts';
import { Node, Edge } from '../../../../backend/src/routes/mapData.ts';

declare global {
  interface Window {
    goToFloor?: (floor: number, building?: string) => void;
  }
}

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    location: string;
}

const InternalMap: React.FC<InternalMapProps> = ({ pathCoordinates, location }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const routeLayer = useRef<L.Polyline | null>(null);

    const [checkIn, setCheckIn] = useState<Node[]>([]);
    const [entrances, setEntrances] = useState<Node[]>([]);
    const [elevators, setElevators] = useState<Node[]>([]);
    const [lots, setLots] = useState<Node[]>([]);
    const [edges20_1, setEdges20_1] = useState<Edge[]>([]);
    const [edges22_1, setEdges22_1] = useState<Edge[]>([]);
    const [edges22_3, setEdges22_3] = useState<Edge[]>([]);
    const [edges22_4, setEdges22_4] = useState<Edge[]>([]);
    const [edgesChestnut, setEdgesChestnut] = useState<Edge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    function clickMarker(data: Node, marker: L.Marker): void {
        marker.on('click', () => {
            const info = `
        <p>Name: ${data.shortName}</p>
        <p>Building: ${data.building}</p>
        <p>Floor: ${data.floor}</p>
        <p>X Coordinate: ${data.xcoord}</p>
        <p>Y Coordinate: ${data.ycoord}</p>
      `;
            marker.bindPopup(info).openPopup();
        });
    }

    // Load various node sets once
    useEffect(() => {
        const loadCheckIn = async () => {
            try {
                const data = await fetchCheckIn();
                setCheckIn(data);
            } catch (err) {
                console.error('Error fetching check-in nodes:', err);
            }
        };
        loadCheckIn();
    }, []);

    useEffect(() => {
        const loadEntrances = async () => {
            try {
                const data = await fetchEntrances();
                setEntrances(data);
            } catch (err) {
                console.error('Error fetching entrances:', err);
            }
        };
        loadEntrances();
    }, []);

    useEffect(() => {
        const loadElevators = async () => {
            try {
                const data = await fetchElevators();
                setElevators(data);
            } catch (err) {
                console.error('Error fetching elevators:', err);
            }
        };
        loadElevators();
    }, []);

    useEffect(() => {
        const loadLots = async () => {
            try {
                const data = await fetchParkingLots();
                setLots(data);
            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        };
        loadLots();
    }, []);

    useEffect(() => {
        const loadEdges = async () => {
            try {
                setIsLoading(true);
                const data20_1 = await fetchEdges20_1();
                setEdges20_1(data20_1);
                const data22_1 = await fetchEdges22_1();
                setEdges22_1(data22_1);
                const data22_3 = await fetchEdges22_3();
                setEdges22_3(data22_3);
                const data22_4 = await fetchEdges22_4();
                setEdges22_4(data22_4);
                const dataChest = await fetchEdgesChestnut();
                setEdgesChestnut(dataChest);
                setError(null);
            } catch (err) {
                console.error('Error fetching edges:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setIsLoading(false);
            }
        };
        loadEdges();
    }, []);

    // Initialize map once
    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const floorLayer20_1 = L.layerGroup();
            const floorLayer22_1 = L.layerGroup();
            const floorLayer22_3 = L.layerGroup();
            const floorLayer22_4 = L.layerGroup();
            const floorLayerChestnutHill = L.layerGroup();
            const floorLayerFaulkner = L.layerGroup();

            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
                minZoom: -2,
                zoomControl: false,
            }).setView([500, 500], 0);

            // Define bounds
            const bounds20_1: L.LatLngBoundsLiteral = [
                [-1700, -1800],
                [1350, 2000],
            ];
            const bounds22_1: L.LatLngBoundsLiteral = [
                [-1700, -2100],
                [1200, 2000],
            ];
            const bounds22_3: L.LatLngBoundsLiteral = [
                [-400, -150],
                [1300, 1400],
            ];
            const bounds22_4: L.LatLngBoundsLiteral = [
                [-500, -100],
                [1500, 1400],
            ];
            const boundsChestnutHill: L.LatLngBoundsLiteral = [
                [-400, -500],
                [1200, 1300],
            ];
            const boundsFaulkner: L.LatLngBoundsLiteral = [
                [-200, -1000],
                [1000, 2250],
            ];

            // Add floorplan overlays
            L.imageOverlay(patriot20Floor1, bounds20_1).addTo(floorLayer20_1);
            L.imageOverlay(patriot22Floor1, bounds22_1).addTo(floorLayer22_1);
            L.imageOverlay(patriot22Floor3, bounds22_3).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds22_4).addTo(floorLayer22_4);
            L.imageOverlay(chestnutHill, boundsChestnutHill).addTo(
                floorLayerChestnutHill
            );
            L.imageOverlay(faulkner, boundsFaulkner).addTo(floorLayerFaulkner);

            // Show initial layer based on location string
            if (location.includes('20 Patriot Pl')) {
                floorLayer20_1.addTo(map);
            } else if (location.includes('22 Patriot Pl')) {
                floorLayer22_1.addTo(map);
            } else if (location.includes('Chestnut Hill')) {
                floorLayerChestnutHill.addTo(map);
            } else if (location.includes('Faulkner')) {
                floorLayerFaulkner.addTo(map);
            }

            // Layer controls
            L.control
                .layers(
                    {
                        '20 Patriot Place - Floor 1': floorLayer20_1,
                        '22 Patriot Place - Floor 1': floorLayer22_1,
                        '22 Patriot Place - Floor 3': floorLayer22_3,
                        '22 Patriot Place - Floor 4': floorLayer22_4,
                        'Chestnut Hill': floorLayerChestnutHill,
                        'Faulkner': floorLayerFaulkner,
                    },
                    {}
                )
                .addTo(map);

            // Store instance
            mapInstance.current = map;

            // Expose goToFloor globally
            window.goToFloor = (
                floor: number,
                building?: string
            ) => {
                goToFloor(
                    floor,
                    map,
                    floorLayer20_1,
                    floorLayer22_1,
                    floorLayer22_3,
                    floorLayer22_4,
                    floorLayerChestnutHill,
                    floorLayerFaulkner,
                    building
                );
            };
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [location, entrances, checkIn, edges20_1, edges22_1, edges22_3, edges22_4, edgesChestnut]);

    // Redraw route whenever pathCoordinates change
    useEffect(() => {
        if (!mapInstance.current) return;
        // Remove existing route
        if (routeLayer.current) {
            routeLayer.current.remove();
            routeLayer.current = null;
        }
        // Draw new route
        if (pathCoordinates && pathCoordinates.length > 1) {
            const poly = L.polyline(pathCoordinates, {
                color: 'red',
                weight: 3,
                opacity: 0.8,
            });
            poly.addTo(mapInstance.current);
            routeLayer.current = poly;
        }
    }, [pathCoordinates]);

    return (
        <div>
            <div
                ref={mapRef}
                style={{
                    height: '100vh',
                    width: '100%',
                    border: '1px solid #ccc',
                    position: 'relative',
                    zIndex: 0,
                }}
            />
        </div>
    );
};

export default InternalMap;