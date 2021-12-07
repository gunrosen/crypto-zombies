import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import MainScreen from './screen/MainScreen';

export const getLibrary = (provider: any): Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider, 'any');
    library.pollingInterval = 10000;
    return library;
};

const App: React.FC = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <MainScreen />
        </Web3ReactProvider>
    );
};

export default App;
