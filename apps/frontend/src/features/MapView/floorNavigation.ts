// import L, { LayerGroup } from 'leaflet';

export function goToFloor(
    floor: number,
    map: L.Map,
    floorLayer20_1?: LayerGroup | null,
    floorLayer22_1?: LayerGroup | null,
    floorLayer22_3?: LayerGroup | null,
    floorLayer22_4?: LayerGroup | null,
    floorLayerChestnutHill?: LayerGroup | null,
    floorLayerFaulkner?: LayerGroup | null,
    floorLayerWomens?: L.LayerGroup | null,
    building?: string
) {
    if (floorLayer20_1) map.removeLayer(floorLayer20_1);
    if (floorLayer22_1) map.removeLayer(floorLayer22_1);
    if (floorLayer22_3) map.removeLayer(floorLayer22_3);
    if (floorLayer22_4) map.removeLayer(floorLayer22_4);
    if (floorLayerChestnutHill) map.removeLayer(floorLayerChestnutHill);
    if (floorLayerFaulkner) map.removeLayer(floorLayerFaulkner);
    if (floorLayerWomens) map.removeLayer(floorLayerWomens);

    if (building === 'CHESTNUT_HILL' && floorLayerChestnutHill) {
        map.addLayer(floorLayerChestnutHill);
        return;
    }

    if (building === 'FAULKNER' && floorLayerFaulkner) {
        map.addLayer(floorLayerFaulkner);
        return;
    }

    if (building === 'PATRIOT_PLACE_20' && floorLayer20_1) {
        map.addLayer(floorLayer20_1);
        return;
    }

    if (building === 'WOMENS' && floorLayerWomens) {
        map.addLayer(floorLayerWomens);
        return;
    }

    switch (floor) {
        case 1:
            if (floorLayer22_1) map.addLayer(floorLayer22_1);
            break;
        case 3:
            if (floorLayer22_3) map.addLayer(floorLayer22_3);
            break;
        case 4:
            if (floorLayer22_4) map.addLayer(floorLayer22_4);
            break;
        default:
            console.warn(`Invalid floor: ${floor}`);
    }
}