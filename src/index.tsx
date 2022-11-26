import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import {createTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import {amber, green} from '@material-ui/core/colors';


const theme= createTheme({
    palette:{
        primary: green,
        secondary: amber,
        type:'dark'

    }
})
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
    </ThemeProvider>
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

