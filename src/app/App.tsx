import React from 'react';
import './App.css';
import Header from "../common/components/layout/Header";
import AppRoutes from "./Routes";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="routes"><AppRoutes/></div>
        </div>
    );
}

export default App;
