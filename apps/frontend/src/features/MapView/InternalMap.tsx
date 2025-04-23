import React, {useEffect, useRef, useState} from 'react';
import L, {latLng} from 'leaflet';
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
import { fetchCheckIn, fetchEdges20_1, fetchElevators, fetchEdges22_1, fetchEdges22_3, fetchEdges22_4, fetchEdgesChestnut, fetchEntrances, fetchParkingLots, fetchEdgesFaulkner, fetchHallways, fetchOther } from "@/features/MapView/mapService.ts";
import { Node, Edge } from '../../../../backend/src/routes/mapData.ts';
import { AxiosResponse } from 'axios';

declare global {
  interface Window {
    goToFloor?: (floor: number, building?: string) => void;
  }
}

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    location: string;
    onLocationChange?: (building:string, floor:number) => void;
    onDataChange?: (name:string, value:string|number) => void; // for actions that are triggered in the internal map using data from the internal map
    onNodeDelete?: (nodeID:string) => Promise<void>;           // for actions that are triggered in the internal map using data from the internal map
    onEdgeDelete?: (edgeID:string) => Promise<void>;
    promiseNodeCreate?: Promise<void>; // for actions that are triggered in the map page using map page data but need to trigger events in the internal map
    promiseEdgeCreate?: Promise<void>;
    onNodeSelect?: (nodeID:string) => void;
    showEdges?: boolean;
}

const nodePlaceholderOptions = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5
}

