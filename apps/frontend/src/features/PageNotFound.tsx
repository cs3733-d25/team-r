import { HeadingLabel, Label } from '@/components/ui/heading-label';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <HeadingLabel className="text-4xl font-bold">404 - Page Not Found</HeadingLabel>
            <Label className="mt-4 text-lg">Sorry, the page you are looking for does not exist.</Label>
            <Label className="mt-6 text-blue-500 hover:underline" onClick={() => navigate('/home')}>
                Go back to Home
            </Label>
        </div>
    );
}