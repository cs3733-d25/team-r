import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {DeviceReqForm} from "./DeviceReqForm";
import {DeviceReqPage} from "./DeviceReqPage";
import {Graphs} from "@/features/Requests/Graphs.tsx";

export function DeviceReq() {
    return(
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Medical Device Request</h1>
            <Tabs defaultValue="deviceForm">
                <TabsList>
                    <TabsTrigger value="deviceForm">
                        Medical Device Request</TabsTrigger>
                    <TabsTrigger value="devicePage"
                                 >
                        View All Requests</TabsTrigger>
                    <TabsTrigger value="deviceGraph"
                    >
                        View Graphs</TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="deviceForm">
                        <DeviceReqForm/>
                    </TabsContent>
                    <TabsContent value="devicePage">
                        <DeviceReqPage />
                    </TabsContent>
                    <TabsContent value="deviceGraph">
                        {Graphs("Device")}
                    </TabsContent>
                </div>
            </Tabs>

        </>
    )
}
export default DeviceReq;