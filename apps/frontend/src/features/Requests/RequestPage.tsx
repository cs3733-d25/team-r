import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AllRequestsTable } from './AllRequestsTable.tsx';
import DeviceReqPage from './MedDeviceRequest/DeviceReqPage.tsx';
import PrescriptionPage from '@/features/Requests/PrescriptionForm/PrescriptionPage.tsx';
import PatientRequestPage from '@/features/Requests/PatientRequest/PatientRequestPage.tsx';
import SanitationRequestPage from '@/features/Requests/SanitationForm/SanitationRequestPage.tsx';
import PatientTransportPage from '@/features/Requests/PatientTransport/PatientTransportPage.tsx';
import TranslateRequestPage from './TranslateForm/TranslateRequestPage';
import { TourAlertDialog, useTour, TourStep } from '@/components/tour';
import { TOUR_STEPS_IDS_SERVICE_REQS } from '@/lib/tour-constants.ts';

export function RequestPage() {
    const [activeTab, setActiveTab] = useState('overview'); // Default to Overview
    const navigate = useNavigate();
    const { setSteps } = useTour();
    const [openTour, setOpenTour] = useState(false);

    const requestTypes = [
        { name: 'Medical Device', description: 'Requests for medical devices', path: '/devicerequest', tab: 'medical-device' },
        { name: 'Prescription', description: 'Medication prescriptions for patients', path: '/prescription', tab: 'prescription' },
        { name: 'Patient', description: 'Non-emergency patient service requests', path: '/patientrequestpage', tab: 'patient' },
        { name: 'Transport', description: 'Patient transportation between facilities', path: '/transport', tab: 'transport' },
        { name: 'Sanitation', description: 'Cleaning and sanitation service requests', path: '/sanitation', tab: 'sanitation' },
        { name: 'Translator', description: 'Language translator service requests', path: '/translation', tab: 'translator' },
    ];

    const steps: TourStep[] = [
        {
            content: <div>Welcome to the Service Request Dashboard! Let's get started.</div>,
            selectorId: TOUR_STEPS_IDS_SERVICE_REQS.CLICK_START,
            position: "bottom"
        },
        {
            content: <div>Here you can see an overview of all request types. Each card represents a different service.</div>,
            selectorId: TOUR_STEPS_IDS_SERVICE_REQS.DASHBOARD,
            position: "bottom"
        },
        {
            content: <div>Click here to create a new request for a medical device.</div>,
            selectorId: TOUR_STEPS_IDS_SERVICE_REQS.MAKE_REQUEST,
            position: "bottom"
        },
        {
            content: <div>Use these tabs to switch between different request types and view all requests.</div>,
            selectorId: TOUR_STEPS_IDS_SERVICE_REQS.FILTER_REQUEST,
            position: "bottom"
        },
    ];

    useEffect(() => {
        setSteps(steps);
        const hasSeenTour = localStorage.getItem('hasSeenServiceReqsTour') === 'true';
        if (!hasSeenTour) {
            const timer = setTimeout(() => {
                setOpenTour(true);
                localStorage.setItem('hasSeenServiceReqsTour', 'true');
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [setSteps]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto pt-12 pb-8">
                <h1 className="text-3xl font-bold mb-6 text-center" id={TOUR_STEPS_IDS_SERVICE_REQS.CLICK_START}>
                    Service Request Dashboard
                </h1>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-0 border-l border-gray-300 shadow-none" id={TOUR_STEPS_IDS_SERVICE_REQS.FILTER_REQUEST}>
                        <TabsTrigger value="overview" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>Overview</TabsTrigger>
                        <TabsTrigger value="all" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>All Requests</TabsTrigger>
                        {requestTypes.map((type) => (
                            <TabsTrigger key={type.tab} value={type.tab} className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                                {type.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Overview Tab Content - Default View */}
                    <TabsContent value="overview" className="space-y-6 dark:bg-background dark:border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id={TOUR_STEPS_IDS_SERVICE_REQS.DASHBOARD}>
                            {requestTypes.map((type, index) => (
                                <Card key={type.name} className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary">
                                    <CardHeader className="text-primary-foreground bg-primary rounded-t-lg px-6">
                                        <CardTitle>{type.name} Requests</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 px-6 pb-6 bg-white h-full flex flex-col dark:border-gray-600 dark:bg-background">
                                        <p className="text-muted-foreground mb-4 min-h-[3rem]">{type.description}</p>
                                        <div className="flex flex-col space-y-2 mt-auto">
                                            <Button variant="secondary" onClick={() => setActiveTab(type.tab)}>
                                                View {type.name} Requests
                                            </Button>
                                            <Button
                                                onClick={() => navigate(type.path)}
                                                id={index === 0 ? TOUR_STEPS_IDS_SERVICE_REQS.MAKE_REQUEST : undefined}
                                            >
                                                Create New Request
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* All Requests Table */}
                    <TabsContent value="all" className="dark:bg-background dark:border-gray-600">
                        <AllRequestsTable />
                    </TabsContent>

                    {/* Individual Service Tabs */}
                    <TabsContent value="medical-device" className="dark:bg-background dark:border-gray-600">
                        <DeviceReqPage />
                    </TabsContent>
                    <TabsContent value="prescription" className="dark:bg-background dark:border-gray-600">
                        <PrescriptionPage />
                    </TabsContent>
                    <TabsContent value="patient" className="dark:bg-background dark:border-gray-600">
                        <PatientRequestPage />
                    </TabsContent>
                    <TabsContent value="transport" className="dark:bg-background dark:border-gray-600">
                        <PatientTransportPage />
                    </TabsContent>
                    <TabsContent value="sanitation" className="dark:bg-background dark:border-gray-600">
                        <SanitationRequestPage />
                    </TabsContent>
                    <TabsContent value="translator" className="dark:bg-background dark:border-gray-600">
                        <TranslateRequestPage />
                    </TabsContent>
                </Tabs>

                <TourAlertDialog isOpen={openTour} setIsOpen={setOpenTour} />
            </div>
        </div>
    );
}

export default RequestPage;