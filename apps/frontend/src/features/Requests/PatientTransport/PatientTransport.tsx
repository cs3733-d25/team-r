import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PatientTransportForm from "@/features/Requests/PatientTransport/PatientTransportForm.tsx";
import PatientTransportPage from "@/features/Requests/PatientTransport/PatientTransportPage.tsx";

export function TransportRequestPage() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Patient Transport Request</h1>
            <Tabs defaultValue="patientTransportForm">
                <TabsList>
                    <TabsTrigger value="patientTransportForm">
                        Patient Transport Request</TabsTrigger>
                    <TabsTrigger value="patientTransportTable"
                    >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientTransportForm">
                        <PatientTransportForm />
                    </TabsContent>
                    <TabsContent value="patientTransportTable">
                        <PatientTransportPage />
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default TransportRequestPage;