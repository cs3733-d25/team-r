import Navbar from '../../components/Navbar.tsx';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

function MapView() {

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow w-full">
                <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                    <div className="w-full h-full">
                        <Map
                            defaultZoom={15}
                            defaultCenter={{ lat: 42.27434988431181, lng: -71.80801625486968 }}
                            onCameraChanged={(ev: MapCameraChangedEvent) =>
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }
                            style={{ width: '100%', height: '100%' }}
                        ></Map>
                    </div>
                </APIProvider>
            </div>
        </div>
    );
}

export default MapView;
