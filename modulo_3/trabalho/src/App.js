import React, { Component } from 'react';
import Header from './components/Header/Header';
import InputSalary from './components/InputSalary/InputSalary';
import SalaryDetails from './components/SalaryDetails/SalaryDetails';
import SalaryBars from './components/SalaryBars/SalaryBars';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      fullSalary: ''
    }
  }

  handleSalaryChange = (value) => {
    this.setState({
      fullSalary: value
    });
  };

  render() {
    const {fullSalary} = this.state;
    return (
      <div className="container">
          <Header />
          <InputSalary value={fullSalary} label="Salário bruto" onSalaryChange={this.handleSalaryChange} />
          <SalaryDetails fullSalary={fullSalary} />
          <SalaryBars fullSalary={fullSalary} />
      </div>
    );
  }
}
