import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import SanitationRequestForm from "@/features/Requests/SanitationForm/SanitationRequestForm.tsx";
import SanitationRequestPage from "@/features/Requests/SanitationForm/SanitationRequestPage.tsx";

function SanitationRequestTabs() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Sanitation Request</h1>
            <Tabs defaultValue="sanitationRequestForm" >
                <TabsList>
                    <TabsTrigger value="sanitationRequestForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Sanitation Request Form</TabsTrigger>
                    <TabsTrigger value="sanitationRequestTable" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        View All Requests</TabsTrigger>
                </TabsList>
                <div >
                    <TabsContent value="sanitationRequestForm" className="dark:bg-background dark:border-gray-600">
                        <SanitationRequestForm/>
                    </TabsContent>
                    <TabsContent value="sanitationRequestTable" className="dark:bg-background dark:border-gray-600">
                        <SanitationRequestPage />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default SanitationRequestTabs;