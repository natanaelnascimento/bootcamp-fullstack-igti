import React, { Component } from 'react';
import css from './ProgressBar.module.css';

const percentFormat = new Intl.NumberFormat('en-US', { style: "percent", maximumFractionDigits: 2 });

export default class ProgressBar extends Component {

    render() {
        let { value, color } = this.props;
        value = percentFormat.format(value);

        let style = {
            width: value,
            backgroundColor: color
        };

        return (
            <div className={css.bar} style={style}></div>
        )
    }
}
