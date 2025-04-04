import React from 'react';
import DeviceReqForm from '../components/DeviceReqForm.tsx';
import NavBar from '../components/NavBar.tsx';

const FormPage = () => {
    return (
        <>
            <NavBar />
            <div className="p-10">
                <DeviceReqForm></DeviceReqForm>
            </div>
        </>
    );
};

export default FormPage;
