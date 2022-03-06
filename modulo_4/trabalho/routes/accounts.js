import express from 'express';
import accountsController from '../controllers/accounts.js';

const router = express.Router();

router.get('/', accountsController.find);
router.post('/deposit', accountsController.makeDeposit);
router.post('/withdraw', accountsController.makeWithdraw);
router.get('/balance', accountsController.checkBalance);
router.delete('/', accountsController.remove);
router.post('/transfer', accountsController.makeTransfer);
router.get('/balance/avg', accountsController.checkBalanceAverage);
router.get('/min', accountsController.checkMinBalanceAccounts);
router.get('/max', accountsController.checkMaxBalanceAccounts);
router.get('/private', accountsController.transferPrivateAccounts);

export default router;