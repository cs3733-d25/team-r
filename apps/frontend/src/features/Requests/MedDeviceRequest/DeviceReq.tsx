import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {DeviceReqForm} from "./DeviceReqForm";
import {DeviceReqPage} from "./DeviceReqPage";

export function DeviceReq() {
    return(
        <>
            <h1 className="text-3xl font-bold font-trade text-black py-2 pt-6 mb-4 text-center">Medical Device Request</h1>
            <Tabs defaultValue="deviceForm">
                <TabsList>
                    <TabsTrigger value="deviceForm">
                        Medical Device Request</TabsTrigger>
                    <TabsTrigger value="devicePage"
                                 >
                        View All Requests</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="deviceForm">
                        <DeviceReqForm/>
                    </TabsContent>
                    <TabsContent value="devicePage">
                        <DeviceReqPage />
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default DeviceReq;