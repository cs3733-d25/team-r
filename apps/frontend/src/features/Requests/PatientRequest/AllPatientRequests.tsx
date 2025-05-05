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
                    <TabsTrigger value="patientForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Non Emergent Patient Request</TabsTrigger>
                    <TabsTrigger value="patientPage" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}
                    >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="patientGraph"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="patientForm" className="dark:bg-background dark:border-gray-600">
                        <PatientRequestForm/>
                    </TabsContent>
                    <TabsContent value="patientPage" className="dark:bg-background dark:border-gray-600">
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