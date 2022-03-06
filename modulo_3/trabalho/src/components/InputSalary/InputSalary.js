import React, { Component } from 'react';

export default class InputSalary extends Component {

    handleValueChange = (event) => {
        const value = event.target.value;
        this.props.onSalaryChange(value);
    }

    render() {
        const {value, label} = this.props;
        return (
            <div className="row">
                <div className="input-field col l12 m12 s12">
                    <input autoFocus id="inputSalary" type="number" defaultValue={value} min="0" onInput={this.handleValueChange}></input>
                    <label htmlFor="inputSalary">{label}</label>
                </div>
            </div>
        )
    }
}