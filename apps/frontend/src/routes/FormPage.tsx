import React from 'react';
import ExampleComponent from "../components/ExampleComponent.tsx";
import HomeHeader from "../components/HomeHeader";
import SanitationForm from "../components/SanitationForm.tsx";


const FormPage = () => {
    return (
        <div className="p-10">
            <SanitationForm ></SanitationForm>
        </div>
    );
};

export default FormPage;