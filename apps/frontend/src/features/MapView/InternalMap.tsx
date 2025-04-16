import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import LeafletMap from '@/features/MapView/LeafletMap.tsx';

export function InternalMap() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className={'sticky top-0 z-30'}>
                <NavbarMGH />
            </div>
            <div className="flex-1 w-full relative">
                <LeafletMap location={'patriot'} />
                {/* Overlay sidebar */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[90%] overflow-y-auto z-10 flex flex-col">
                    <div>
                        <Label className={'p-2 pb-0 font-bold text-2xl'}>Selected Location:</Label>
                        <Label className={'p-2 pt-0 font-bold text-xl text-secondary'}>
                            Patriot Place
                        </Label>
                    </div>
                    <div className="space-y-4 flex-grow overflow-auto">
                        <div className="flex flex-col space-y-2">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Starting location" />
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Location</SelectLabel>
                                            <SelectItem value={'dropdown test'}>
                                                Dropdown test
                                            </SelectItem>
                                            <SelectItem value={'dropdown test 2'}>
                                                Dropdown 2
                                            </SelectItem>
                                            <SelectItem value={'dropdown test 3'}>
                                                Dropdown 3
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ending location" />
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Location</SelectLabel>
                                            <SelectItem value={'dropdown test'}>
                                                Dropdown test
                                            </SelectItem>
                                            <SelectItem value={'dropdown test 2'}>
                                                Dropdown 2
                                            </SelectItem>
                                            <SelectItem value={'dropdown test 3'}>
                                                Dropdown 3
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            <Button>Get Directions</Button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label className={'px-2 mb-3'}>Floor selection</Label>
                            <div className="flex flex-col space-y-2">
                                <Button variant={'secondary'}>Floor 1</Button>
                                <Button variant={'secondary'}>Floor 2</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
