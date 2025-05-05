import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import TranslateRequestForm from "@/features/Requests/TranslateForm/TranslateRequestForm.tsx";
import TranslateRequestPage from "@/features/Requests/TranslateForm/TranslateRequestPage.tsx";
import InlineTranslator from '@/features/Requests/TranslateForm/InlineTranslator.tsx';
import {Graphs} from "@/features/Requests/Graphs.tsx";

function TranslateRequestTabs() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Translator Request</h1>
            <Tabs defaultValue="translateRequestForm">
                <TabsList>
                    <TabsTrigger value="translateRequestForm" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Translator Request Form
                    </TabsTrigger>
                    <TabsTrigger value="translateRequestTable" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        View All Requests
                    </TabsTrigger>
                    <TabsTrigger value="translateRequestGraph" className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        View Graphs
                    </TabsTrigger>
                    <TabsTrigger value='inlineTranslator' className={"border border-gray-300 dark:border-gray-600 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-black dark:data-[state=active]:text-white dark:text-gray-300"}>
                        Quick Translator
                    </TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="translateRequestForm" className="dark:bg-background dark:border-gray-600">
                        <TranslateRequestForm />
                    </TabsContent>
                    <TabsContent value="translateRequestTable" className="dark:bg-background dark:border-gray-600">
                        <TranslateRequestPage />
                    </TabsContent>
                    <TabsContent value="translateRequestGraph" className="dark:bg-background dark:border-gray-600">
                        <Graphs requestType="Translate"/>
                    </TabsContent>
                    <TabsContent value='inlineTranslator' className="dark:bg-background dark:border-gray-600">
                        <InlineTranslator />
                    </TabsContent>
                </div>
            </Tabs>
        </>
    );
}

export default TranslateRequestTabs;
