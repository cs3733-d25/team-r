import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {DeviceReqForm} from "./DeviceReqForm";
import {DeviceReqPage} from "./DeviceReqPage";

export function DeviceReq() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Medical Device Request</h1>
            <Tabs defaultValue="deviceForm">
                <TabsList>
                    <TabsTrigger value="deviceForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Medical Device Request</TabsTrigger>
                    <TabsTrigger value="devicePage" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}
                                 >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="deviceForm" className="dark:bg-background dark:border-gray-600">
                        <DeviceReqForm/>
                    </TabsContent>
                    <TabsContent value="devicePage" className="dark:bg-background dark:border-gray-600">
                        <DeviceReqPage />
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default DeviceReq;