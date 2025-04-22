import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {DeviceReqForm} from "./DeviceReqForm";
import {DeviceReqPage} from "./DeviceReqPage";

export function DeviceReq() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Medical Device Request System</h1>
            <h2 className="text-xl font-bold font-trade mb-6 place-self-center">Owen Miller & Keagan Hitt & Nora Cleary</h2>
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