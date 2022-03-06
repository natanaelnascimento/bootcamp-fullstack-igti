import React, { Component } from 'react';
import css from './CurrencyField.module.css';

const currencyFormat = new Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"});
const percentFormat = new Intl.NumberFormat('pt-BR', {style: "percent", maximumFractionDigits: 2});

export default class CurrencyDisplayField extends Component {
    render() {
        let {value, label, color, percentage} = this.props;
        value = currencyFormat.format(value);

        if(percentage) {
            percentage = percentFormat.format(percentage);
            value = `${value} (${percentage})`
        }

        return (
            <div className="input-field">
                <input className={css.input} id="currencyField" type="text" value={value} readOnly="readOnly" style={{color: color}}></input>
                <label htmlFor="currencyField">{label}</label>
            </div>
        )
    }
}
