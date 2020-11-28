import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.scss';

import 'jquery';
import 'popper.js';

import 'bootstrap/js/src/index';

import { FormLogin } from './forms/login.form';

var reactComponents = [
    {component: FormLogin, tag: '[form="login"]'}
];


// window.onload = () => {
    reactComponents.forEach(x => {
        if (document.querySelector(x.tag)) {
            if (document.querySelectorAll(x.tag).length == 1) {
                ReactDOM.render(<x.component></x.component>, document.querySelector(x.tag))
            }else {
                document.querySelectorAll(x.tag).forEach(y => ReactDOM.render(<x.component></x.component>, y))
            }            
        }
    });
//}