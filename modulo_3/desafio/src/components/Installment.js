import React from 'react';

const currencyFormat = new Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"});
const percentFormat = new Intl.NumberFormat('pt-BR', {style: "percent", maximumFractionDigits: 2});

export default function Installment({installment}) {

    const {seq, value, interestAmmount, interestPercentage} = installment;

    let formattedValue = currencyFormat.format(value);
    let formattedInterestAmmount = currencyFormat.format(interestAmmount);
    let formattedInterestPercentage = percentFormat.format(interestPercentage);

    if(interestAmmount > 0)
        formattedInterestAmmount = "+" + formattedInterestAmmount;

    let valueClass = interestAmmount > 0 ? STYLES.positiveValue : interestAmmount < 0 ? STYLES.negativeValue : {};
    let percentageClass = interestPercentage > 0 ? STYLES.positivePercentage : interestPercentage < 0 ? STYLES.negativePercentage : {};

    return (
        <div style={STYLES.installmentContainer} className="card horizontal">
            <span style={STYLES.installmentSeq}>{seq}</span>
            <ul>
                <li style={{...STYLES.installmentInfo, ...valueClass}}>{formattedValue}</li>
                <li style={{...STYLES.installmentInfo, ...valueClass}}>{formattedInterestAmmount}</li>
                <li style={{...STYLES.installmentInfo, ...percentageClass}}>{formattedInterestPercentage}</li>
            </ul>
        </div>
    )
}

const STYLES = {
    installmentContainer: {
        display: "flex",
        flexDirexction: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "-10px",
        paddingBottom: "-10px",
        borderRadius: "5px"
    },
    installmentInfo: {
        textAlign: "right"
    },
    installmentSeq: {
        fontWeight: "bold"
    },
    positiveValue: {
        color: "#4CAF50"
    },
    negativeValue: {
        color: "#F44336"
    },
    positivePercentage: {
        color: "#2196F3"
    },
    negativePercentage: {
        color: "#FF5722"
    }
}