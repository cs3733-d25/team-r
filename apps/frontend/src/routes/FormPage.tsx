import React from 'react';
import DeviceReqForm from '../components/DeviceReqForm.tsx';
import Navbar from '../components/Navbar.tsx';

const FormPage = () => {
    return (
        <>
            <Navbar />
            <div className="p-10">
                <DeviceReqForm></DeviceReqForm>
            </div>
        </>
    );
};

export default FormPage;
