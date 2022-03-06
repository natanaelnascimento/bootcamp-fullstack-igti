import React, {useState} from 'react';

export default function Form({onFormChange}) {

    const [initialValue, setInitialValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [installmentsCount, setInstallmentsCount] = useState('');

    const handleFormChange = (initialValue, interestRate, installmentsCount) => {
        setInitialValue(initialValue);
        setInterestRate(interestRate);
        setInstallmentsCount(installmentsCount);

        onFormChange({
            initialValue,
            interestRate,
            installmentsCount
        });
    }

    const handleInitialValueChange = (event) => {
        handleFormChange(event.target.value, interestRate, installmentsCount);
    }

    const handleInterestRateChange = (event) => {
        handleFormChange(initialValue, event.target.value, installmentsCount);
    }

    const handleInstallmentsCountChange = (event) => {
        handleFormChange(initialValue, interestRate, event.target.value);
    }

    return (
        <div className="row">
            <div className="input-field col s12 m4 l4">
                <input autoFocus value={initialValue} onChange={handleInitialValueChange} id="initialValue" type="number" min="0" step="1"></input>
                <label htmlFor="initialValue">Valor Inicial</label>
            </div>
            <div className="input-field col s12 m4 l4">
                <input value={interestRate} onChange={handleInterestRateChange} id="interestRate" type="number" step="0.1"></input>
                <label htmlFor="interestRate">Taxa de Juros</label>
            </div>
            <div className="input-field col s12 m4 l4">
                <input value={installmentsCount} onChange={handleInstallmentsCountChange} id="installmentsCount" type="number" min="0" step="1"></input>
                <label htmlFor="installmentsCount">Número de Parcelas</label>
            </div>
        </div>
    )
}
