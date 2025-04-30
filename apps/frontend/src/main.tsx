import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App.tsx';
import './styles.css';
import { Auth0Provider } from '@auth0/auth0-react';
import {BrowserRouter} from "react-router-dom";

//use import.meta.env not process.env when in frontend
const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientID = import.meta.env.VITE_AUTH_CLIENT_ID

const onRedirectCallback = (appState: any) => {
    window.history.replaceState(
        {},
        document.title,
        appState?.returnTo || window.location.pathname
    );
};

// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Auth0Provider
            domain={domain}
            clientId={clientID}
            authorizationParams={{
                redirect_uri: window.location.origin + '/external-map',
            }}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </BrowserRouter>

);
