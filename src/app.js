
import { join } from 'lodash';
import $ from 'jquery';

import './app.less';
import "./app2.css";

console.log(join(['a', 'b', 'c']));

$.get(
    "/user/lastOrder",
    {
        id: '4263554020904293',
        mid: '4263554020904293',
        max_id_type: '0'
    },
    function (data) {
        console.log(data)
    }
);

