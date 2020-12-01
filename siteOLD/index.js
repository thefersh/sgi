import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.scss';

import 'jquery';
import 'popper.js';

import 'bootstrap/js/src/index';

import { FormLogin } from './forms/login.form';
import { FormAdminAddProduct } from './forms/admin.add.product';
import { FormAdminSetCategoryProduct } from './forms/admin.set.category.product';


var reactComponents = [
    {component: FormLogin, tag: '[form="login"]'},
    {component: FormAdminAddProduct, tag: '[form="addProduct"]'},
    {component: FormAdminSetCategoryProduct, tag: '[form="productSetCategory"]'}
];

function getAttributeAll(DOMelement) {
    let attr = {};
    let el = DOMelement;
    for (var i = 0;i < el.attributes.length; i++){
        let att = el.attributes[i];
        attr[att.nodeName] = att.nodeValue
    }
    return attr;
}

// window.onload = () => {
    reactComponents.forEach(x => {
        if (document.querySelector(x.tag)) {
            if (document.querySelectorAll(x.tag).length == 1) {
                
                ReactDOM.render(<x.component attr={getAttributeAll(document.querySelector(x.tag))}></x.component>, document.querySelector(x.tag))
            }else {
                document.querySelectorAll(x.tag).forEach(y => ReactDOM.render(<x.component attr={getAttributeAll(y)}></x.component>, y))
            }            
        }
    });
//}