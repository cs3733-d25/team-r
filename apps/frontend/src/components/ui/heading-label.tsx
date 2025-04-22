import * as LabelPrimitive from '@radix-ui/react-label';
import { Label } from './label';
import {cn} from "@/lib/utils.ts";

function HeadingLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
    return (
        <Label
            className={cn('p-2 font-bold text-2xl', className)}
            {...props}
        />
    );
}

export { Label, HeadingLabel };