import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PatientRequestForm from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";


export function AllPatientRequests() {
    return(
        <>
            <h1 className="text-3xl font-bold font-trade text-black py-2 pt-6 mb-4 text-center">Non-Emergent Patient Request</h1>
            <Tabs defaultValue="patientForm">
                <TabsList>
                    <TabsTrigger value="patientForm">
                        Non Emergent Patient Request</TabsTrigger>
                    <TabsTrigger value="patientPage"
                    >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientForm">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="patientPage">
                        <PatientRequestPage/>
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default AllPatientRequests;