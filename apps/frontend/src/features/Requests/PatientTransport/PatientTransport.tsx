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
                    <TabsTrigger value="patientTransportForm">
                        Patient Transport Request</TabsTrigger>
                    <TabsTrigger value="patientTransportTable"
                    >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="patientTransportGraph"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientTransportForm">
                        <PatientTransportForm />
                    </TabsContent>
                    <TabsContent value="patientTransportTable">
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