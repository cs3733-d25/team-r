import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input.tsx"
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import { TourAlertDialog, useTour, TourStep } from '@/components/tour';
import { TOUR_STEPS_IDS_CSV } from '@/lib/tour-constants.ts';

export function CSVPage() {
    const [csvfile, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<string>('');

    //function to set file to user input
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }

    };

    //function to send CSV file to database
    const handleSave = async () => {
        if (csvfile != null) {
            // Make sure the file is a CSV that is under 5 MB - Riley
            if (csvfile.size > 5 * 1024 * 1024 || !csvfile.name.endsWith('.csv')) {
                setFeedback("File must be a .csv and less than 5MB.");
                return;
            }

            const formData = new FormData();
            formData.append('csvfile', csvfile);
            setFeedback(""); //clears feedback before setting again

            try {
                console.log("CSV file is trying to send off! :)");
                // Stops Users from being able to save while the file is still uploading - Riley
                setLoading(true);

                const sendOff = await axios.post('/api/csv/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log("CSV file is sent off! :)", sendOff);
                setFeedback("success"); //this results in confirmation card popping up
            } catch (error) {
                console.error("CSV File Sendoff didn't work :(");
                setFeedback("Error submitting CSV file. Please try again."); //this results in failure card popping up
            } finally {
                //Allows Users to be able to use save button - Riley
                setLoading(false);
            }
        } else {
            setFeedback("Please Select a CSV file");
        }
    };

    //function to create the confirmation card
    const handleConfirmation = () => {
        return (
            <div className="mb-6 rounded-lg shadow-md overflow-hidden border-2 border-primary text-foreground">
                <div className="bg-primary text-primary-foreground font-bold px-4 py-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    Import Confirmed
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">Your CSV File was Imported</h3>
                </div>
            </div>
        );
    }

    //function to create the error card
    const handleError = () => {
        return (
            <Alert className="mb-4 p-4 rounded-md bg-destructive/40 border border-accent-foreground">
                <AlertDescription className={'text-foreground'}>
                    {feedback}
                </AlertDescription>
            </Alert>
        )
    }

    //function to download the CSV file
    const handleExport = async()=> {
        {
            await axios
                .get('/api/csv/export', { responseType: 'blob' })
                .then((response) => {
                    const csvURL = URL.createObjectURL(
                        new Blob([response.data], { type: 'text/csv' })
                    );

                    const csvLink = document.createElement('a');
                    csvLink.href = csvURL;
                    csvLink.setAttribute('download', 'directoryData.csv');
                    document.body.appendChild(csvLink);
                    csvLink.click();
                    csvLink.remove();
                    console.log('CSV Downloaded Yay!');
                })
                .catch((error) => {
                    console.error("CSV Didn't fully download :(", error);
                });
        }
    }

    const steps: TourStep[] = [
        { content: <div>On this page you can change the hospital directories for the website.</div>, selectorId: TOUR_STEPS_IDS_CSV.CLICK_START, position: "bottom" },
        { content: <div>First, upload your csv file here. </div>, selectorId: TOUR_STEPS_IDS_CSV.CHOOSE_FILE, position: "bottom" },
        { content: <div>Next, save it.</div>, selectorId: TOUR_STEPS_IDS_CSV.SAVE_FILE, position: "right" },
        { content: <div>Finally, view the database to see the newly uploaded directory!</div>, selectorId: TOUR_STEPS_IDS_CSV.VIEW_DB_TABLE, position: "right" },
        { content: <div>You can also download the current directory here.</div>, selectorId: TOUR_STEPS_IDS_CSV.EXPORT, position: "left" },
        // Add more steps here
    ];
    const { setSteps } = useTour();
    const [openTour, setOpenTour] = useState(false);

    useEffect(() => {
        setSteps(steps);

        // check if user has already seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenCSVTour') === 'true';

        if (!hasSeenTour) {
            const timer = setTimeout(() => {
                setOpenTour(true);
                // mark that user has seen the tour
                localStorage.setItem('hasSeenCSVTour', 'true');
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [setSteps]);

    return (
        <div>
            <div>
                <Label htmlFor="ImportCSV" className={"mb-1"}>Import CSV File: </Label>
                <Input
                    type="file"
                    name="ImportCSV"
                    accept=".csv"
                    onChange={handleFileChange}
                    className={"mb-2"}
                    id={TOUR_STEPS_IDS_CSV.CHOOSE_FILE}
                ></Input>
            </div>
            <div className={'float-right'}>
                <Button
                    variant="default"
                    // id="ExportCSV"
                    name="ExportCSV"
                    onClick={handleExport}
                    id={TOUR_STEPS_IDS_CSV.EXPORT}
                >
                    Export
                </Button>
            </div>
            <div className={"mb-6"}>
                <Button
                    variant="default"
                    //id="SaveCSV"
                    name="SaveCSV"
                    onClick={handleSave}
                    disabled={loading}
                    id={TOUR_STEPS_IDS_CSV.SAVE_FILE}
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </div>
            {feedback === 'success' && handleConfirmation()}
            {(feedback != 'success' && feedback != '') && handleError()}

            <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
        </div>
    );
}
export default CSVPage;