import { Label } from '@/components/ui/label.tsx';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/button.tsx';

export function InternalMapControls() {
    return (
        <div className="absolute bottom-16 right-16 bg-white rounded-lg shadow-lg p-4 w-60 max-h-[90%] overflow-y-auto z-10">
            <div className="flex justify-center text-sm text-gray-600 ">
                <Label className="text-xl text-black">Steps</Label>
            </div>
            <div className={'flex justify-center w-full'}>
                <Button className={'w-25 m-2'}>
                    <ArrowLeft className={'font-bold'} />
                </Button>
                <Button className={'w-25 m-2'}>
                    <ArrowRight className={'font-bold'} />
                </Button>
            </div>
        </div>
    );
}
