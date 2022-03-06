import React, { Component } from 'react';
import CurrencyField from '../CurrencyField/CurrencyField';

import calculateValues from '../../helpers/salaryHelpers';

export default class SalaryDetails extends Component {
    render() {
        const { fullSalary } = this.props;
        const values = calculateValues(fullSalary);
        const { inssBase, inss, irpfBase, irpf, totalDiscounts, liquidSalary, percentages } = values;

        return (
            <div className="row">
                <div className="col l3 m6 s12">
                    <CurrencyField color="#000" label="Base INSS" value={inssBase} percentage={percentages.inssBase} />
                </div>
                <div className="col l3 m6 s12">
                    <CurrencyField color="#e67e22" label="Desconto INSS" value={inss} percentage={percentages.inss} />
                </div>
                <div className="col l3 m6 s12">
                    <CurrencyField color="#000" label="Base IRPF" value={irpfBase} percentage={percentages.irpfBase}/>
                </div>
                <div className="col l3 m6 s12">
                    <CurrencyField color="#c0392b" label="Desconto IRPF" value={irpf} percentage={percentages.irpf}/>
                </div>
                <div className="col l3 m6 s12">
                    <CurrencyField color="#000" label="Descontos Totais" value={totalDiscounts} percentage={percentages.totalDiscounts}/>
                </div>
                <div className="col l3 m6 s12">
                    <CurrencyField color="#16a085" label="Salário Líquido" value={liquidSalary} percentage={percentages.liquidSalary}/>
                </div>
            </div>
        )
    }
}
