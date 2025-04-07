// takes in a CSV string and returns an array of objects where each object represents a row
export function parseCSV(csv: string): Record<string, string>[] {
    // split into lines
    const [headerLine, ...lines] = csv.trim().split("\n");

    // extract headers
    const headers = headerLine.split(",").map((h) => h.trim());

    // parse each data row
    return lines
        .filter((line) => line.trim() !== "")
        .map((line) => {
            const values = line.split(",").map((val) => val.trim());
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
                row[header] = values[index] ?? "";
            });
            return row;
        });
}