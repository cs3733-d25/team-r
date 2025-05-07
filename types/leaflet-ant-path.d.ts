// import * as L from 'leaflet';

declare module 'leaflet' {
    interface AntPathOptions extends L.PathOptions {
        delay?: number;
        dashArray?: number[];
        weight?: number;
        color?: string;
        pulseColor?: string;
        paused?: boolean;
        reverse?: boolean;
        hardwareAccelerated?: boolean;
        // Add any other specific options from the plugin documentation if needed
    }

    class AntPath<T extends GeoJSON.GeometryObject = GeoJSON.LineString | GeoJSON.MultiLineString, P = any> extends L.Polyline<T, P> {
        constructor(latlngs: L.LatLngExpression[] | L.LatLngExpression[][], options?: AntPathOptions);
        // Add any specific methods from the plugin documentation if needed (e.g., pause(), resume())
    }

    // Extend the L.polyline factory function namespace
    namespace polyline {
        export function antPath(latlngs: L.LatLngExpression[] | L.LatLngExpression[][], options?: AntPathOptions): AntPath;
    }

    // Alternatively, if the plugin adds it directly to L:
    // export function antPath(latlngs: L.LatLngExpression[] | L.LatLngExpression[][], options?: AntPathOptions): AntPath;
}

// Declare the module itself for the side-effect import
declare module 'leaflet-ant-path' {}