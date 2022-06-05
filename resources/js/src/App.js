import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./routes/Router";

function App() {
    return (
        <Router/>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
