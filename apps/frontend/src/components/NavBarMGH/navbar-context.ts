import React from "react";

export const navUser = {
    Guest: {
        userType: 'Guest'
    },
    Patient: {
        userType: 'Patient'
    },
    Admin: {
        userType: 'Admin'
    }
}

export const NavbarContext = React.createContext(
    navUser.Guest
);