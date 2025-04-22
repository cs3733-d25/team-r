export const getBuildingFromLocation = (location: string) => {
    if (location.includes('20 Patriot Pl')) return 'Patriot Place 20';
    if (location.includes('22 Patriot Pl')) return 'Patriot Place 22';
    if (location.includes('Chestnut Hill')) return 'Chestnut Hill';
    if (location.includes('Faulkner')) return 'Faulkner';
    return 'PATRIOT_PLACE_22';
};

export const getShortLocationName = (location: string) => {
    if (location.includes('20 Patriot Pl')) return '20 Patriot Place';
    if (location.includes('22 Patriot Pl')) return '22 Patriot Place';
    if (location.includes('Chestnut Hill')) return 'Chestnut Hill';
    if (location.includes('Faulkner')) return 'Faulkner';
    return location;
};

export const floorConfig = {
    PATRIOT_PLACE_20: [1],
    PATRIOT_PLACE_22: [1, 3, 4],
    CHESTNUT_HILL: [1],
    FAULKNER: [1]
};