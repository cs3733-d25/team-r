import React, { useState, useEffect } from 'react';
import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import { getBuildingFromLocation, getBuildingConstant } from '@/features/MapView/mapUtils.ts'; // don't use getBuildingConstant we don't need it since we can store strings now
import { useMapData, postNodeDeletion, postEdgeDeletion } from '@/features/MapView/mapService.ts';
import axios from 'axios';

interface EditMapProps {
    status?: string;
}

interface Department {
    id: string;
    name: string;
}

declare global {
    interface Window {
        lastClickCoordinates?: {lat: number, lng: number};
    }
}

export function EditMap({ status }: EditMapProps) {
    const [selectedLocation, setSelectedLocation] = useState<string>(
        'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035'
    );
    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);
    const [nodeName, setNodeName] = useState<string>('');
    const [nodeType, setNodeType] = useState<string>('');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [availableDepartments, setAvailableDepartments] = useState<Department[]>([]);
    const [currentBuilding, setCurrentBuilding] = useState<string>('');
    const [currentFloor, setCurrentFloor] = useState<number>(3);
    const [lNodes, setLNodes] = useState<Promise<void>>(); // allows for the internal map to know when to reload nodes after the map page has created them

    const building = getBuildingFromLocation(selectedLocation);
    const { departments } = useMapData(building);

    // set available departments when departments data loads
    useEffect(() => {
        if (departments && departments.length > 0) {
            setAvailableDepartments(departments);
        }
    }, [departments]);

    // function from mapService that makes axios request
    async function deleteNode (nodeID:string) {
        await postNodeDeletion(nodeID);
    }

    // function from mapService that makes axios request
    async function deleteEdge (nodeID:string) {
        await postEdgeDeletion(nodeID);
    }

    // map clicks
    useEffect(() => {
        const handleMapClick = (e: CustomEvent<{lat: number, lng: number}>) => {
            if (e.detail) {
                setCoordinates({
                    x: e.detail.lat,
                    y: e.detail.lng
                });
                setCurrentBuilding(building);
            }
        };

        // capture coordinates
        const originalConsoleLog = console.log;
        console.log = function(...args: unknown[]) {
            const argStr = String(args[0] || '');
            const coordMatch = argStr.match(/\[([\d\.]+), ([\d\.]+)\]/);
            if (coordMatch) {
                const lat = parseFloat(coordMatch[1]);
                const lng = parseFloat(coordMatch[2]);
                setCoordinates({ x: lat, y: lng });
                setCurrentBuilding(building);
                console.log(building);

                window.lastClickCoordinates = { lat, lng };
            }
            originalConsoleLog.apply(console, args);
        };

        // listen for custom map click events
        document.addEventListener('map-click', handleMapClick as EventListener);

        return () => {
            document.removeEventListener('map-click', handleMapClick as EventListener);
            console.log = originalConsoleLog;
        };
    }, [building]);

    const nodeTypes = [
        { id: 'parking', name: 'Parking' },
        { id: 'entrance', name: 'Entrance' },
        { id: 'reception', name: 'Reception' },
        { id: 'hallway', name: 'Hallway' },
        { id: 'sidewalk', name: 'Sidewalk' },
        { id: 'elevator', name: 'Elevator' },
        { id: 'checkIn', name: 'Check-In' }
    ];

    const handleDepartmentToggle = (departmentId: string) => {
        setSelectedDepartments(prev =>
            prev.includes(departmentId)
                ? prev.filter(id => id !== departmentId)
                : [...prev, departmentId]
        );
    };

    const saveNode = async () => {
        if (!coordinates) {
            alert('Please select a location on the map first.');
            return;
        }

        const nodeData = {
            nodeID: nodeName || `${nodeType}-${Date.now()}`,
            nodeType: nodeType,
            building: currentBuilding,
            floor: currentFloor,
            xcoord: coordinates.x,
            ycoord: coordinates.y,
            longName: "",
            shortName: nodeName,
            departments: selectedDepartments
        };

        try {
            // call API to save node
            const response = await axios.post('/api/map/create-node', nodeData);

            alert(nodeName);
            if (response.status === 200) {
                alert('Node saved successfully!');
                // reset form
                setNodeName('');
                setNodeType('');
                setSelectedDepartments([]);
                setCoordinates(null);
            } else {
                alert('Failed to save node.');
            }
        } catch (error) {
            console.error('Error saving node:', error);
            alert('An error occurred while saving the node.');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-30">
                <NavbarMGH />
            </div>
            <div className="flex-1 relative cursor-pointer">
                <InternalMap location={selectedLocation} onNodeDelete={deleteNode} loadNodes={lNodes} showEdges={true} onEdgeDelete={deleteEdge} />

                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div className="flex flex-col space-y-2">
                        <Label className={'p-2 font-bold text-2xl'}>Edit Map</Label>
                    </div>

                    <div className="space-y-4 flex-grow overflow-auto p-2">
                        <div className="bg-gray-100 p-3 rounded-md">
                            <Label>Click on map to select node location</Label>
                            {coordinates && (
                                <div className="mt-2 text-sm">
                                    <p>X: {coordinates.x.toFixed(2)}</p>
                                    <p>Y: {coordinates.y.toFixed(2)}</p>
                                    <p>Building: {currentBuilding}</p>
                                    <p>Floor: {currentFloor}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div>
                                <Label htmlFor="nodeName">Node Name (Optional)</Label>
                                <Input
                                    id="nodeName"
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                    placeholder="Enter node name"
                                />
                            </div>

                            <div>
                                <Label htmlFor="nodeType">Node Type</Label>
                                <Select onValueChange={setNodeType} value={nodeType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select node type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {nodeTypes.map(type => (
                                                <SelectItem key={type.id} value={type.id}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Associated Departments</Label>
                                <div className="mt-2 border rounded-md p-2 max-h-40 overflow-y-auto">
                                    {availableDepartments.length > 0 ? (
                                        availableDepartments.map(dept => (
                                            <div key={dept.id} className="flex items-center space-x-2 py-1">
                                                <Checkbox
                                                    id={`dept-${dept.id}`}
                                                    checked={selectedDepartments.includes(dept.id)}
                                                    onCheckedChange={() => handleDepartmentToggle(dept.id)}
                                                />
                                                <Label htmlFor={`dept-${dept.id}`} className="cursor-pointer">
                                                    {dept.name}
                                                </Label>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No departments available</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={saveNode}
                            disabled={!coordinates || !nodeType}
                            className="w-full"
                        >
                            Save Node
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}