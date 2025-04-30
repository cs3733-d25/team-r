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
        case 'Healthcare Center (20 Patriot Pl.)':
            return 'PATRIOT_PLACE_20';
        case 'Healthcare Center (22 Patriot Pl.)':
            return 'PATRIOT_PLACE_22';
        case 'Healthcare Center (Chestnut Hill)':
            return 'CHESTNUT_HILL';
        case 'Faulkner Hospital':
            return 'FAULKNER';
        case 'Main Campus Hospital (75 Francis St.)':
            return 'WOMENS';
        default:
            return buildingName;
    }
};


export const floorConfig = {
    'Healthcare Center (20 Patriot Pl.)': [1,],
    'Healthcare Center (22 Patriot Pl.)': [1, 3, 4],
    'Healthcare Center (Chestnut Hill)': [1],
    'Faulkner Hospital': [1],
    'Main Campus Hospital (75 Francis St.)': [1]
};