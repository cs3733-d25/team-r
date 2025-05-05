import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PatientTransportForm from "@/features/Requests/PatientTransport/PatientTransportForm.tsx";
import PatientTransportPage from "@/features/Requests/PatientTransport/PatientTransportPage.tsx";
import {Graphs} from "@/features/Requests/Graphs.tsx";

export function TransportRequestPage() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Patient Transport Request</h1>
            <Tabs defaultValue="patientTransportForm">
                <TabsList>
                    <TabsTrigger value="patientTransportForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Patient Transport Request</TabsTrigger>
                    <TabsTrigger value="patientTransportTable" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}
                    >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="patientTransportGraph"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientTransportForm" className="dark:bg-background dark:border-gray-600">
                        <PatientTransportForm />
                    </TabsContent>
                    <TabsContent value="patientTransportTable" className="dark:bg-background dark:border-gray-600">
                        <PatientTransportPage />
                    </TabsContent>
                    <TabsContent value="patientTransportGraph">
                        <Graphs requestType="Transport"/>
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default TransportRequestPage;