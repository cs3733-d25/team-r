import React from 'react';
import ExampleComponent from "../components/ExampleComponent.tsx";
import HomeHeader from "../components/HomeHeader";


const HomePage = () => {
    return (
        <div className="p-10">
            <HomeHeader
                title={"Home"}
                homelabel={"home test."}
                homelabelLink={"/test"}
                formlabel={"Service Request"}
                formlabelLink={"/form"}
            />
            <h1 className="font-bold text-xl pb-4">Home Page</h1>
            <ExampleComponent></ExampleComponent>
        </div>
    );
};

export default HomePage;