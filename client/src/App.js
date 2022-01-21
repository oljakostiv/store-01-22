import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes";
import NavBar from "./components/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
