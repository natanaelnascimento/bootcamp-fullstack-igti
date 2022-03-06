import accountModel from '../models/account.js';

const find = async (account, limit) => {
    if (limit)
        return await accountModel.find(account).limit(limit);
    return await accountModel.find(account);
}

const findSortingByBalanceAsc = async (account, limit) => {
    if (limit)
        return await accountModel.find(account).sort({ balance: 1 }).limit(limit);
    return await accountModel.find(account).sort({ balance: 1 });
}

const findSortingByBalanceDesc = async (account, limit) => {
    if (limit)
        return await accountModel.find(account).sort({ balance: -1, name: 1 }).limit(limit);
    return await accountModel.find(account).sort({ balance: -1 });
}

const update = async (account) => {
    const model = new accountModel(account);
    return await accountModel.findByIdAndUpdate(account._id, model, { new: true, useFindAndModify: false });
}

const remove = async (account) => {
    await accountModel.findByIdAndDelete(account._id);
}

export default { find, update, remove, findSortingByBalanceAsc, findSortingByBalanceDesc };