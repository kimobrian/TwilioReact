import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
var Video = require("twilio-video");
import "./styles/styles.css";
import VideoComponent from "./VideoComponent";

let dom = document.getElementById("app");
render(
    <BrowserRouter>
        <div>
            <VideoComponent />
        </div>
    </BrowserRouter>,
    dom
);
