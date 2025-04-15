import { NavbarMGH } from '../../../components/NavbarMGH.tsx';
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {PatientRequestForm} from "./PatientRequestForm";
import {AllPatientRequests} from "./AllPatientRequests";

export function PatientRequestPage() {
    return(
        <>
            <NavbarMGH />
            <Tabs defaultValue="patientRequest" className="w-full">
                <TabsList className="flex border-b border-gray-300 bg-gray-100 rounded-t-lg relative z-10">
                    <TabsTrigger value="patientRequest"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Nonemergent Patient Request</TabsTrigger>
                    <TabsTrigger value="allPatientRequests"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        All Requests</TabsTrigger>
                </TabsList>
                <div className="relative z-0 -mt-1 border border-gray-300 rounded-b-lg bg-white p-4">
                    <TabsContent value="patientRequest">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="allPatientRequests">
                        <AllPatientRequests />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default PatientRequestPage;