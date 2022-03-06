function generateInstallment(initialValue, currentValue, interestRate) {
    const interestValue = Math.abs(currentValue) * (interestRate / 100);
    const value = currentValue + interestValue;
    const interestPercentage = initialValue !== 0 ? (value - initialValue) / Math.abs(initialValue) : 0;
    const interestAmmount = value - initialValue;
    return {
        value,
        interestValue,
        interestAmmount,
        interestPercentage
    }
}

function generateInstallments(initialValue, interestRate, installmentsCount = 1) {
    const installmentsList = [];
    let currentValue = initialValue;
    for(let i = 0; i < installmentsCount; i++) {
        const installment = generateInstallment(initialValue, currentValue, interestRate);
        installment.seq = i + 1;
        currentValue = installment.value;
        installmentsList.push(installment);
    }
    return installmentsList;
}

export default generateInstallments;