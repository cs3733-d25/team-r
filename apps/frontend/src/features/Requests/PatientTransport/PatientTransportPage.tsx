import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../../components/ui/tabs.tsx';
import TransportationRequestForm from "./PatientTransportForm.tsx";
import TransportRequestPage from "./PatientTransport.tsx";

export function PatientTransportPage() {
    return(
        <>
            <h1 className="text-2xl font-bold mb-0">Transport Request System</h1>
            <h2 className="text-xl font-bold mb-6">Alex Lowczyk & Joshua Gifford</h2>
            <Tabs defaultValue="patientTransportForm">
                <TabsList>
                    <TabsTrigger value="patientTransportForm"
                    >
                        Patient Transport Request</TabsTrigger>
                    <TabsTrigger value="patientTransportTable">
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientTransportForm">
                        <TransportationRequestForm></TransportationRequestForm>
                    </TabsContent>
                    <TabsContent value="patientTransportTable">
                        <TransportRequestPage/>
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default PatientTransportPage;