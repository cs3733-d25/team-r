import Navbar from '../../components/Navbar.tsx';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

function MapView() {

    // currently reading as undefined, need to check if the env variable is set correctly
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // console.log(apiKey)

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow w-full">
                <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API has loaded.')}>
                    <div className="w-full h-full">
                        <Map
                            defaultZoom={13}
                            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
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
