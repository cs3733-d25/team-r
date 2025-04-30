export const TOUR_STEP_IDS = {
    CLICK_START: "click start",
    CLICK_DESCRIPTOR: "clicky click",
    NODE_NAME: "node",
    NODE_TYPE: "node type",
    DEPARTMENTS: "this is a department",
    SAVE_NODE: "Save node button",
    SAVE_EDGE: "Save edge field"
};

export const TOUR_STEPS_IDS_CSV = {
    CLICK_START: "start",
    CHOOSE_FILE: "choose file",
    SAVE_FILE: "save file",
    EXPORT: "export",
    VIEW_DB_TABLE: "view database table",
};

export const TOUR_STEPS_IDS_SERVICE_REQUEST = [
    {
        target: '[data-tour-id="service-tabs"]',
        content: 'Use these tabs to navigate between different service request types.',
    },
    {
        target: '[data-tour-id="service-table-card"]',
        content: 'This card displays all service requests from all departments. You can sort, filter, and view details.',
    },
];
