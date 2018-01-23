import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/styles.css";
import VideoComponent from "./VideoComponent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

let dom = document.getElementById("app");
render(
    <MuiThemeProvider>
        <BrowserRouter>
            <div>
                <VideoComponent />
            </div>
        </BrowserRouter>
    </MuiThemeProvider>
    ,
    dom
);
