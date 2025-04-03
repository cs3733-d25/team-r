import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ExampleComponent from "../components/ExampleComponent.tsx";
import HomeHeader from "../components/HomeHeader";
var HomePage = function () {
    return (_jsxs("div", { className: "p-10", children: [_jsx(HomeHeader, { title: "Home", homelabel: "home test.", homelabelLink: "/test", formlabel: "Service Request", formlabelLink: "/servicereqs" }), _jsx("h1", { className: "font-bold text-xl pb-4", children: "Home Page" }), _jsx(ExampleComponent, {})] }));
};
export default HomePage;
