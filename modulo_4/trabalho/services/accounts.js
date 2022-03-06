import accountsRepository from '../repositories/accounts.js';

const find = async (account) => {
    return await accountsRepository.find(account);
}

const makeDeposit = async (agencia, conta, value) => {
    if (!agencia) throw new Error("A agência deve ser informada!");
    if (!conta) throw new Error("A conta deve ser informada!");
    if (!value) throw new Error("O valor deve ser informado!");
    if (value <= 0) throw new Error("O valor do depósito deve ser maior que 0!");

    const accountsFound = await accountsRepository.find({ agencia, conta });
    if (accountsFound.length == 0) throw new Error("Conta não encontrada!");
    const account = accountsFound[0];
    account.balance = account.balance + value;
    return await accountsRepository.update(account);
}

const makeWithdraw = async (agencia, conta, value) => {
    if (!agencia) throw new Error("A agência deve ser informada!");
    if (!conta) throw new Error("A conta deve ser informada!");
    if (!value) throw new Error("O valor deve ser informado!");
    if (value <= 0) throw new Error("O valor do saque deve ser maior que 0!");

    const accountsFound = await accountsRepository.find({ agencia, conta });
    if (accountsFound.length == 0) throw new Error("Conta não encontrada!");
    const account = accountsFound[0];
    account.balance = account.balance - value;
    account.balance = account.balance - 1;
    if (accountsFound.length < 0) throw new Error("Saldo insuficiente!");
    return await accountsRepository.update(account);
}

const checkBalance = async (agencia, conta) => {
    if (!agencia) throw new Error("A agência deve ser informada!");
    if (!conta) throw new Error("A conta deve ser informada!");

    const accountsFound = await accountsRepository.find({ agencia, conta });
    if (accountsFound.length == 0) throw new Error("Conta não encontrada!");
    const account = accountsFound[0];
    return account.balance;
}

const remove = async (agencia, conta) => {
    if (!agencia) throw new Error("A agência deve ser informada!");
    if (!conta) throw new Error("A conta deve ser informada!");

    const accountsFound = await accountsRepository.find({ agencia, conta });
    if (accountsFound.length == 0) throw new Error("Conta não encontrada!");
    const account = accountsFound[0];
    await accountsRepository.remove(account);
    return account;
}

const makeTransfer = async (nuContaOrigem, nuContaDestino, value) => {
    if (!nuContaOrigem) throw new Error("A conta de origem deve ser informada!");
    if (!nuContaDestino) throw new Error("A conta de destino deve ser informada!");
    if (!value) throw new Error("O valor deve ser informado!");
    if (value <= 0) throw new Error("O valor da transferência deve ser maior que 0!");

    const contasOrigem = await accountsRepository.find({ conta: nuContaOrigem });
    if (contasOrigem.length == 0) throw new Error("Conta origem não encontrada!");
    const contaOrigem = contasOrigem[0];

    const contasDestino = await accountsRepository.find({ conta: nuContaDestino });
    if (contasDestino.length == 0) throw new Error("Conta destino não encontrada!");
    const contaDestino = contasDestino[0];

    contaOrigem.balance = contaOrigem.balance - value;
    contaDestino.balance = contaDestino.balance + value;

    if (contaOrigem.agencia != contaDestino.agencia)
        contaOrigem.balance = contaOrigem.balance - 8;
    if (contaOrigem.balance < 0) throw new Error("Saldo insuficiente na conta origem!");

    await accountsRepository.update(contaOrigem);
    await accountsRepository.update(contaDestino);

    return { contaOrigem, contaDestino };
}

const checkBalanceAverage = async (agencia) => {
    if (!agencia) throw new Error("A agência deve ser informada!");
    const accountsFound = await accountsRepository.find({ agencia });
    if (accountsFound.length == 0) throw new Error("Nenhuma conta encontrada!");

    const totalBalance = accountsFound.reduce((sum, current) => sum + current.balance, 0);
    const balanceAverage = totalBalance / accountsFound.length;
    return balanceAverage;
}

const checkMinBalanceAccounts = async (limit) => {
    const accountsFound = await accountsRepository.findSortingByBalanceAsc({}, limit);
    if (accountsFound.length == 0) throw new Error("Nenhuma conta encontrada!");
    return accountsFound;
}

const checkMaxBalanceAccounts = async (limit) => {
    const accountsFound = await accountsRepository.findSortingByBalanceDesc({}, limit);
    if (accountsFound.length == 0) throw new Error("Nenhuma conta encontrada!");
    return accountsFound;
}

const transferPrivateAccounts = async () => {
    const accountsFound = await accountsRepository.find({});
    if (accountsFound.length == 0) throw new Error("Nenhuma conta encontrada!");

    const agenciasList = accountsFound.map(account => account.agencia)
        .filter((agencia, index, self) => self.indexOf(agencia) === index) && agencia != 99;

    const originalMaxBalanceAccountsList = await Promise.all(agenciasList.map(agencia => {
        return new Promise(async (resolve, reject) => {
            try {
                const accountsFound = await accountsRepository.findSortingByBalanceDesc({ agencia }, 1);
                const originalMaxBalanceAccount = accountsFound[0];
                const privateAccount = JSON.parse(JSON.stringify(originalMaxBalanceAccount));
                privateAccount.agencia = 99;
                await accountsRepository.update(privateAccount);
                resolve(originalMaxBalanceAccount);
            } catch (error) {
                reject(error);
            }
        });
    }));

    return originalMaxBalanceAccountsList;
}

export default { find, makeDeposit, makeWithdraw, checkBalance, remove, makeTransfer, checkBalanceAverage, checkMinBalanceAccounts, checkMaxBalanceAccounts, transferPrivateAccounts };