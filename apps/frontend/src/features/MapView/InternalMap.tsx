import React, {useEffect, useRef, useState} from 'react';
import L, {LeafletEvent} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import patriot20Floor1 from '../../../public/20patriot1.svg';
import patriot22Floor1 from '../../../public/22patriot1.svg';
import patriot22Floor3 from '../../../public/22patriot3.svg';
import patriot22Floor4 from '../../../public/22patriot4.svg';
import chestnutHill from '../../../public/chestnutHill1.svg';
import faulkner from '../../../public/faulkner1.svg';
import womens from '../../../public/womens2.svg';
import {goToFloor} from '../MapView/floorNavigation.ts';
import './leaflet.css';
import {
    fetchCheckIn,
    fetchEdges20_1,
    fetchElevators,
    fetchEdges22_1,
    fetchEdges22_3,
    fetchEdges22_4,
    fetchEdgesChestnut,
    fetchEdgesWomensHospital,
    fetchEntrances,
    fetchParkingLots,
    fetchEdgesFaulkner,
    fetchHallways,
    fetchOther,
    fetchNodes, fetchAll, fetchEdges,
} from '@/features/MapView/mapService.ts';
import { Node, Edge } from '../../../../backend/src/routes/maps/mapData.ts';
import 'leaflet-ant-path';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import { getFilter } from 'next/dist/build/webpack/loaders/css-loader/src/utils';

/*
* Plan for Nodes
* 1. fetch all the nodes for a floor and store them in nodesOnActiveFloor (used to be allMarkers)
* 2. create marker objects for the nodes on that floor in allMarkers
* 3. add all the markers we want to the active layer, and remove all the other ones
* 4. When a node is added or deleted, repeat steps 1-3
* 5. When we have different filter settings, do step 3
*
* Plan for Edges
* same?
* */

declare module 'leaflet' {
    interface Map {
        startMarker?: L.Marker | null;
        endMarker?: L.Marker | null;
    }

    interface PolylineStatic {
        antPath(
            latlngs: L.LatLngExpression[] | L.LatLngExpression[][],
            options?: L.PolylineOptions & {
                delay?: number;
                dashArray?: [number, number];
                weight?: number;
                color?: string;
                pulseColor?: string;
                paused?: boolean;
                reverse?: boolean;
                hardwareAccelerated?: boolean;
            }
        ): L.Polyline;
    }
}

interface InternalMapProps {
    pathCoordinates?: [number, number][];
    pathByFloor?: Record<number, [number, number][]>;
    // currentFloor?: number; // don't need?
    // this location is dynamic, but does not have to be updated (onLocationChange is optional)
    location: {building:string, floor:number};
    // floor?: number;
    onLocationChange?: (building:string, floor:number) => void;
    onDataChange?: (name:string, value:string|number) => void; // for actions that are triggered in the internal map using data from the internal map
    onNodeDelete?: (nodeID:string) => Promise<void>;           // for actions that are triggered in the internal map using data from the internal map
    onEdgeDelete?: (edgeID:string) => Promise<void>;
    promiseNodeCreate?: Promise<void>; // for actions that are triggered in the map page using map page data but need to trigger events in the internal map
    promiseEdgeCreate?: Promise<void>;
    onNodeSelect?: (nodeID:string) => void;
    showEdges?: boolean;
    onCoordSelect?: (x:number, y:number) => void;
    onNodeDrag?: (x:number, y:number, nodeID:string, nodeType:string) => void;
    onNodeEdit?: (x:number, y:number, nodeID:string) => void;
    onToggle?:(bool:boolean) => void;
    selectedEdgeNodes?: string[];
}

// persistent leaflet elements
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const violetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});



const nodePlaceholderOptions = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5
}

