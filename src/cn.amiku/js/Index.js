/*
 * Copyright (c) http://amiku.cn 2017-2018.
 * Author: Amiku Zhang <i@amiku.cn>
 */

import React from 'react';
import {render} from 'react-dom';
import IndexStyle from '../scss/Index.scss';
import IndexComponent from './IndexComponent';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
}

const indexComponent = document.createElement("div");
indexComponent.id = "indexComponent";
document.body.appendChild(indexComponent);

render(<IndexComponent/>, document.getElementById('indexComponent'));


