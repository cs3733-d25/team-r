export const getBuildingFromLocation = (location: string) => {
    if (location.includes('Healthcare Center (20 Patriot Pl.)')) return 'Healthcare Center (20 Patriot Pl.)';
    if (location.includes('Healthcare Center (22 Patriot Pl.)')) return 'Healthcare Center (22 Patriot Pl.)';
    if (location.includes('Healthcare Center (Chestnut Hill)')) return 'Healthcare Center (Chestnut Hill)';
    if (location.includes('Faulkner Hospital')) return 'Faulkner Hospital';
    if (location.includes('Main Campus Hospital (75 Francis St.)')) return 'Main Campus Hospital (75 Francis St.)';
    return 'LOCATION NOT FOUND';
};

export const getShortLocationName = (location: string) => {
    if (location.includes('Healthcare Center (20 Patriot Pl.)')) return 'Healthcare Center (20 Patriot Pl.)';
    if (location.includes('Healthcare Center (22 Patriot Pl.)')) return 'Healthcare Center (22 Patriot Pl.)';
    if (location.includes('Healthcare Center (Chestnut Hill)')) return 'Healthcare Center (Chestnut Hill)';
    if (location.includes('Faulkner Hospital')) return 'Faulkner Hospital';
    if (location.includes('Main Campus Hospital (75 Francis St.)')) return 'Main Campus Hospital (75 Francis St.)';
    return location;
};

export const getBuildingConstant = (buildingName: string) => {
    switch (buildingName) {
        case 'Patriot Place 20':
            return 'PATRIOT_PLACE_20';
        case 'Patriot Place 22':
            return 'PATRIOT_PLACE_22';
        case 'Chestnut Hill':
            return 'CHESTNUT_HILL';
        case 'Faulkner':
            return 'FAULKNER';
        case 'Womens':
            return 'WOMENS';
        default:
            return buildingName;
    }
};


export const floorConfig = {
    'Patriot Place 20': [1,],
    'Patriot Place 22': [1, 3, 4],
    'Chestnut Hill': [1],
    'Faulkner': [1],
    'Womens': [1]
};