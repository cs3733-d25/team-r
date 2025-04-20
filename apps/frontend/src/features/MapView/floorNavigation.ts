import L from 'leaflet';

// Transition Points Between Floors
export const transitionNodes = {
    // 22 patriot place
    'elevatorA': {floor1: [385.55, 546.23], floor3: [464.51, 546.23], floor4: [383.55, 554.24]},
    'st01': {floor1: [387.55, 456.21], floor3: [469.50, 469.21], floor4: [392.55, 457.21]},
    'st02': {floor1: [316.59, 280.17], floor3: [405.54, 314.17], floor4: [316.59, 279.17]},
    'st03': {floor1: [622.42, 885.32], floor3: [678.38, 850.31], floor4: [619.42, 887.32]},
    // 20 patriot place
    'st13': {floor1: [758.34, 187.14], floor3: [758.34, 187.14]},
    'st14': {floor1: [218.74, 818.00], floor3: [218.74, 818.00]},
    'el10': {floor1: [240.64, 771.29], floor3: [240.64, 771.29]}
};

export function addFloorTransitionMarkers(
    map: L.Map,
    floorLayer20_1: L.LayerGroup,
    floorLayer20_3: L.LayerGroup,
    floorLayer22_1: L.LayerGroup,
    floorLayer22_3: L.LayerGroup,
    floorLayer22_4: L.LayerGroup,
    floorLayerChestnutHill: L.LayerGroup,
    floorLayerFaulkner: L.LayerGroup,
) {
    // 22 patriot place floor 1 buttons to go up to floor 3
    L.circle(transitionNodes['elevatorA'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Elevator to Floor 3').on('click', () => {
        map.removeLayer(floorLayer22_1);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_1);
    L.circle(transitionNodes['st01'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs to Floor 3').on('click', () => {
        map.removeLayer(floorLayer22_1);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_1);
    L.circle(transitionNodes['st02'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs to Floor 3').on('click', () => {
        map.removeLayer(floorLayer22_1);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_1);
    L.circle(transitionNodes['st03'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs to Floor 3').on('click', () => {
        map.removeLayer(floorLayer22_1);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_1);
    // 22 patriot place floor 3 buttons to go up to floor 4 or down to floor 1
    L.circle(transitionNodes['elevatorA'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
    L.circle(transitionNodes['st01'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
    L.circle(transitionNodes['st02'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
    L.circle(transitionNodes['st03'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup(` <div style="text-align: center; font-size: 18px;"> <div onclick="goToFloor(4)" style="cursor:pointer;">⬆️ Floor 4</div> <div onclick="goToFloor(1)" style="cursor:pointer;">⬇️ Floor 1</div> </div> `).addTo(floorLayer22_3);
    // 22 patriot place floor 4 buttons to go down to floor 3
    L.circle(transitionNodes['elevatorA'].floor4 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Elevator from Floor 1/3').on('click', () => {
        map.removeLayer(floorLayer22_4);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_4);
    L.circle(transitionNodes['st01'].floor4 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs from Floor 1/3').on('click', () => {
        map.removeLayer(floorLayer22_4);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_4);
    L.circle(transitionNodes['st02'].floor4 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs from Floor 1/3').on('click', () => {
        map.removeLayer(floorLayer22_4);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_4);
    L.circle(transitionNodes['st03'].floor4 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs from Floor 1/3').on('click', () => {
        map.removeLayer(floorLayer22_4);
        map.addLayer(floorLayer22_3)
    }).addTo(floorLayer22_4);

    // 20 patriot place
    L.circle(transitionNodes['st13'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs to Floor 3').on('click', () => {
        map.removeLayer(floorLayer20_1);
        map.addLayer(floorLayer20_3)
    }).addTo(floorLayer20_1);
    L.circle(transitionNodes['st13'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs from Floor 1').on('click', () => {
        map.removeLayer(floorLayer20_3);
        map.addLayer(floorLayer20_1)
    }).addTo(floorLayer20_3);
    L.circle(transitionNodes['st14'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs to Floor 3').on('click', () => {
        map.removeLayer(floorLayer20_1);
        map.addLayer(floorLayer20_3)
    }).addTo(floorLayer20_1);
    L.circle(transitionNodes['st14'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Stairs from Floor 1').on('click', () => {
        map.removeLayer(floorLayer20_3);
        map.addLayer(floorLayer20_1)
    }).addTo(floorLayer20_3);
    L.circle(transitionNodes['el10'].floor1 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Elevator to Floor 3').on('click', () => {
        map.removeLayer(floorLayer20_1);
        map.addLayer(floorLayer20_3)
    }).addTo(floorLayer20_1);
    L.circle(transitionNodes['el10'].floor3 as [number, number], {
        color: 'green',
        radius: 10,
    }).bindPopup('Elevator from Floor 1').on('click', () => {
        map.removeLayer(floorLayer20_3);
        map.addLayer(floorLayer20_1)
    }).addTo(floorLayer20_3);

    //faulkner
    //.circle(transitionNodes['???'].floor1 as [number, number], {color: 'green', radius: 10,}).bindPopup('????').on('click', () => {map.removeLayer(???); map.addLayer(???)}).addTo(???);
    // TODO: add/edit faulkner circles
}

export function connectBuildings(
    map: L.Map,
    floorLayer20_3: L.LayerGroup,
    floorLayer22_3: L.LayerGroup
) {
    // Bridge from 20 to 22
    L.polyline([
        [241.63, 101.12], // 20 Patriot Place
        [242.63, 68.11], // 22 Patriot Place
    ], {
        color: 'blue',
        weight: 2,
        dashArray: '5, 5',
    })
        .bindPopup('Bridge to 22 Patriot Place')
        .on('click', () => {
            map.removeLayer(floorLayer20_3);
            map.addLayer(floorLayer22_3);
        })
        .addTo(floorLayer20_3);

    // Bridge from 22 to 20
    L.polyline([
        [353.57, 642.26], // 22 Patriot Place
        [134.70, 785.30], // 20 Patriot Place
    ], {
        color: 'red',
        weight: 2,
        dashArray: '5, 5',
    })
        .bindPopup('Bridge to 20 Patriot Place')
        .on('click', () => {
            map.removeLayer(floorLayer22_3);
            map.addLayer(floorLayer20_3);
        })
        .addTo(floorLayer22_3);
}

export function goToFloor(
    floor: number,
    map: L.Map,
    floorLayer22_1: L.LayerGroup,
    floorLayer22_3: L.LayerGroup,
    floorLayer22_4: L.LayerGroup,
    floorLayerChestnutHill: L.LayerGroup,
    floorLayerFaulkner: L.LayerGroup
)  {
    map.removeLayer(floorLayer22_1);
    map.removeLayer(floorLayer22_3);
    map.removeLayer(floorLayer22_4);
    map.removeLayer(floorLayerChestnutHill);
    map.removeLayer(floorLayerFaulkner);

    // TODO: fix this switch statement to include all buildings
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