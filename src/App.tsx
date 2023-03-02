import React from 'react';

import {Routes, Route, Navigate} from 'react-router-dom';

import './App.css';

import {Header} from './Components/Header/Header';
import {Error404} from "./Components/Error404/Error404";
import {ComponentsContainer} from "./Components/ComponentsContainer/ComponentsContainer";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/app'}/>}/>
                <Route path={'/app'} element={<ComponentsContainer/>}/>
                <Route path={'/error'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/error'}/>}/>
            </Routes>
        </div>
    );
}


