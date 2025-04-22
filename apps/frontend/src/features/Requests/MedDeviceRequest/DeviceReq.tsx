import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {DeviceReqForm} from "./DeviceReqForm";
import {DeviceReqPage} from "./DeviceReqPage";

export function DeviceReq() {
    return(
        <>
            <h1 className="text-2xl font-bold font-trade mb-0 place-self-center">Medical Device Request System</h1>
            <h2 className="text-xl font-bold font-trade mb-6 place-self-center">Owen Miller & Keagan Hitt & Nora Cleary</h2>
            <Tabs defaultValue="deviceForm" className="items-center justify-center w-full px-50">
                <TabsList className="flex bg-hidden rounded-t-lg relative z-10">
                    <TabsTrigger value="deviceForm"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Medical Device Request</TabsTrigger>
                    <TabsTrigger value="devicePage"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 bg-input data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        All Requests</TabsTrigger>
                </TabsList>
                <div className={"mb-6"}>
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