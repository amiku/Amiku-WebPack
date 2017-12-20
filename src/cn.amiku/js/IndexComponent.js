/*
 * Copyright (c) http://amiku.cn 2017-2018.
 * Author: Amiku Zhang <i@amiku.cn>
 */

import React, {Component} from 'react';
import IndexComponentStyle from '../scss/IndexComponent.scss';

export default class IndexComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let img = require('../img/img-js-import.gif');
        return (
            <div className={IndexComponentStyle.content}>
                <h1 className={IndexComponentStyle.header}>WebPack Basic Usage Example（WebPack基本脚手架功能）</h1>
                <div className={IndexComponentStyle.imgWrap}>
                    <img src={img}/>
                </div>
            </div>
        );
    }
}
