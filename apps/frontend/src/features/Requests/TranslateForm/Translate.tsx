import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import TranslateRequestForm from "@/features/Requests/TranslateForm/TranslateRequestForm.tsx";
import TranslateRequestPage from "@/features/Requests/TranslateForm/TranslateRequestPage.tsx";

function TranslateRequestTabs() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-center pt-12">Translator Request</h1>
            <Tabs defaultValue="translateRequestForm">
                <TabsList>
                    <TabsTrigger value="translateRequestForm">
                        Translator Request Form
                    </TabsTrigger>
                    <TabsTrigger value="translateRequestTable">
                        View All Requests
                    </TabsTrigger>
                </TabsList>
                <div>
                    <TabsContent value="translateRequestForm">
                        <TranslateRequestForm />
                    </TabsContent>
                    <TabsContent value="translateRequestTable">
                        <TranslateRequestPage />
                    </TabsContent>
                </div>
            </Tabs>
        </>
    );
}

export default TranslateRequestTabs;
