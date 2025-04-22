import {Tabs, TabsContent, TabsList, TabsTrigger} from '../../../components/ui/tabs.tsx'
import {PatientRequestForm} from "./PatientRequestForm";
import {AllPatientRequests} from "./AllPatientRequests";

export function PatientRequestPage() {
    return(
        <>
            <h1 className="text-2xl font-bold mb-0 place-self-center">Nonemergent Patient Request System</h1>
            <h2 className="text-xl font-bold mb-6 place-self-center">Nora Cleary & Daksh Gajaria</h2>
            <Tabs defaultValue="patientRequest">
                <TabsList>
                    <TabsTrigger value="patientRequest">
                        Nonemergent Patient Request</TabsTrigger>
                    <TabsTrigger value="allPatientRequests">
                        All Requests</TabsTrigger>
                </TabsList>
                    <TabsContent value="patientRequest">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="allPatientRequests">
                        <AllPatientRequests />
                    </TabsContent>


            </Tabs>

        </>
    )
}
export default PatientRequestPage;