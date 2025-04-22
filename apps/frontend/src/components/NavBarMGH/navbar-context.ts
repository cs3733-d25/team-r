import React from "react";

export const navUser = {
    Guest: {
        userType: 'guest'
    },
    Patient: {
        userType: 'patient'
    },
    Admin: {
        userType: 'admin'
    }
}

export const NavbarContext = React.createContext(
    navUser.Guest
);