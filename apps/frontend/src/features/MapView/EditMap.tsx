import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import InternalMap from '@/features/MapView/InternalMap.tsx';

export function EditMap() {
    return (
        <div className="flex flex-col h-screen">
            <div className="sticky top-0 z-30">
                <NavbarMGH />
            </div>
            <div className="flex-1 relative">
                <InternalMap
                    location={
                        'Multispecialty Clinic, 22 Patriot Pl 3rd Floor, Foxborough, MA 02035'
                    }
                />
                {/* Your map or main content would go here */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div className="flex flex-col space-y-2">
                        <Label className={'p-2 font-bold text-2xl'}>Edit Map</Label>
                    </div>
                    <div className="space-y-4 flex-grow overflow-auto">
                        <Button disabled={true}>Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
