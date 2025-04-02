import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../EmailPassword.css';
function EmailPassword() {
    return (_jsx("div", { className: "centered-container", children: _jsxs("div", { className: "form-container", children: [_jsx("img", { src: "/mgb.png", alt: "Mass General Brigham", className: "logo", width: 50 }), _jsx("h2", { children: "Mass General Brigham Login" }), _jsxs("form", { children: [_jsxs("label", { children: ["Email:", _jsx("input", { type: 'email', name: 'email' })] }), _jsxs("label", { children: ["Password:", _jsx("input", { type: 'password', name: 'password', placeholder: "" })] }), _jsx("div", { id: 'rememberMe', children: _jsxs("div", { className: 'flex', children: [_jsx("label", { children: "Remember Me:" }), _jsx("input", { id: 'checkbox', type: 'checkbox', name: 'remember' })] }) }), _jsxs("div", { className: "fle", children: [_jsx("button", { type: "submit", children: "Login" }), _jsx("button", { type: "submit", children: "Guest Login" })] })] })] }) }));
}
export default EmailPassword;
