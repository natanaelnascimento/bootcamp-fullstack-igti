import React, { Component } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import css from './SalaryBars.module.css';

import calculateValues from '../../helpers/salaryHelpers';

export default class SalaryBars extends Component {
    render() {
        const { fullSalary } = this.props;
        const values = calculateValues(fullSalary);
        let { inss, irpf, liquidSalary } = values.percentages;

        if (!inss && !irpf && !liquidSalary) {
            inss = 1 / 3;
            irpf = 1 / 3;
            liquidSalary = 1 / 3;
        }

        return (
            <div className="row">
                <div className={`${css.barsContainer} col l12 m12 s12`}>
                    <ProgressBar color="#e67e22" value={inss} />
                    <ProgressBar color="#c0392b" value={irpf} />
                    <ProgressBar color="#16a085" value={liquidSalary} />
                </div>
            </div>
        )
    }
}