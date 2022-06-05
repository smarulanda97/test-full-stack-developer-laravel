import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Router/>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
