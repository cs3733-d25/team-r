import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import PatientRequestForm from "@/features/Requests/PatientRequest/PatientRequestForm.tsx";
import PatientRequestPage from "@/features/Requests/PatientRequest/PatientRequestPage.tsx";
import {Graphs} from "@/features/Requests/Graphs.tsx";


export function AllPatientRequests() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Non-Emergent Patient Request</h1>
            <Tabs defaultValue="patientForm">
                <TabsList>
                    <TabsTrigger value="patientForm">
                        Non Emergent Patient Request</TabsTrigger>
                    <TabsTrigger value="patientPage"
                    >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="patientGraph"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientForm">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="patientPage">
                        <PatientRequestPage/>
                    </TabsContent>
                    <TabsContent value="patientGraph">
                        <Graphs requestType="Nonemergent"/>
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default AllPatientRequests;