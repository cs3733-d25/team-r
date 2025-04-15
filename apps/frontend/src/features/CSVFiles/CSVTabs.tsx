import {NavbarMGH} from "@/components/NavbarMGH.tsx";
import {Link} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import CSVPage from "@/features/CSVFiles/CSVPage.tsx";
import CSVTablePage from "@/features/CSVFiles/CSVTable.tsx";

function CSVTabPage() {
    return(
        <>
            <NavbarMGH />
            <Tabs defaultValue="CSVPage" className="w-full">
                <TabsList className="flex border-b border-gray-300 bg-gray-100 rounded-t-lg relative z-10">
                    <TabsTrigger value="CSVPage"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        Import/Export CSV</TabsTrigger>
                    <TabsTrigger value="CSVTable"
                                 className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-700 border border-b-transparent data-[state=active]:bg-white data-[state=active]:border-gray-300 data-[state=active]:-mb-px transition">
                        View DB Table</TabsTrigger>
                </TabsList>
                <div className="relative z-0 -mt-1 border border-gray-300 rounded-b-lg bg-white p-4">
                    <TabsContent value="CSVPage">
                        <CSVPage/>
                    </TabsContent>
                    <TabsContent value="CSVTable">
                        <CSVTablePage />
                    </TabsContent>
                </div>

            </Tabs>

        </>
    )
}
export default CSVTabPage;