const InternalMap: React.FC<InternalMapProps> = ({pathCoordinates, pathByFloor, location, onLocationChange, onDataChange, onNodeDelete, onEdgeDelete, promiseNodeCreate, promiseEdgeCreate, onNodeSelect, showEdges, onCoordSelect, onNodeDrag,onNodeEdit, onToggle,selectedEdgeNodes}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const routeLayer = useRef<L.Polyline | null>(null);
    const lastLoadedLocation = useRef({building:'', floor:-1});
    // TODO: needs to match with all the other layer stuff, look at onLocationChange. Just use old one
    // const activeLayerInfo = useRef<{building: string, floor: number}>({
    //     building: 'Patriot Place 20',
    //     floor: 1
    // });
    // store the node data and the marker objects for each node
    // in this way, we can filter markers using node data
    const [nodesOnActiveFloor, setNodesOnActiveFloor] = useState<{nodeData:Node, marker:L.Marker}[]>([]);
    const [edgesOnActiveFloor, setEdgesOnActiveFloor] = useState<{edgeData:Edge, polyLine:L.Polyline}[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const highlightedNodeLayers = useRef<L.Circle[]>([]);

    const selectedNodeStyle = {
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.8,
        radius: 10,
        weight: 3
    };

    const [hallwayFiltered, setHallwayFiltered] = useState(false);  // whether to show that type of node or not. False means the node type should be shown
    const [receptionFiltered, setReceptionFiltered] = useState(false);
    const [entranceFiltered, setEntranceFiltered] = useState(false);
    const [elevatorFiltered, setElevatorFiltered] = useState(false);
    const [parkingLotFiltered, setParkingLotFiltered] = useState(false);
    const [sidewalkingFiltered, setSidewalkingFiltered] = useState(false);


    const floorLayer20_1 = L.layerGroup();
    const floorLayer22_1 = L.layerGroup();
    const floorLayer22_3 = L.layerGroup();
    const floorLayer22_4 = L.layerGroup();
    const floorLayerChestnutHill = L.layerGroup();
    const floorLayerFaulkner = L.layerGroup();
    const floorLayerWomens = L.layerGroup();

    // ******* FUNCTIONS ********
    // get current active layer info
    // const getActiveLayerInfo = () => {
    //     return activeLayerInfo.current;
    // };
    // callback function for clicking on nodes
    function clickMarker(data:Node, marker:L.Marker):void{
        marker.on('click',()=> {
            const info = `
        <p>Name: ${data.shortName}</p>
        <p>Node Type: ${data.nodeType}</p>
        <p>Building: ${data.building}</p>
        <p>Floor: ${data.floor}</p>
        <p>X Coordinate: ${data.xcoord}</p> 
        <p>Y Coordinate: ${data.ycoord}</p>
      `;
            marker.bindPopup(info).openPopup();

            // tell the parent element if the node has been selected
            if (onNodeSelect) {
                onNodeSelect(data.nodeID);
            }
        })

        marker.on('contextmenu', () => {
            if (data.nodeID !== undefined) {
                // delete the node, and then reload everything from the database
                if(onNodeDelete) {
                    onNodeDelete(data.nodeID).then(loadAll);
                }
            }
        })
    }
    function dragMarker(node:Node, marker: L.Marker, e:LeafletEvent):void{
        marker.on('drag',()=>{
            // parse the new coordinates
            // super ugly way of truncating to two digits
        const marker = e.target as L.Marker
            const draggedLatlng = marker.getLatLng();
            const x = parseFloat(draggedLatlng.lat.toFixed(2));
            const y = parseFloat(draggedLatlng.lng.toFixed(2));
            console.log("[x: "+x+", y:"+y+"]");

            // send coordinates to parent function
        if(onNodeDrag) {
            console.log("Calling onNodeEdit with:", x, y, node.nodeID);
            onNodeDrag(x, y, node.nodeID, node.nodeType);

        }
    })


    }

    console.log("App Update");
    console.log(location.building + ' ' + location.floor);

    function clickEdge(edge:Edge, pLine:L.Polyline){
        pLine.on('contextmenu', () => {
            console.log("delete edge "+edge.edgeID);
            if(onEdgeDelete) {
                onEdgeDelete(edge.edgeID).then(loadAll);
            }
        })
    }
    // get all nodes for the current floor and create markers for them as well
    const loadAllNodes = async () => {
        if(location.building === lastLoadedLocation.current.building && location.floor === lastLoadedLocation.current.floor)
        {
            return;
        }
        else {
            try {
                // const data = await fetchAll();
                // gets all type of nodes for the floor
                console.log("Loading nodes");
                const nodes = (await fetchNodes({building: location.building, floor: location.floor})).data;
                console.log("recieved nodes");
                console.log(nodes);

                // create fullNodes that have the data of the node and a marker object
                const fullNodes = nodes.map((node: Node) => {
                    if(getIcon(node.nodeType)!=redIcon) {
                        const marker = L.marker([node.xcoord, node.ycoord], {
                            icon: getIcon(node.nodeType),
                            draggable: true
                        });
                        marker.on('click', () => clickMarker(node, marker));
                        marker.on('drag', (e) => dragMarker(node, marker, e));
                        return {nodeData: node, marker: marker}
                    }
                    else{
                        console.log("It's a red marker!!!")
                        const marker = L.marker([node.xcoord, node.ycoord], {
                            icon: getIcon(node.nodeType),
                        });

                        return {nodeData: node, marker: marker}
                    }
                })

                // setAllMarkers(response.data);
                // console.log(data);

                setNodesOnActiveFloor(fullNodes);
                lastLoadedLocation.current.floor = fullNodes.floor;
                lastLoadedLocation.current.building = fullNodes.building;

            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }
        }
    }
    const loadAllEdges = async () => {
        if (
            location.building === lastLoadedLocation.current.building &&
            location.floor === lastLoadedLocation.current.floor
        ) {
            return;
        }
            try {
                // const data = await fetchAll();

                console.log("Loading nodes");
                const edges = (await fetchEdges({building: location.building, floor: location.floor})).data;
              console.log("edges:",edges)

                const fullEdges = edges.map((edge: Edge) => {


                 const line =  L.polyline([
                        [edge.fromNode.xcoord, edge.fromNode.ycoord],
                        [edge.toNode.xcoord, edge.toNode.ycoord],
                    ])
                    console.log("we reached here");
                    return {edgeData: edge, polyLine:line }
                })
setEdgesOnActiveFloor(fullEdges)
                lastLoadedLocation.current.floor = fullEdges.floor;
                lastLoadedLocation.current.building = fullEdges.building;

                // setAllMarkers(response.data);
                // console.log(data);

            } catch (err) {
                console.error('Error fetching parking lots:', err);
            }


    }

    function loadAll() {
        Promise.all([loadAllEdges(),loadAllNodes()]);
        console.log("Loading nodes");
        // await loadEdges();
    }

    function getIcon (nodeType:string) {
        switch (nodeType) {
            case "Entrance":
                if (!entranceFiltered) {
                    return greenIcon;
                }
                return redIcon;
            case "Parking":
                if (!parkingLotFiltered) {
                    return yellowIcon;
                }
                return redIcon;
            case "Reception":
                if (!receptionFiltered) {
                    return violetIcon;
                }
                return redIcon;
            case "Hallway":
                if (!hallwayFiltered) {
                    return greyIcon;
                }
                return redIcon;
            case "Sidewalk":
                if (!sidewalkingFiltered) {
                    return blackIcon;
                }
                return redIcon;
            case "Elevator":
                if (!elevatorFiltered) {
                    return blueIcon;
                }
                return redIcon;
            default:
                return undefined
        }
    }

    // return whether or not that marker type should be displayed or not (using Icon
    function isFiltered (nodeType:string) {
        switch (nodeType) {
            case "Entrance":
                loadAll()
                setEntranceFiltered(!entranceFiltered);
                loadAll();

                break;
            case "Parking":
                loadAll()
                setParkingLotFiltered(!parkingLotFiltered);
                loadAll();

                break;
            case "Reception":
                setReceptionFiltered(!receptionFiltered);
                loadAll()
                break;
            case "Hallway":
                setHallwayFiltered(!hallwayFiltered);
                loadAll()
                break;
            // do we even have sidewalks?, apparently
            case "Sidewalk":
                setSidewalkingFiltered(!sidewalkingFiltered);
                loadAll()
                break;
            case "Elevator":
                setElevatorFiltered(!elevatorFiltered);
                loadAll()
                break;
            default:
                console.error("Invalid nodeType: "+nodeType);
                return true
        }

    }

    function getLayer (building:string, floor: number){
        let out = null;
        switch (building) {
            case 'Healthcare Center (20 Patriot Pl.)':
                out = floorLayer20_1;
                break;
            case 'Healthcare Center (22 Patriot Pl.)':
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
            case 'Healthcare Center (Chestnut Hill)':
                out = floorLayerChestnutHill;
                break;
            case 'Faulkner Hospital':
                out = floorLayerFaulkner;
                break;
            case 'Main Campus Hospital (75 Francis St.)':
                out = floorLayerWomens;
                break;
            default:
                console.log("that building does not exist: "+building);
                break;
        }
        return out;
    }

    // every node that we want to display gets created as a marker with the node's coordinates, icon, and options, and then is added to the layer

    // ****** USE EFFECTS *********

    // trigger a reload of nodes and edges when the parent functions says that a node has been created, deleted, or updated
    useEffect(() => {
        if(promiseNodeCreate) {
            console.log(promiseNodeCreate);
            promiseNodeCreate.then(async () => {
                await loadAll();
                console.log("loaded all stuff");
            });
        }
    }, [promiseNodeCreate]);

    // trigger a reload of nodes and edges (maybe could just be edges) when the parent functions says that an edge has been created or deleted
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



    // load all the nodes and edges when the location changes (location change causes a rerender of the whole component?)
    useEffect(() => {
        loadAll()
        console.log("-> new location and or floor");
        console.log(location.building + " "+location.floor);
    }, [location.building,location.floor]);
    useEffect(() => {
        loadAll()
        console.log("-> new location and or floor");
        console.log(location.building + " "+location.floor);
    }, [hallwayFiltered, entranceFiltered, sidewalkingFiltered, elevatorFiltered, receptionFiltered, parkingLotFiltered]);

    // reload the leaflet elements when something changes
    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            // when the nodes and markers are loaded, display them
            if(nodesOnActiveFloor && edgesOnActiveFloor) {
                console.log(nodesOnActiveFloor.length+" full nodes exist now in this state!");
                // check if the layer exists for the building and floor we are in
                const layer = getLayer(location.building, location.floor);
                // console.log(activeLayerInfo.current);
                console.log("layer:", layer);
                if(layer) {
                    edgesOnActiveFloor.map((fullEdge) => {
                        // check if we want to display that type
                        // console.log("attemption to add to layer");
                        //console.log("layers:",layer)
                        fullEdge.polyLine.addTo(layer);


                    })
                    nodesOnActiveFloor.map((fullNode) => {
                        // check if we want to display that type
                            fullNode.marker.addTo(layer);
                    })
                    console.log("reached here")
                    console.log("Edges given", edgesOnActiveFloor)


                }
            }
            const map = L.map(mapRef.current, {
                crs: L.CRS.Simple,
                minZoom: -2,
                zoomControl: false,
            }).setView([500, 500], 0);

            // start the placeholder off-screen
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

            const boundsWomens: L.LatLngBoundsLiteral = [
                [-80, -35],
                [900, 1300],
            ];

            // Add floorplan overlays
            L.imageOverlay(patriot20Floor1, bounds20_1).addTo(floorLayer20_1);
            L.imageOverlay(patriot22Floor1, bounds22_1).addTo(floorLayer22_1);
            L.imageOverlay(patriot22Floor3, bounds22_3).addTo(floorLayer22_3);
            L.imageOverlay(patriot22Floor4, bounds22_4).addTo(floorLayer22_4);
            L.imageOverlay(chestnutHill, boundsChestnutHill).addTo(floorLayerChestnutHill);
            L.imageOverlay(faulkner, boundsFaulkner).addTo(floorLayerFaulkner);
            L.imageOverlay(womens, boundsWomens).addTo(floorLayerWomens);

            // layer controls
            L.control.layers({
                '20 Patriot Place - Floor 1': floorLayer20_1,
                '22 Patriot Place - Floor 1': floorLayer22_1,
                '22 Patriot Place - Floor 3': floorLayer22_3,
                '22 Patriot Place - Floor 4': floorLayer22_4,
                'Chestnut Hill Healthcare Center': floorLayerChestnutHill,
                'Faulkner Hospital': floorLayerFaulkner,
                'Main Campus Hospital': floorLayerWomens,
            }, {}).addTo(map);

            // tracking layer changes



            // add a default layer
            if (typeof location.building === "string") {
                if (location.building.includes('20')) {
                    floorLayer20_1.addTo(map);
                } else if (location.building.includes('22')) {
                    if(location.floor == 1) {
                        floorLayer22_1.addTo(map);
                    }else if(location.floor == 3) {
                        floorLayer22_3.addTo(map);
                    }else if(location.floor == 4) {
                        floorLayer22_4.addTo(map);
                    }
                } else if (location.building.includes('Chestnut Hill')) {
                    floorLayerChestnutHill.addTo(map);
                } else if (location.building.includes('Faulkner')) {
                    floorLayerFaulkner.addTo(map);
                }
                else if (location.building.includes('Main')) {
                    floorLayerWomens.addTo(map);
                }
            }
            map.on('baselayerchange', function(e) {
                // extract info from layer name
                const layerName = e.name;
                let building = '';
                let floor = 1;

                if (layerName.includes('20')||layerName.includes('20 Patriot')) {
                    building = 'Healthcare Center (20 Patriot Pl.)';
                } else if (layerName.includes('22' ) || layerName.includes('22 Patriot')) {
                    building = 'Healthcare Center (22 Patriot Pl.)';
                    floor = parseInt(layerName.match(/Floor (\d+)/)?.[1] || '1');
                } else if (layerName.includes('Chestnut Hill')) {
                    building = 'Healthcare Center (Chestnut Hill)';
                } else if (layerName.includes('Faulkner Hospital')) {
                    building = 'Faulkner Hospital';
                } else if (layerName.includes('Main')) {
                    building = 'Main Campus Hospital (75 Francis St.)';
                }

                // activeLayerInfo.current = {building, floor};
                console.log("Layer changed to:" + building + floor);
                location.building = building;
                location.floor = floor;

                if (onLocationChange) {
                    onLocationChange(building, floor);
                }
            });


            map.on('click', function (e) {
                // parse the new coordinates
                // super ugly way of truncating to two digits
                const x = parseFloat(e.latlng.lat.toFixed(2));
                const y = parseFloat(e.latlng.lng.toFixed(2));
                console.log("["+x+", "+y+"]");

                // send coordinates to parent function
                if(onCoordSelect) {
                    onCoordSelect(x, y);
                }

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
                    floorLayerWomens,
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
    }, [nodesOnActiveFloor, edgesOnActiveFloor]); //entrances, checkIn, hallways, edges20_1, edges22_1, edges22_3, edges22_4, edgesChestnut, edgesFaulkner

    // Redraw route whenever pathCoordinates change
    useEffect(() => {
        if (!mapInstance.current) return;
        // remove existing route
        if (routeLayer.current) {
            routeLayer.current.remove();
            routeLayer.current = null;
        }

        const currentFloor = location.floor; // TODO:??

        const currentFloorPath = pathByFloor?.[currentFloor || 1] || [];

        // draw new route
        if (currentFloorPath.length > 1) {
            console.log("Drawing path for floor", currentFloor);


            // ant path animation
            const antPathOptions = {
                delay: 100, // Delay in milliseconds between dashes
                dashArray: [10, 20], // Defines the pattern of dashes and gaps
                weight: 5, // Line weight
                color: 'darkorange', // Line color
                pulseColor: '#FFFFFF', // Color of the pulsing outline
                paused: false, // Whether the animation is paused
                reverse: false, // Reverse the animation direction
                hardwareAccelerated: true // Use hardware acceleration if possible
            };

            // ignore the fact that antPath never resolves properly for me
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const antPoly = L.polyline.antPath(currentFloorPath, antPathOptions);
            antPoly.addTo(mapInstance.current);
            routeLayer.current = antPoly

            // Always create start and end markers for each floor's path segment
            if (pathCoordinates && pathCoordinates.length > 0 && currentFloorPath.length > 0) {
                // Create references to store markers so we can remove them later
                if (!mapInstance.current.startMarker) {
                    mapInstance.current.startMarker = null;
                    mapInstance.current.endMarker = null;
                }

                // Remove previous markers if they exist
                if (mapInstance.current.startMarker) {
                    mapInstance.current.startMarker.remove();
                    mapInstance.current.startMarker = null;
                }

                if (mapInstance.current.endMarker) {
                    mapInstance.current.endMarker.remove();
                    mapInstance.current.endMarker = null;
                }

                // Add start marker for this floor's path segment
                mapInstance.current.startMarker = L.marker(currentFloorPath[0], {
                    title: "Start",
                    icon: L.divIcon({ className: 'start-marker' }),
                }).addTo(mapInstance.current);

                // Add end marker for this floor's path segment
                mapInstance.current.endMarker = L.marker(currentFloorPath[currentFloorPath.length - 1], {
                    title: "End",
                    icon: L.divIcon({ className: 'end-marker' }),
                }).addTo(mapInstance.current);
            }
        }
    }, [pathCoordinates, pathByFloor]); // also on location ?

    // function to update highlighted nodes
    const updateHighlightedNodes = () => {
        // clear previous highlights
        highlightedNodeLayers.current.forEach(layer => layer.remove());
        highlightedNodeLayers.current = [];

        if (!mapInstance.current || !selectedEdgeNodes?.length) return;


        // highlight selected nodes
        selectedEdgeNodes.forEach(nodeId => {
            const node = nodesOnActiveFloor.find(n => n.nodeData.nodeID === nodeId);
            if (node) {
                const highlight = L.circle(
                    [node.nodeData.xcoord, node.nodeData.ycoord],
                    selectedNodeStyle
                ).addTo(mapInstance.current!);
                highlightedNodeLayers.current.push(highlight);
            }
        });
    };

    useEffect(() => {
        updateHighlightedNodes();
    }, [selectedEdgeNodes, nodesOnActiveFloor]);

    // ******** ACTUAL HTML *********
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
            {onToggle?
            <div className={"absolute bottom-20 right-4"} style={{position:'absolute', zIndex:0}}>
                <ToggleGroup type={"multiple"} >
                    <ToggleGroupItem value={"None"}>None</ToggleGroupItem>
                    <ToggleGroupItem value={"Hallways"} onClick={()=>isFiltered("Hallway")}>H</ToggleGroupItem>
                    <ToggleGroupItem value={"Entrances"} onClick={()=>isFiltered("Entrance")}>EN</ToggleGroupItem>
                    <ToggleGroupItem value={"Parking Lots"} onClick={()=>isFiltered("Parking")}>PL</ToggleGroupItem>
                    <ToggleGroupItem value={"Reception"} onClick={()=>isFiltered("Reception")}>R</ToggleGroupItem>
                    <ToggleGroupItem value={"Elevator"} onClick={()=>isFiltered("Elevator")}>EL</ToggleGroupItem>
                    <ToggleGroupItem value={"All"}>All</ToggleGroupItem>
                </ToggleGroup>
            </div>:null}

        </div>
    );
};

export default InternalMap;