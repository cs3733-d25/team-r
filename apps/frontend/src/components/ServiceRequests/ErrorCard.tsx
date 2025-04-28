import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

interface ErrorCardProps {
    message: string;
}

//simple alert that shows an error message
export function ErrorCard({message}: ErrorCardProps) {
    return (
        <Alert className="mb-4 p-4 rounded-md bg-destructive/40 border border-accent-foreground">
            <AlertDescription className={'text-foreground'}>
                {message}
            </AlertDescription>
        </Alert>
    )
}