export function goToFloor(
    floor: number,
    map: L.Map,
    floorLayer22_1: L.LayerGroup,
    floorLayer22_3: L.LayerGroup,
    floorLayer22_4: L.LayerGroup
): void {
    const layers = [floorLayer22_1, floorLayer22_3, floorLayer22_4];

    layers.forEach(layer => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });

    switch (floor) {
        case 1:
            map.addLayer(floorLayer22_1);
            break;
        case 3:
            map.addLayer(floorLayer22_3);
            break;
        case 4:
            map.addLayer(floorLayer22_4);
            break;
        default:
            console.warn(`Invalid floor: ${floor}`);
    }
}