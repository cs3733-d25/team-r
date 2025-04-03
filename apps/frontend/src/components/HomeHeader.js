import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
var HomeHeader = function (_a) {
    var title = _a.title, homelabel = _a.homelabel, homelabelLink = _a.homelabelLink, formlabel = _a.formlabel, formlabelLink = _a.formlabelLink;
    return (_jsxs("header", { className: "bg-blue-600 text-white p-4 shadow-md", children: [_jsx("h1", { className: "text-2xl font-bold", children: title }), homelabel && homelabelLink ? (_jsx(Link, { to: homelabelLink, className: "text-white hover:text-blue-900 underline", children: homelabel })) : (homelabel && _jsx("p", { className: "text-sm", children: homelabel })), formlabel && formlabelLink ? (_jsx(Link, { to: formlabelLink, className: "text-white hover:text-blue-900 underline", children: formlabel })) : (formlabel && _jsx("p", { className: "text-sm", children: formlabel }))] }));
};
export default HomeHeader;
