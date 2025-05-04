import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import InternalMap from '@/features/MapView/InternalMap.tsx';
import { postEdgeDeletion, postNodeDeletion } from '@/features/MapView/mapService.ts';
import axios from 'axios';
import { Label } from '@/components/ui/label.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { TourAlertDialog, TourStep, useTour } from '@/components/tour';
import { TOUR_STEP_IDS } from '@/lib/tour-constants.ts';

interface EditMapProps {
    status?: string;
}

export function EditMap({ status }: EditMapProps) {
    const [selectedLocation, setSelectedLocation] = useState<{ building: string; floor: number }>({
        building: 'Healthcare Center (20 Patriot Pl.)',
        floor: 1,
    });
    // "Faulkner 1st Floor"
    //'Multispecialty Clinic, 20 Patriot Pl 3rd Floor, Foxborough, MA 02035'
    // );
    // const [building, setBuilding] = useState<string>('Faulkner');
    // const [currentFloor, setCurrentFloor] = useState<number>(1); // TODO: this be the problem

    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null); // coordinates that were last clicked
    const [editcoordinates, setEditCoordinates] = useState<{ x: string; y: string } | null>({
        x: '',
        y: '',
    }); // coordinates that are entered into the textbox (also get updated when map is clicked)
    const [nodeName, setNodeName] = useState<string>(''); // TODO: it would be nice if the existing node name autopopulated when a node is clicked
    const [nodeType, setNodeType] = useState<string>('');
    const [editnodeName, setEditNodeName] = useState<string>('');
    const [editnodeType, setEditNodeType] = useState<string>('Hallway');
    const [nodeID, setNodeID] = useState<string>(''); // stores the nodeID that was selected when a node was clicked on
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    // const [currentBuilding, setCurrentBuilding] = useState<string>('');
    const [requestPromise, setRequestPromise] = useState<Promise<void>>(); // allows for the internal map to know when to reload nodes after the map page has created them
    const [edgeCreatePromise, setEdgeCreatePromise] = useState<Promise<void>>();
    const [edgeNodes, setEdgeNodes] = useState<string[]>([]); // stores two nodes in a buffer so that an edge can be created
    const [activeTab, setActiveTab] = useState<string>('place-node');
    //for algo selection
    const [algorithm, setAlgorithm] = useState<'dfs' | 'bfs' | 'dijkstra'>('bfs');
    // for map editing instructions
    const [isDialogOpen, setDialogOpen] = useState(false);

    const steps: TourStep[] = [
        {
            content: (
                <div>On this page you can add, edit, and delete map nodes for pathfinding.</div>
            ),
            selectorId: TOUR_STEP_IDS.CLICK_START,
            position: 'right',
        },
        {
            content: (
                <div>
                    First, select the node's location by clicking on the map. The coordinates will
                    show up here.
                </div>
            ),
            selectorId: TOUR_STEP_IDS.CLICK_DESCRIPTOR,
            position: 'right',
        },
        {
            content: (
                <div>
                    Enter the name of the node here. Each node should be given a name so it can be
                    tracked.
                </div>
            ),
            selectorId: TOUR_STEP_IDS.NODE_NAME,
            position: 'right',
        },
        {
            content: <div>Next, select the node type.</div>,
            selectorId: TOUR_STEP_IDS.NODE_TYPE,
            position: 'right',
        },
        {
            content: <div>When finished, save the node, and it should pop up on the map!</div>,
            selectorId: TOUR_STEP_IDS.SAVE_NODE,
            position: 'left',
        },
        {
            content: (
                <div>
                    To add an edge between nodes, select the two nodes you want to connect, and
                    click save here.
                </div>
            ),
            selectorId: TOUR_STEP_IDS.SAVE_EDGE,
            position: 'right',
        },
        // Add more steps here
    ];

    async function saveAlgorithm(algo: 'dfs' | 'bfs' | 'dijkstra') {
        try {
            const response = await axios.post(`/api/algo/setalgo`, {
                algo,
            });
            setAlgorithm(algo);
        } catch (error) {
            console.error('Error saving algorithm:', error);
            alert('An error occurred while saving the algorithm.');
        }
    }

    function setLocation(building: string, floor: number) {
        console.log('Active Layer Changed', building, floor);
        setSelectedLocation({ building: building, floor: floor });
    }

    // check if the instructions should be opened
    useEffect(() => {
        if (true) {
            setDialogOpen(true);
        }
    }, []);

    // function from mapService that makes axios request
    async function deleteNode(nodeID: string) {
        // make request, and pass the promise to the internal map to reload once it's done
        setRequestPromise(async () => {
            await postNodeDeletion(nodeID);
        });
    }

    // function from mapService that makes axios request
    async function deleteEdge(edgeID: string) {
        // make request, and pass the promise to the internal map to reload once it's done
        setRequestPromise(async () => {
            await postEdgeDeletion(edgeID);
        });
    }

    function onNodeClick(nodeID: string, nodeName:string, nodeType:string) {
        setNodeID(nodeID);
        setEditNodeName(nodeName);
        setEditNodeType(nodeType);
        setEdgeNodes((nodes) => {
            if (nodes.length == 0) {
                return [nodeID];
            } else if (nodes.length == 1) {
                return [nodes[0], nodeID];
            } else {
                return [nodes[1], nodeID];
            }
        });
    }

    // map clicks
    const handleMapClick = (lat: number, lng: number) => {
        setCoordinates({
            x: lat,
            y: lng,
        });
        setEditCoordinates({
            x: lat.toString(),
            y: lng.toString(),
        });
        // setCurrentBuilding(building);
    };
    const handleNodeDrag = (lat: number, lng: number, nodeID: string, nodeTypes: string, nodeName:string) => {
        setActiveTab('edit-node');
        setNodeID(nodeID);
        setEditNodeName(nodeName);
        setEditNodeType(nodeTypes);
        console.log('Setting coordinates: x = ', lat, ' y = ', lng);
        setEditCoordinates({
            x: lat.toString(),
            y: lng.toString(),
        });
        //setCurrentBuilding(building);
    };
    // console.log("nodeType:", nodeType);
    // useEffect(() => {

    // capture coordinates

    // const originalConsoleLog = console.log;
    // what the heck does this do? answer: breaks the console.log statements everywhere else
    // console.log = function (...args: unknown[]) {
    //     const argStr = String(args[0] || '');
    //     const coordMatch = argStr.match(/\[([\d\.]+), ([\d\.]+)\]/);
    //     if (coordMatch) {
    //         const lat = parseFloat(coordMatch[1]);
    //         const lng = parseFloat(coordMatch[2]);
    //         setCoordinates({ x: lat, y: lng });
    //         setEditCoordinates({ x: lat, y: lng });
    //         setCurrentBuilding(building);
    //
    //         window.lastClickCoordinates = { lat, lng };
    //     }
    //     // originalConsoleLog.apply(console, args);
    // };

    // listen for custom map click events
    // document.addEventListener('map-click', handleMapClick as EventListener);

    // return () => {
    //     document.removeEventListener('map-click', handleMapClick as EventListener);
    //     console.log = originalConsoleLog;
    // };
    // }, [building]);
    // setCurrentBuilding(building);

    // TODO: make this an array of strings not objects
    const nodeTypes = [
        { id: 'parking', name: 'Parking' },
        { id: 'entrance', name: 'Entrance' },
        { id: 'reception', name: 'Reception' },
        { id: 'hallway', name: 'Hallway' },
        { id: 'sidewalk', name: 'Sidewalk' },
        { id: 'elevator', name: 'Elevator' },
        //{ id: 'checkIn', name: 'Check-In' },  What is this? commented it out since it caused errors if I created one
    ];

    const handleDepartmentToggle = (departmentId: string) => {
        setSelectedDepartments((prev) =>
            prev.includes(departmentId)
                ? prev.filter((id) => id !== departmentId)
                : [...prev, departmentId]
        );
    };

    const editNode = async () => {
        if (!editcoordinates) {
            alert('Please select a location on the map first.');
            return;
        }
        if (isNaN(parseFloat(editcoordinates.x)) || isNaN(parseFloat(editcoordinates.y))) {
            alert('Please enter a valid coordinate.');
            return;
        }

        const nodeData = {
            nodeID: nodeID,
            nodeType: editnodeType,
            building: selectedLocation.building,
            floor: selectedLocation.floor,
            xcoord: parseFloat(editcoordinates.x),
            ycoord: parseFloat(editcoordinates.y),
            longName: '',
            shortName: editnodeName,
            departments: selectedDepartments,
        };
        try {
            // call API to save node
            // split the promise so that the internal map can update
            const promise = axios.post('/api/map/edit-node', nodeData);
            setRequestPromise(async () => {
                await promise;
            });
            const response = await promise;

            // alert(nodeName);
            if (response.status === 200) {
                // alert('Node saved successfully!');
                // reset forms
                setNodeID('')
                setEditNodeName('');
                setEditNodeType('');
                setEditCoordinates({ x: '', y: '' });
            } else {
                alert('Failed to save node.');
            }
        } catch (error) {
            console.error('Error saving node:', error);
            alert('An error occurred while saving the node.');
        }
    };

    const saveNode = async () => {
        if (!coordinates) {
            alert('Please select a location on the map first.');
            return;
        }

        console.log(selectedLocation.floor);

        // use currentBuilding and currentFloor from state (automatically updated when layer changes)
        const nodeData = {
            nodeID: `${nodeType}-${Date.now()}`,
            nodeType: nodeType,
            building: selectedLocation.building,
            floor: selectedLocation.floor,
            xcoord: coordinates.x,
            ycoord: coordinates.y,
            longName: '',
            shortName: nodeName,
            departments: selectedDepartments,
        };

        try {
            // call API to save node
            // split the promise so that the internal map can update
            const promise = axios.post('/api/map/create-node', nodeData);
            setRequestPromise(async () => {
                await promise;
            });
            const response = await promise;

            // alert(nodeName);
            if (response.status === 200) {
                // alert('Node saved successfully!');
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

    const saveEdge = async () => {
        if (edgeNodes.length < 2) {
            alert('Please select two nodes first.');
            return;
        }
        const edgeData = {
            fromID: edgeNodes[0],
            toID: edgeNodes[1],
        };

        try {
            // call API to save edge
            const promise = axios.post('/api/map/create-edge', edgeData);
            // split the promise so that the internal map can update
            setEdgeCreatePromise(async () => {
                await promise;
            });
            const response = await promise;

            if (response.status === 200) {
                // alert('Edge saved successfully!');
                // reset form
                setEdgeNodes([]);
            } else {
                alert('Failed to save edge.');
            }
        } catch (error) {
            console.error('Error saving edge:', error);
            alert('An error occurred while saving the edge.');
        }
    };

    function setToggle() {
        return true;
    }

    const resetMap = async () => {
        if (confirm('Are you sure you want to reset the map?')) {
            try {
                const promise = axios.post('/api/map/reset');
                setRequestPromise(async () => {
                    await promise;
                });
                const response = await promise;

                if (response.status === 200) {
                    alert('Map reset successfully!');
                    setEdgeNodes([]);
                    setNodeID('');
                    setCoordinates(null);
                    setEditCoordinates({ x: '', y: '' });
                } else {
                    alert('Failed to reset map.');
                }
            } catch (error) {
                console.error('Error resetting map:', error);
                alert('An error occurred while resetting the map.');
            }
        }
    };

    // console.log('edit Coordinates', editcoordinates);
    // console.log(' Coordinates', coordinates);
    // console.log('edit Coordinates', editcoordinates);
    // console.log(' Coordinates', coordinates);

    const { setSteps } = useTour();
    const [openTour, setOpenTour] = useState(false);

    useEffect(() => {
        setSteps(steps);
        const timer = setTimeout(() => {
            setOpenTour(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [setSteps]);

    return (
        <div className="flex flex-col h-[calc(100vh-65px)]">
            <div className="flex-1 relative cursor-pointer">
                {/*Internal Map will reload when building is remade (which is when)?*/}
                <InternalMap
                    location={{
                        building: selectedLocation.building,
                        floor: selectedLocation.floor,
                    }}
                    // floor={currentFloor}
                    onNodeDelete={deleteNode}
                    promiseNodeCreate={requestPromise}
                    promiseEdgeCreate={edgeCreatePromise}
                    showEdges={true}
                    showNodes={true}
                    onEdgeDelete={deleteEdge}
                    onNodeSelect={onNodeClick}
                    onLocationChange={setLocation}
                    onCoordSelect={handleMapClick}
                    onNodeDrag={handleNodeDrag}
                    onNodeEdit={editNode}
                    onToggle={setToggle}
                    selectedEdgeNodes={edgeNodes}
                />

                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg w-90 h-155 max-h-[100%] overflow-y-auto overflow-x-hidden z-10 flex flex-col justify-start">
                    <div className="flex  flex-col justify-start float-left">
                        <Label
                            className="font-bold text-2xl pt-4 pl-4 pb-4"
                            id={TOUR_STEP_IDS.CLICK_START}
                        >
                            Edit Map
                        </Label>
                        <div className="flex flex-col items-center justify-center text-left overflow-y-auto pl-1">
                            <Tabs
                                defaultValue="place-node"
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full flex flex-col"
                            >
                                <TabsList className="w-80 flex">
                                    <TabsTrigger
                                        value="place-node"
                                        className="border border-gray-300 data-[state=active]:bg-white data-[state=active]:text-black"
                                    >
                                        Place Node
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="edit-node"
                                        className="border border-gray-300 data-[state=active]:bg-white data-[state=active]:text-black"
                                    >
                                        Edit Node
                                    </TabsTrigger>
                                </TabsList>

                                <div className={'w-80 flex flex-col'}>
                                    <TabsContent value="place-node" className="space-y-4">
                                        <div className="bg-gray-100 p-3 rounded-md" id={TOUR_STEP_IDS.CLICK_DESCRIPTOR}>
                                            <Label>Click on map to select node location</Label>
                                            {coordinates && (
                                                <div className="mt-2 text-sm">
                                                    <p>X: {coordinates.x.toFixed(2)}</p>
                                                    <p>Y: {coordinates.y.toFixed(2)}</p>
                                                    <p>Building: {selectedLocation.building}</p>
                                                    <p>Floor: {selectedLocation.floor}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div id={TOUR_STEP_IDS.NODE_NAME}>
                                                <Label>Node Name (Optional)</Label>
                                                <Input
                                                    value={nodeName}
                                                    onChange={(e) => setNodeName(e.target.value)}
                                                    placeholder="Enter node name"
                                                />
                                            </div>

                                            <div id={TOUR_STEP_IDS.NODE_TYPE}>
                                                <Label>Node Type</Label>
                                                <Select
                                                    onValueChange={setNodeType}
                                                    value={nodeType}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select node type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {nodeTypes.map((type) => (
                                                                <SelectItem
                                                                    key={type.name}
                                                                    value={type.name}
                                                                >
                                                                    {type.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={saveNode}
                                            disabled={!coordinates || !nodeType}
                                            className={'w-full'}
                                            id={TOUR_STEP_IDS.SAVE_NODE}
                                        >
                                            Save Node
                                        </Button>

                                        <div className="mt-1 pt-4 border-t border-gray-200" id={TOUR_STEP_IDS.SAVE_EDGE}>
                                            <div className="bg-gray-100 p-3 rounded-md">
                                                <Label>Click on two nodes to create an edge</Label>
                                                {edgeNodes.length > 0 ? (
                                                    <div className="mt-2 text-sm">
                                                        <p>Node 1: {edgeNodes[0]}</p>
                                                        <p>Node 2: {edgeNodes[1]}</p>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <Button
                                                onClick={saveEdge}
                                                disabled={edgeNodes.length != 2}
                                                className="w-full mt-2"
                                            >
                                                Save Edge
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="edit-node" className="space-y-4">
                                        <div className="bg-gray-100 p-3 rounded-md">
                                            <Label>Selected Node to Edit</Label>
                                            {nodeID !== '' ? (
                                                <div className="mt-2 text-sm">
                                                    <p>Selected Node: {nodeID}</p>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500">
                                                    Click on a node to select it for editing
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label>Change Node Name</Label>
                                                <Input
                                                    value={editnodeName}
                                                    onChange={(e) =>
                                                        console.log("Node Name Value: ", e.target.value)
                                                    }
                                                    placeholder="Enter new node name"
                                                />
                                            </div>

                                            <div>
                                                <Label>Change Node Type</Label>
                                                <Select
                                                    onValueChange={setEditNodeType}
                                                    value={editnodeType}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select node type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {nodeTypes.map((type) => (
                                                                <SelectItem
                                                                    key={type.name}
                                                                    value={type.name}
                                                                >
                                                                    {type.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {editcoordinates != null ? (
                                                <>
                                                    <div>
                                                        <Label>Change X Coordinate</Label>
                                                        <Input
                                                            value={editcoordinates.x}
                                                            onChange={(e) => {
                                                                setEditCoordinates({
                                                                x: e.target.value,
                                                                y: editcoordinates.y,
                                                                })
                                                            }}
                                                            placeholder="Enter new X Coordinate"
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label>Change Y Coordinate</Label>
                                                        <Input
                                                            value={editcoordinates.y}
                                                            onChange={(e) =>
                                                                setEditCoordinates({
                                                                    x: editcoordinates.x,
                                                                    y: e.target.value,
                                                                })
                                                            }
                                                            placeholder="Enter new Y Coordinate"
                                                        />
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>

                                        <Button
                                            onClick={editNode}
                                            disabled={!nodeID}
                                            className="w-full"
                                        >
                                            Save Changes
                                        </Button>
                                    </TabsContent>
                                    <div className="flex flex-col space-y-2 mt-4">
                                        <Label>Algorithm</Label>
                                        <Select
                                            value={algorithm}
                                            onValueChange={(value: string) =>
                                                saveAlgorithm(value as 'bfs' | 'dfs' | 'dijkstra')
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select algorithm" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="bfs">BFS</SelectItem>
                                                    <SelectItem value="dfs">DFS</SelectItem>
                                                    <SelectItem value="dijkstra">
                                                        Dijkstra's
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        onClick={resetMap}
                                        variant="ghostDestructive"
                                        className="w-full mt-4 mb-6"
                                    >
                                        Reset Map to Default
                                    </Button>

                                    {/*<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>*/}
                                    {/*    <DialogContent className="sm:max-w-[425px] ">*/}
                                    {/*        <DialogHeader>*/}
                                    {/*            <DialogTitle>Edit profile</DialogTitle>*/}
                                    {/*            <DialogDescription>*/}
                                    {/*                Make changes to your profile here. Click save when you're done.*/}
                                    {/*            </DialogDescription>*/}
                                    {/*        </DialogHeader>*/}
                                    {/*        <div className="grid gap-4 py-4">*/}
                                    {/*            <div className="grid grid-cols-4 items-center gap-4">*/}
                                    {/*                <Label htmlFor="name" className="text-right">*/}
                                    {/*                    Name*/}
                                    {/*                </Label>*/}
                                    {/*                <Input id="name" value="Pedro Duarte" className="col-span-3" />*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        <DialogFooter>*/}
                                    {/*            <Button type="submit">Save changes</Button>*/}
                                    {/*        </DialogFooter>*/}
                                    {/*    </DialogContent>*/}
                                    {/*</Dialog>*/}
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
            </div>
        </div>
    );
}
