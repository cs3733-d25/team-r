import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover.tsx";
import {PrescriptionTable} from "@/features/Requests/PrescriptionForm/PrescriptionTable.tsx";

interface RequestInfoButtonProps {
    id: number | null;
    type: string | null;
}

export function RequestInfoButton(props: RequestInfoButtonProps) {
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button>i</Button>
                </PopoverTrigger>
                <PopoverContent>
                    {/*<PrescriptionTable></PrescriptionTable>*/}
                    {props.id}
                    {props.type}
                </PopoverContent>
            </Popover>
        </div>
    )
}