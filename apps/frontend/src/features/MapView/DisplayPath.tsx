import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {getBuildingFromLocation} from '@/features/MapView/mapUtils.ts';
import {fetchPath} from './mapService';
import { node } from 'prop-types';
import * as process from 'node:process';

interface DisplayPathProps {
    startNodeID: string;
    endNodeID: string;
    algorithm: 'dfs' | 'bfs' | 'aStar';
    // isAccessible: boolean;
    onPathChange?: (coordinates: [number, number][]) => void;
    onDirectionsChange?: (directions: string[]) => void;
}

interface MapNode {
    nodeID: string;
    nodeType: string;
    building: string;
    floor: number;
    xcoord: number;
    ycoord: number;
    longName: string;
    shortName: string;
}

const DisplayPath: React.FC<DisplayPathProps> = ({
                                                     startNodeID,
                                                     endNodeID,
                                                     algorithm,
                                                     onPathChange,
                                                     onDirectionsChange
                                                 }) => {
    const [path, setPath] = useState<string[]>([]);
    const [pathNodes, setPathNodes] = useState<MapNode[]>([]);
    const [pathCoordinates, setPathCoordinates] = useState<[number, number][]>([]);
    const [currentFloor, setCurrentFloor] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || '';
    const currentBuilding = getBuildingFromLocation(selectedLocation);

    useEffect(() => {
        if (!startNodeID || !endNodeID) {
            console.error('Start or end node ID is missing');
            return;
        }

        const getPath = async () => {
            try {
                setError(null);
                const pathNodeIDs = await fetchPath(startNodeID, endNodeID, algorithm);
                setPath(pathNodeIDs);

                // get full node objects using each ID in path
                const nodes = await getNodeObjects(pathNodeIDs);
                setPathNodes(nodes);

                const coords = nodes.map(node => [node.xcoord, node.ycoord] as [number, number]);
                setPathCoordinates(coords);

                if (onPathChange) {
                    onPathChange(coords);
                }

                if (onDirectionsChange) {
                    processDirections(nodes);
                }
            } catch (err) {
                console.error('Error fetching path:', err);
                setError('Failed to fetch path');
            }
        };

        getPath();
    }, [startNodeID, endNodeID, algorithm]);

    const getNodeObjects = async (nodeIDArray: string[]): Promise<MapNode[]> => {
        try {
            const response = await axios.get("/api/map/getNodeObjects", {
                params: {
                    nodeIDs: nodeIDArray
                }
            });
            return response.data;
        } catch (e) {
            console.error('Error converting node IDs to objects:', e);
            return [];
        }
    };

    const processDirections = (nodes: MapNode[]) => {
        if (!nodes || nodes.length < 2 || !onDirectionsChange) {
            return;
        }

        const directions: string[] = [];

        // starting point
        directions.push(`Start at ${nodes[0].shortName}`);

        // process path segments
        for (let i = 0; i < nodes.length - 1; i++) {
            const current = nodes[i];
            const next = nodes[i + 1];

            // handling floor transitions
            if (current.floor !== next.floor || current.building !== next.building) {
                if (current.building !== next.building) {
                    directions.push(`Exit ${current.building} and enter ${next.building}`);
                } else if (current.nodeType === 'Elevator' || next.nodeType === 'Elevator') {
                    directions.push(`Take elevator from floor ${current.floor} to floor ${next.floor}`);
                } else if (current.nodeType === 'Stairs' || next.nodeType === 'Stairs') {
                    directions.push(`Take stairs from floor ${current.floor} to floor ${next.floor}`);
                } else {
                    directions.push(`Go from floor ${current.floor} to floor ${next.floor}`);
                }
            } else {
                directions.push(`Head towards ${next.shortName}`);
            }
        }

        // ending point
        directions.push(`Arrive at ${nodes[nodes.length - 1].shortName}`);
        onDirectionsChange(directions);
    };

    // handle floor changes
    const handleFloorChange = (floor: number) => {
        setCurrentFloor(floor);
        if (window.goToFloor) {
            window.goToFloor(floor, currentBuilding);
        }
    };

    const uniqueFloors = Array.from(new Set(pathNodes.map(node => node.floor))).sort();

    return ();

};

// end screen


export default DisplayPath;