const InternalMap: React.FC<InternalMapProps> = ({pathCoordinates, location, onLocationChange, onDataChange, onNodeDelete, onEdgeDelete, promiseNodeCreate, promiseEdgeCreate, onNodeSelect, showEdges}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const routeLayer = useRef<L.Polyline | null>(null);

    const [checkIn, setCheckIn] = useState<Node[]>([]);
    const [other, setOther] = useState<Node[]>([]);
    const [entrances, setEntrances] = useState<Node[]>([]);
    const [elevators, setElevators] = useState<Node[]>([]);
    const [lots, setLots] = useState<Node[]>([]);
    const [hallways, setHallways] = useState<Node[]>([]);
    const [edges20_1, setEdges20_1] = useState<Edge[]>([]);
    const [edges22_1, setEdges22_1] = useState<Edge[]>([]);
    const [edges22_3, setEdges22_3] = useState<Edge[]>([]);
    const [edges22_4, setEdges22_4] = useState<Edge[]>([]);
    const [edgesChestnut, setEdgesChestnut] = useState<Edge[]>([]);
    const [edgesFaulkner, setEdgesFaulkner] = useState<Edge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if(promiseNodeCreate) {
            console.log(promiseNodeCreate);
            promiseNodeCreate.then(async () => {
                await loadAll();
                console.log("loaded all stuff");
            });
        }
    }, [promiseNodeCreate]);

    useEffect(() => {
        if(promiseEdgeCreate) {
            console.log(promiseEdgeCreate);
            promiseEdgeCreate.then(async () => {
                console.log("Created stuff");
                await loadAll();
                console.log("loaded all stuff");
            });
        }
    }, [promiseEdgeCreate]);


    // callback function for clicking on nodes
    function clickMarker(data:Node, marker:L.Marker):void{
        marker.on('click', () => {
            const info = `
        <p>Name: ${data.shortName}</p>
        <p>Building: ${data.building}</p>
        <p>Floor: ${data.floor}</p>
        <p>X Coordinate: ${data.xcoord}</p>
        <p>Y Coordinate: ${data.ycoord}</p>
      `;
            marker.bindPopup(info).openPopup();
            // tell the parent element if the node has been selected
            if(onNodeSelect) {
                onNodeSelect(data.nodeID);
            }
        });

        marker.on('contextmenu', () => {
            if (data.nodeID !== undefined) {
                // delete the node, and then reload everything from the database
                if(onNodeDelete) {
                    onNodeDelete(data.nodeID).then(loadAll);
                }
            }
        })
    }

    function clickEdge(edge:Edge, pLine:L.Polyline){
        pLine.on('contextmenu', () => {
            console.log("delete edge "+edge.edgeID);
            if(onEdgeDelete) {
                onEdgeDelete(edge.edgeID).then(loadAll);
            }
        })
    }

    const loadCheckIn = async () => {
        try {
            const data = await fetchCheckIn();
            setCheckIn(data);
        } catch (err) {
            console.error('Error fetching parking lots:', err);
        }
    };
    const loadEntrances = async () => {
        try {
            const data = await fetchEntrances();
            setEntrances(data);
        } catch (err) {
            console.error('Error fetching parking lots:', err);
        }
    };
    const loadElevators = async () => {
        try {
            const data = await fetchElevators();
            setElevators(data);
        } catch (err) {
            console.error('Error fetching parking lots:', err);
        }
    };
    const loadLots = async () => {
        try {
            const data = await fetchParkingLots();
            setLots(data);
        } catch (err) {
            console.error('Error fetching parking lots:', err);
        }
    };
    const loadHallways = async () => {
        try {
            const data = await fetchHallways();
            console.log(data);
            setHallways(data);
        } catch (err) {
            console.error('Error fetching hallways lots:', err);
        }
    }
    const loadOther = async () => {
        try {
            const data = await fetchOther();
            setOther(data);
            console.log("data:", data);
        } catch (err) {
            console.error('Error fetching parking lots:', err);
        }
    }
    console.log("hallways: ",hallways)
    async function loadAll() {
        await loadCheckIn();
        await loadEntrances();
        await loadElevators();
        await loadLots();
        await loadHallways();
        await loadOther();
    }
    useEffect(() => {
        loadAll();
    }, []);

    useEffect(() => {
        const loadEdges = async () => {
            try {
                setIsLoading(true);
                const data201 = await fetchEdges20_1();
                setEdges20_1(data201);
                const data221 = await fetchEdges22_1();
                setEdges22_1(data221);
                const data223 = await fetchEdges22_3();
                setEdges22_3(data223);
                const data224 = await fetchEdges22_4();
                setEdges22_4(data224);
                const dataChestnut = await fetchEdgesChestnut();
                setEdgesChestnut(dataChestnut);
                setEdgesFaulkner(await fetchEdgesFaulkner());
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

    const floorLayer20_1 = L.layerGroup();
    const floorLayer22_1 = L.layerGroup();
    const floorLayer22_3 = L.layerGroup();
    const floorLayer22_4 = L.layerGroup();
    const floorLayerChestnutHill = L.layerGroup();
    const floorLayerFaulkner = L.layerGroup();

    function getLayer (building:string, floor: number){
        let out = null;
        switch (building) {
            case 'Patriot Place 20':
                switch (floor) {
                    case 1:
                        out = floorLayer20_1;
                        break;
                    default:
                        console.log("a node had an invalid floor number");
                        break;
                }
                break;
            case 'Patriot Place 22':
                switch (floor) {
                    case 1:
                        out = floorLayer22_1;
                        break;
                    case 3:
                        out = floorLayer22_3;
                        break;
                    case 4:
                        out = floorLayer22_4;
                        break;
                    default:
                        console.log("a node had an invalid floor number");
                        break;
                }
                break;
            case 'Chestnut Hill':
                out = floorLayerChestnutHill;
                break;
            case 'Faulkner':
                out = floorLayerFaulkner;
                break;
            default:
                console.log("a node had an invalid building");
                break;
        }
        return out;
    }

    // Initialize map once
    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
                minZoom: -2,
                zoomControl: false,
            }).setView([500, 500], 0);

            // start the placeholer off screen
            const nodePlaceholder = L.circle([-100,-100], nodePlaceholderOptions).addTo(map);

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
            L.imageOverlay(chestnutHill, boundsChestnutHill).addTo(floorLayerChestnutHill);
            L.imageOverlay(faulkner, boundsFaulkner).addTo(floorLayerFaulkner);

            // Layer controls
            L.control.layers({
                        '20 Patriot Place - Floor 1': floorLayer20_1,
                        '22 Patriot Place - Floor 1': floorLayer22_1,
                        '22 Patriot Place - Floor 3': floorLayer22_3,
                        '22 Patriot Place - Floor 4': floorLayer22_4,
                        'Chestnut Hill': floorLayerChestnutHill,
                        'Faulkner': floorLayerFaulkner,
                    }, {}).addTo(map);

            if(showEdges) {
                // draw nodes
                if(hallways.length > 0) {
                    console.log("HALLWAYS!");
                    hallways.map((node) => {
                        // put it on the correct floor
                        const layer = getLayer(node.building, node.floor);
                        // only place it if the floor is valid
                        if (layer) {
                            const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                            clickMarker(node, place);
                        }
                    });
                }
                checkIn.map((node) => {
                    // put it on the correct floor
                    const layer = getLayer(node.building, node.floor);
                    // only place it if the floor is valid
                    if (layer) {
                        const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                        clickMarker(node, place);
                    }
                });
                other.map((node) => {
                    // put it on the correct floor
                    const layer = getLayer(node.building, node.floor);
                    // only place it if the floor is valid
                    if (layer) {
                        const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                        clickMarker(node, place);
                    }
                });
                entrances.map((node) => {
                    // put it on the correct floor
                    const layer = getLayer(node.building, node.floor);
                    // only place it if the floor is valid
                    if (layer) {
                        const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                        clickMarker(node, place);
                    }
                });
                lots.map((node) => {
                    // put it on the correct floor
                    const layer = getLayer(node.building, node.floor);
                    // only place it if the floor is valid
                    if (layer) {
                        const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                        clickMarker(node, place);
                    }
                });
                elevators.map((node) => {
                    // put it on the correct floor
                    const layer = getLayer(node.building, node.floor);
                    // only place it if the floor is valid
                    if (layer) {
                        const place = L.marker([node.xcoord, node.ycoord]).addTo(layer);
                        clickMarker(node, place);
                    }
                });

                // draw edges
                console.log(edges22_1);
                edges20_1.map((edge) => {
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayer20_1);

                });
                if(edges22_1) {
                    edges22_1.map((edge) => {
                        const line = L.polyline([
                            [edge.fromNode.xcoord, edge.fromNode.ycoord],
                            [edge.toNode.xcoord, edge.toNode.ycoord],
                        ]).addTo(floorLayer22_1);
                        clickEdge(edge, line);
                    });
                }
                edges22_3.map((edge) => {
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayer22_3);
                });
                edges22_4.map((edge) => {
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayer22_4);
                });
                edgesChestnut.map((edge) => {
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayerChestnutHill);
                });
                edgesFaulkner.map((edge) => {
                    L.polyline([
                        [edge.fromX, edge.fromY],
                        [edge.toX, edge.toY],
                    ]).addTo(floorLayerFaulkner);
                });
            }

            // add a default layer
            if (location.includes('20 Patriot Pl')) {
                floorLayer20_1.addTo(map);
            } else if (location.includes('22 Patriot Pl')) {
                floorLayer22_1.addTo(map);
            } else if (location.includes('Chestnut Hill')) {
                floorLayerChestnutHill.addTo(map);
            } else if (location.includes('Faulkner')) {
                floorLayerFaulkner.addTo(map);
            }

            // for getting coordinates (can delete later)
            map.on('click', function (e) {
                // parse the new coordinates
                const x = e.latlng.lat.toFixed(2)
                const y = e.latlng.lng.toFixed(2);
                console.log("["+x+", "+y+"]");

                // update the placeholder
                nodePlaceholder.setLatLng(e.latlng);
            });
      


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
    }, [pathCoordinates, entrances, checkIn, hallways, edges20_1, edges22_1, edges22_3, edges22_4, edgesChestnut, edgesFaulkner]);

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