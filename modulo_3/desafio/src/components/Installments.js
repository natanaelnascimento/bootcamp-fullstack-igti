import React from 'react';
import Installment from './Installment';
import generateInstallments from '../helpers/installmentsHelpers';

export default function Installments({ formData }) {
    if (!formData) return null;
    const { initialValue, interestRate, installmentsCount } = formData;

    if (!initialValue || !interestRate || !installmentsCount) return null;
    const installmentsList = generateInstallments(+initialValue, +interestRate, +installmentsCount);

    return (
        <div className="row">
            {installmentsList.map(installment => (
                <div className="col s12 m6 l4">
                    <Installment installment={installment} />
                </div>
            ))}
        </div>
    )
}
