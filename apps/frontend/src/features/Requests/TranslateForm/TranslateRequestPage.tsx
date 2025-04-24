import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../../components/Navbar.tsx";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export function TranslateRequestPage() {
    const [translations, setTranslations] = useState([{
        employeeID: null,
        language: null,
        urgency: null,
        department: null,
        location: null,
        roomNumber: null,
        description: null,
        status: null
    }]);

    useEffect(() => {
        retrieveFromDatabase();
    }, []);

    async function retrieveFromDatabase() {
        try {
            const response = await axios.get("/api/translate/");
            console.log("response from /translate/ get", response.data);
            setTranslations(response.data);
        } catch (error) {
            console.error("Error in retrieve:", error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Employee Name</TableHead>
                            <TableHead className="text-center">Language</TableHead>
                            <TableHead className="text-center">Urgency</TableHead>
                            <TableHead className="text-center">Department</TableHead>
                            <TableHead className="text-center">Location</TableHead>
                            <TableHead className="text-center">Room Number</TableHead>
                            <TableHead className="text-center">Description</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-center">
                        {translations.map((row, index) => (
                            <TableRow key={index} className="border-t">
                                <TableCell>{row.employeeID}</TableCell>
                                <TableCell>{row.language}</TableCell>
                                <TableCell>{row.urgency}</TableCell>
                                <TableCell>{row.department}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.roomNumber}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default TranslateRequestPage;
