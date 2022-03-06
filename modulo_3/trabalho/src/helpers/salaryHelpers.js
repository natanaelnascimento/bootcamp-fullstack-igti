import aliquotas from './aliquotas.json';

const inssAliquotas = aliquotas.inss;
const irpfAliquotas = aliquotas.irpf;

function findAliquota(aliquotasList, salary) {
    return aliquotasList.find(a => {
        return (!a.salaryInterval.from || salary >= a.salaryInterval.from)
            && (!a.salaryInterval.to || salary <= a.salaryInterval.to);
    });
}

function calculateInss(fullSalary) {
    if (!findAliquota(inssAliquotas.aliquotas, fullSalary))
        return inssAliquotas.maxDiscount;

    let value = inssAliquotas.aliquotas
        .filter(a => (!a.salaryInterval.from || fullSalary >= a.salaryInterval.from))
        .reduce((sum, a) => {
            let minValue = a.salaryInterval.from ? a.salaryInterval.from : 0;
            let maxValue = a.salaryInterval.to && a.salaryInterval.to < fullSalary ? a.salaryInterval.to : fullSalary;
            return sum + (maxValue - minValue) * a.percentage;
        }, 0);

    return value;
}

function calculateIrpf(baseSalary) {
    let aliquota = findAliquota(irpfAliquotas.aliquotas, baseSalary);
    let value = baseSalary * aliquota.percentage - aliquota.deduction;
    return value > 0 ? value : 0;
}

function calculatePercentages(values) {
    let fullSalary = values.fullSalary / values.fullSalary;
    let inssBase = values.inssBase / values.fullSalary;
    let inss = values.inss / values.fullSalary;
    let irpfBase = values.irpfBase / values.fullSalary;
    let irpf = values.irpf / values.fullSalary;
    let totalDiscounts = values.totalDiscounts / values.fullSalary;
    let liquidSalary = values.liquidSalary / values.fullSalary;
    return { fullSalary, inssBase, inss, irpfBase, irpf, totalDiscounts, liquidSalary }
}

function calculateValues(fullSalary) {
    if(!fullSalary || fullSalary === '') fullSalary = 0;
    let inssBase = fullSalary;
    let inss = calculateInss(inssBase);
    let irpfBase = fullSalary - inss;
    let irpf = calculateIrpf(irpfBase);
    let totalDiscounts = inss + irpf;
    let liquidSalary = fullSalary - inss - irpf;
    let values = { fullSalary, inssBase, inss, irpfBase, irpf, totalDiscounts, liquidSalary };
    let percentages = calculatePercentages(values);
    values.percentages = percentages;
    return values;
}

export default calculateValues;