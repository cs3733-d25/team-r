/**
 * Converts an array of objects to a CSV string.
 * @param {Object[]} data - the array of objects to convert into CSV format
 * @returns {string} - the CSV string representation of the input data
 */
export function toCSV(data: any[]): string {
    if (data.length === 0) return '';

    // get headers from keys of the first object
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(',');

    // create data rows
    const rows = data.map((row) => {
        return headers.map((header) => row[header]).join(',');
    });

    // combine header and data rows into CSV string
    return [headerRow, ...rows].join('\n');
}