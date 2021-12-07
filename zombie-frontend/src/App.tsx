import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Web3ReactProvider} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';
import {ethers} from 'ethers';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from './screen/MainScreen';
import MyAccount from './screen/MyAccount';
import Marketplace from './screen/Marketplace';

export const getLibrary = (provider: any): Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider, 'any');
    library.pollingInterval = 10000;
    return library;
};

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Routes>
                    <Route path="/my-account" element={<MyAccount />}/>
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/" element={<MainScreen />} />
                </Routes>
            </BrowserRouter>
        </Web3ReactProvider>
    );
};

export default App;
