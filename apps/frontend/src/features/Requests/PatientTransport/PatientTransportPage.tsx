import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../../components/ui/tabs.tsx';
import TransportationRequestForm from "./PatientTransportForm.tsx";
import TransportRequestPage from "./PatientTransport.tsx";

export function PatientTransportPage() {
    return(
        <>
            <NavbarMGH />
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Transport Request System</h1>
            <h2 className="text-2xl font-bold font-trade mb-6 place-self-center">Alex Lowczyk & Joshua Gifford</h2>
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