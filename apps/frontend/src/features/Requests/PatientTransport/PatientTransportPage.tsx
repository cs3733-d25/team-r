import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import TransportationRequestForm from "./PatientTransportForm.tsx";
import TransportRequestPage from "./PatientTransport.tsx";

export function PatientTransportPage() {
    return(
        <>
            <NavbarMGH />
            <Tabs defaultValue="patientTransportForm" className="w-full">
                <TabsList className="flex border-b border-gray-300 bg-gray-100 rounded-t-lg relative z-10">
                    <TabsTrigger value="patientTransportForm"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        PatientTransportForm</TabsTrigger>
                    <TabsTrigger value="patientTransportTable"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        PatientTransport Table</TabsTrigger>
                </TabsList>
                <div className="relative z-0 -mt-1 border border-gray-300 rounded-b-lg bg-white p-4">
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