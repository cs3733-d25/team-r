import { NavbarMGH } from '@/components/NavbarMGH.tsx';
import LeafletMap from '@/features/MapView/LeafletMap.tsx';

function TestPage() {
    return (
        <div>
            <NavbarMGH />
            <LeafletMap />
        </div>
    );
}

export default TestPage;
