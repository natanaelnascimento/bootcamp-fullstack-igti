import accountsService from '../services/accounts.js';

const find = async (req, res) => {
    try {
        const account = { ...req.body, ...req.params, ...req.query };
        const accounts = await accountsService.find(account);
        res.send(accounts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const makeDeposit = async (req, res) => {
    try {
        const { agencia, conta, value } = req.body;
        const account = await accountsService.makeDeposit(agencia, conta, value);
        const { balance } = account;
        res.send({ balance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const makeWithdraw = async (req, res) => {
    try {
        const { agencia, conta, value } = req.body;
        const account = await accountsService.makeWithdraw(agencia, conta, value);
        const { balance } = account;
        res.send({ balance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const checkBalance = async (req, res) => {
    try {
        const account = { ...req.body, ...req.params, ...req.query };
        const { agencia, conta } = account;
        const balance = await accountsService.checkBalance(agencia, conta);
        res.send({ balance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const account = { ...req.body, ...req.params, ...req.query };
        const { agencia, conta } = account;
        await accountsService.remove(agencia, conta);
        const accounts = await accountsService.find({ agencia });
        const accountsCount = accounts.length;
        res.send({ accountsCount });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const makeTransfer = async (req, res) => {
    try {
        const { contaOrigem, contaDestino, value } = req.body;
        const accounts = await accountsService.makeTransfer(contaOrigem, contaDestino, value);
        const { balance } = accounts.contaOrigem;
        res.send({ balance });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const checkBalanceAverage = async (req, res) => {
    try {
        const account = { ...req.body, ...req.params, ...req.query };
        const { agencia } = account;
        const balanceAvg = await accountsService.checkBalanceAverage(agencia);
        res.send({ balanceAvg });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const checkMinBalanceAccounts = async (req, res) => {
    try {
        const query = { ...req.body, ...req.params, ...req.query };
        const { limit } = query;
        let accounts = await accountsService.checkMinBalanceAccounts(limit);
        res.send(accounts);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const checkMaxBalanceAccounts = async (req, res) => {
    try {
        const query = { ...req.body, ...req.params, ...req.query };
        const { limit } = query;
        let accounts = await accountsService.checkMaxBalanceAccounts(limit);
        res.send(accounts);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const transferPrivateAccounts = async (_, res) => {
    try {
        let accounts = await accountsService.transferPrivateAccounts();
        res.send(accounts);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


export default { find, makeDeposit, makeWithdraw, checkBalance, remove, makeTransfer, checkBalanceAverage, checkMinBalanceAccounts, checkMaxBalanceAccounts, transferPrivateAccounts };