import React, { useState } from 'react';
import { NavbarMGH } from '@/components/NavbarMGH';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// specific request components
import { DeviceReqPage } from './MedDeviceRequest/DeviceReqPage';
import { PrescriptionPage } from './PrescriptionForm/PrescriptionPage';
import { AllPatientRequests } from './PatientRequest/AllPatientRequests';
import TransportRequestPage from './PatientTransport/PatientTransport';
import SanitationRequestPage from './SanitationForm/SanitationRequestPage';

export function AllRequestsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const requestTypes = [
    { name: 'Medical Device', description: 'Requests for medical devices', path: '/devicerequest' },
    { name: 'Prescription',   description: 'Medication prescriptions for patients', path: '/prescription' },
    { name: 'Patient',        description: 'Non-emergency patient service requests', path: '/patientrequestpage' },
    { name: 'Transport',      description: 'Patient transportation between facilities', path: '/transport' },
    { name: 'Sanitation',     description: 'Cleaning and sanitation service requests', path: '/sanitation' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavbarMGH />

      <div className="container mx-auto pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Service Request Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* remove bottom border, zero out bottom margin */}
          <TabsList className="mb-0 border-b-0 shadow-none">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical-device">Medical Device</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="sanitation">Sanitation</TabsTrigger>
          </TabsList>

          {/* pull content up by 1px to kill any gap */}
          <TabsContent value="overview" className="space-y-6 -mt-px">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requestTypes.map((type) => (
                <Card
                  key={type.name}
                  className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                    <CardTitle>{type.name} Requests</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 px-6 pb-6">
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab(type.name.toLowerCase())}
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
            <Card className="rounded-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                <CardTitle>Medical Device Requests</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <DeviceReqPage />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescription" className="-mt-px">
            <Card className="rounded-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                <CardTitle>Prescription Requests</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <PrescriptionPage />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patient" className="-mt-px">
            <Card className="rounded-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                <CardTitle>Patient Requests</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <AllPatientRequests />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="-mt-px">
            <Card className="rounded-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                <CardTitle>Transport Requests</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <TransportRequestPage />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sanitation" className="-mt-px">
            <Card className="rounded-lg overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg py-4 px-6">
                <CardTitle>Sanitation Requests</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <SanitationRequestPage />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AllRequestsPage;
