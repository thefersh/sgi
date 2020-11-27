import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';

import 'jquery';
import 'popper.js';

import 'bootstrap/js/src/index';

var reactComponents = [
    {component: () => <div>hola</div>, tag: '#app'}
];


window.onload = () => {
    reactComponents.forEach(x => {
        if (document.querySelector(x.tag)) {
            if (document.querySelectorAll(x.tag).length == 1) {
                ReactDOM.render(<x.component></x.component>, document.querySelector(x.tag))
            }else {
                document.querySelectorAll(x.tag).forEach(y => ReactDOM.render(<x.component></x.component>, y))
            }            
        }
    });
}
