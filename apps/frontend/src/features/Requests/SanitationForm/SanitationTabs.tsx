import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import SanitationRequestForm from "@/features/Requests/SanitationForm/SanitationRequestForm.tsx";
import SanitationRequestPage from "@/features/Requests/SanitationForm/SanitationRequestPage.tsx";

function SanitationRequestTabs() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Sanitation Request</h1>
            <Tabs defaultValue="sanitationRequestForm" >
                <TabsList>
                    <TabsTrigger value="sanitationRequestForm">
                        Sanitation Request Form</TabsTrigger>
                    <TabsTrigger value="sanitationRequestTable">
                        View All Requests</TabsTrigger>
                </TabsList>
                <div >
                    <TabsContent value="sanitationRequestForm">
                        <SanitationRequestForm/>
                    </TabsContent>
                    <TabsContent value="sanitationRequestTable">
                        <SanitationRequestPage />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default SanitationRequestTabs;