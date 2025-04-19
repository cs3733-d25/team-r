import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FloorSelectorProps {
    availableFloors: number[];
    currentFloor: number;
    setCurrentFloor: (floor: number) => void;
    goToFloor: (floor: number) => void;
}

export function FloorSelector({ availableFloors, currentFloor, setCurrentFloor, goToFloor }: FloorSelectorProps) {
    return (
        <div className="flex flex-col space-y-2">
            <Label className={'px-2 mb-3'}>Floor selection</Label>
            <div className="flex flex-col space-y-2">
                {availableFloors.map(floor => (
                    <Button
                        key={floor}
                        variant={currentFloor === floor ? 'default' : 'secondary'}
                        onClick={() => {
                            setCurrentFloor(floor);
                            goToFloor(floor);
                        }}
                        type="button"
                    >
                        Floor {floor}
                    </Button>
                ))}
            </div>
        </div>
    );
}