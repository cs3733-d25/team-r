import React, {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20-FLOOR1-LABELED-1.svg';
import patriot20Floor3 from '../../../public/20-FLOOR1-BASIC-1.svg';
import patriot22Floor1 from '../../../public/22-FLOOR4-BASIC-1.svg';
import patriot22Floor3 from '../../../public/22-FLOOR3-LABELED-1.svg';
import patriot22Floor4 from '../../../public/22-FLOOR4-LABELED-1.svg';
import chestnutHill from '../../../public/Chestnut-Hill.svg'
import faulkner from '../../../public/Faulkner-Map-Draft.svg'
import { transitionNodes, addFloorTransitionMarkers, connectBuildings, goToFloor } from '../MapView/floorNavigation.ts';
import './leaflet.css';
import {
    fetchCheckIn,
    fetchEdges20_1, fetchElevators,//  fetchEdges20_3, fetchEdges22_1, fetchEdges22_3, fetchEdges22_4, fetchEdgesChestnut,
    fetchEntrances,
    fetchParkingLots
} from "@/features/MapView/mapService.ts";
import { Node, Edge } from '../../../../backend/src/routes/mapData.ts';

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    path?: string[];
    location: string;
}

const InternalMap: React.FC<InternalMapProps> = ({pathCoordinates, path, location}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const [checkIn, setCheckIn] = useState<Node[]>([]);
    const [entrances, setEntrances] = useState<Node[]>([]);
    const [elevators, setElevators] = useState<Node[]>([]);
    const [lots, setLots] = useState<Node[]>([]);
    const [edges20_1, setEdges20_1] = useState<Edge[]>([]);




function clickMarker(data:Node, marker:L.Marker):void{
        marker.on('click', () => {
            const info = `<p>Name: ${data.shortName}</p>
            <p>Building: ${data.building}</p>
           <p> Floor: ${data.floor}</p>
           <p> X Coordinate: ${data.xcoord}</p>
           <p> Y Coordinate: ${data.ycoord}</p>`;
            marker.bindPopup(info).openPopup();
        });
    }

    useEffect(() => {
        const loadCheckIn = async () => {
            try {
                const data = await fetchCheckIn();
                setCheckIn(data);
            } catch (err) {
                console.error('Error fetching parking lots:', err);
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
                console.error('Error fetching parking lots:', err);
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
                console.error('Error fetching parking lots:', err);
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
                const data = await fetchEdges20_1();
                setEdges20_1(data);
            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        };

        loadEdges();
    }, []);

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const floorLayer20_1 = L.layerGroup();
            const floorLayer20_3 = L.layerGroup();
            const floorLayer22_1 = L.layerGroup();
            const floorLayer22_3 = L.layerGroup();
            const floorLayer22_4 = L.layerGroup();
            const floorLayerChestnutHill = L.layerGroup();
            const floorLayerFaulkner = L.layerGroup();

            const map = L.map(mapRef.current, {crs: L.CRS.Simple, minZoom: -2, zoomControl: false}).setView([500, 500], 0);

            // bounds for all floorplans
            const bounds: L.LatLngBoundsLiteral = [[0, 0], [1000, 1000],];

            // image overlays
            L.imageOverlay(patriot20Floor1, bounds).addTo(floorLayer20_1);
            L.imageOverlay(patriot20Floor3, bounds).addTo(floorLayer20_3);
            L.imageOverlay(patriot22Floor1, bounds).addTo(floorLayer22_1);
            L.imageOverlay(patriot22Floor3, bounds).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds).addTo(floorLayer22_4);
            L.imageOverlay(chestnutHill, bounds).addTo(floorLayerChestnutHill);
            L.imageOverlay(faulkner, bounds).addTo(floorLayerFaulkner);

            addFloorTransitionMarkers(map, floorLayer20_1, floorLayer20_3, floorLayer22_1, floorLayer22_3, floorLayer22_4, floorLayerChestnutHill, floorLayerFaulkner);

            connectBuildings(map, floorLayer20_3, floorLayer22_3);

            // parking lot markers
            lots
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 1)
                .map((lot) => {
                    const place= L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_1)
                    clickMarker(lot, place);
                });
            lots
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 1)
                .map((lot) => {
                    const place= L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_1)
                    clickMarker(lot, place);
                });
            lots
                .filter(lot => lot.building === "CHESTNUT_HILL" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).bindPopup('Entrance').addTo(floorLayerChestnutHill)
                    clickMarker(lot, place);
                })
            L.marker([0.0, 0.00]).bindPopup('???').addTo(floorLayerFaulkner);
            //TODO: add/edit faulkner markers

            entrances
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 1)
                .map((lot) => {
                   const place= L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_1)
                    clickMarker(lot, place);
                });

            entrances
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 3)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_3)
                    clickMarker(lot, place);
                } );

            entrances
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_1)
                    clickMarker(lot, place);
                })

            entrances
                .filter(lot => lot.building === "CHESTNUT_HILL" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayerChestnutHill)
                    clickMarker(lot, place);
                })

            checkIn
                .filter(lot => lot.building === "CHESTNUT_HILL" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayerChestnutHill)
                    clickMarker(lot, place);
                })

            checkIn
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_1)
                    clickMarker(lot, place);
                    })

            checkIn
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 3)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_3)
                    clickMarker(lot, place);
                })

            checkIn
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 1)
                .map((lot) => {
                   const place =  L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_1)
                    clickMarker(lot, place);
                })

            checkIn
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 3)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_3)
                    clickMarker(lot, place);
                })

            checkIn
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 4)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_4)
                    clickMarker(lot, place);
                })
            elevators
                .filter(lot => lot.building === "CHESTNUT_HILL" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayerChestnutHill)
                    clickMarker(lot, place);
                })

            elevators
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 1)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_1)
                    clickMarker(lot, place);
                })

            elevators
                .filter(lot => lot.building === "PATRIOT_PLACE_20" && lot.floor === 3)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer20_3)
                    clickMarker(lot, place);
                })

            elevators
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 1)
                .map((lot) => {
                    const place =  L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_1)
                    clickMarker(lot, place);
                })

            elevators
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 3)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_3)
                    clickMarker(lot, place);
                })

            elevators
                .filter(lot => lot.building === "PATRIOT_PLACE_22" && lot.floor === 4)
                .map((lot) => {
                    const place = L.marker([lot.xcoord, lot.ycoord]).addTo(floorLayer22_4)
                    clickMarker(lot, place);
                })
            //TODO: add faulkner stuff here?
            {edges20_1
                .map((edge) => (
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayer20_1)
                ))}

            // add a default layer
            if (location.includes('20 Patriot Pl'))
                floorLayer20_1.addTo(map);
            else if (location.includes('22 Patriot Pl'))
                floorLayer22_1.addTo(map);
            else if (location.includes('Chestnut Hill'))
                floorLayerChestnutHill.addTo(map);
            else if (location.includes('Faulkner'))
                floorLayerFaulkner.addTo(map)

            // === LAYER CONTROLS ===
            const baseLayers = {
                '20 Patriot Place - Floor 1': floorLayer20_1,
                '20 Patriot Place - Floor 3': floorLayer20_3,
                '22 Patriot Place - Floor 1': floorLayer22_1,
                '22 Patriot Place - Floor 3': floorLayer22_3,
                '22 Patriot Place - Floor 4': floorLayer22_4,
                'Chestnut Hill': floorLayerChestnutHill,
                'Faulkner' : floorLayerFaulkner
            };

            L.control.layers(baseLayers).addTo(map);

            // path
            if (pathCoordinates && pathCoordinates.length > 1) L.polyline(pathCoordinates, {color: 'red', weight: 3, opacity: 0.8}).addTo(map);

            // for getting coordinates (can delete later)
            map.on('click', function (e) {
                console.log(`[${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}],`);
            });

            mapInstance.current = map;

            (window as unknown as { goToFloor: (floor: number) => void }).goToFloor = (floor: number) => {
                goToFloor(
                    floor,
                    map,
                    floorLayer22_1,
                    floorLayer22_3,
                    floorLayer22_4,
                    floorLayerChestnutHill,
                    floorLayerFaulkner
                );
            };
        }

        // clean up
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    },);

    return (
        <div>
            <div
                ref={mapRef}
                style={{
                    height: '100vh',
                    width: '100%',
                    border: '1px solid #ccc',
                    position: 'relative',
                    zIndex: 0
                }}
            />
        </div>
    );
};

export default InternalMap;