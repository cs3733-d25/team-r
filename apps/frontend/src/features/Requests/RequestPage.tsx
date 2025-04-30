import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AllRequestsTable } from './AllRequestsTable.tsx';
import DeviceReqPage from './MedDeviceRequest/DeviceReqPage.tsx';
import PrescriptionPage from '@/features/Requests/PrescriptionForm/PrescriptionPage.tsx';
import PatientRequestPage from '@/features/Requests/PatientRequest/PatientRequestPage.tsx';
import SanitationRequestPage from '@/features/Requests/SanitationForm/SanitationRequestPage.tsx';
import PatientTransportPage from '@/features/Requests/PatientTransport/PatientTransportPage.tsx';
import TranslateRequestPage from './TranslateForm/TranslateRequestPage';

export function AllRequestsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();


  const requestTypes = [

    { name: 'Medical Device', description: 'Requests for medical devices', path: '/devicerequest', tab: 'medical-device' },
    { name: 'Prescription',   description: 'Medication prescriptions for patients', path: '/prescription', tab: 'prescription' },
    { name: 'Patient',        description: 'Non-emergency patient service requests', path: '/patientrequestpage', tab: 'patient' },
    { name: 'Transport',      description: 'Patient transportation between facilities', path: '/transport', tab: 'transport' },
    { name: 'Sanitation',     description: 'Cleaning and sanitation service requests', path: '/sanitation', tab: 'sanitation' },
      { name: 'Translator',    description: 'Language translator service requests', path: '/translation', tab: 'translator' },

  ];

  return (
      <div className="min-h-screen bg-background">
          <div className="container mx-auto pt-12 pb-8">
              <h1 className="text-3xl font-bold mb-6 text-center">Service Request Dashboard</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-0 border-b-0 shadow-none">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="all-requests">All Requests</TabsTrigger>
              <TabsTrigger value="medical-device">Medical Device</TabsTrigger>
              <TabsTrigger value="prescription">Prescription</TabsTrigger>
              <TabsTrigger value="patient">Patient Request</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="translation">Translator</TabsTrigger>
                <TabsTrigger value="sanitation">Sanitation</TabsTrigger>
            </TabsList>

                  <TabsContent value="overview" className="space-y-6 -mt-px">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {requestTypes.map((type) => (
                              <Card
                                  key={type.name}
                                  className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-primary"
                              >
                                  <CardHeader className="text-primary-foreground bg-primary rounded-t-lg px-6">
                                      <CardTitle>{type.name} Requests</CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-6 px-6 pb-6 bg-white h-full">
                                      <p className="text-muted-foreground mb-4">
                                          {type.description}
                                      </p>
                                      <div className="flex flex-col space-y-2">
                                          <Button
                                              variant="secondary"
                                              onClick={() => setActiveTab(type.tab)}
                                          >
                                              View {type.name} Requests
                                          </Button>
                                          <Button onClick={() => navigate(type.path)}>
                                              Create New Request
                                          </Button>
                                      </div>
                                  </CardContent>
                              </Card>
                          ))}
                      </div>
                  </TabsContent>

                  <TabsContent value="medical-device" className="-mt-px">
                      <Card className="rounded-lg overflow-hidden bg-primary">
                          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                              <CardTitle>Medical Device Requests</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-white">
                              <DeviceReqPage />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="prescription" className="-mt-px">
                      <Card className="rounded-lg overflow-hidden bg-primary">
                          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                              <CardTitle>Prescription Requests</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-white">
                              <PrescriptionPage />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="patient" className="-mt-px">
                      <Card className="rounded-lg overflow-hidden bg-primary">
                          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                              <CardTitle>Patient Requests</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-white">
                              <PatientRequestPage />
                          </CardContent>
                      </Card>
                  </TabsContent>

            <TabsContent value="transport" className="-mt-px">
              <Card className="rounded-lg overflow-hidden bg-primary">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                  <CardTitle>Transport Requests</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 bg-white">
                  <PatientTransportPage />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="translation" className="-mt-px">
              <Card className="rounded-lg overflow-hidden bg-primary">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                  <CardTitle>Translation Requests</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 bg-white">
                  <TranslateRequestPage />
                </CardContent>
              </Card>
            </TabsContent>

                  <TabsContent value="sanitation" className="-mt-px">
                      <Card className="rounded-lg overflow-hidden bg-primary">
                          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                              <CardTitle>Sanitation Requests</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-white">
                              <SanitationRequestPage />
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="all-requests" className="-mt-px">
                      <Card className="rounded-lg overflow-hidden bg-primary">
                          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg px-6">
                              <CardTitle>All Requests</CardTitle>
                          </CardHeader>
                          <CardContent className="px-6 pb-6 bg-white">
                              <AllRequestsTable />
                          </CardContent>
                      </Card>
                  </TabsContent>
              </Tabs>
          </div>
      </div>
  );
}

export default AllRequestsPage;
