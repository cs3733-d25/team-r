import React from 'react';
import DeviceReqForm from './DeviceReqForm.tsx';
import Navbar from '../../components/Navbar.tsx';

const FormPage = () => {
    return (
        <>
            <Navbar />
            <div className="p-10">
                {/* this is a bad layout, you should really separate
                DeviceReqForm into multiple components that build the website like:
                <MedDeviceSelect/>
                <PriortiyLevel/>
                <MedDeviceForm/>
                rather than have FormPage be 1 component that contains multiple
                subcomponents */}
                <DeviceReqForm/>
            </div>
        </>
    );
};

export default FormPage;
