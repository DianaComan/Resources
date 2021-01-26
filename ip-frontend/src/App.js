import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Routes from "./Routes/Routes";
import AppProvider from "./Context/provider/provider";
import 'react-toastify/dist/ReactToastify.min.css';


function App() {
    return (
        <AppProvider>
            <div className="App">
                <Routes/>
            </div>
        </AppProvider>
    );
}

export default App;
