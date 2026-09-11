const transactionService = require("./transaction.service");

async function createTransaction(req, res, next) {
  try {
    const transaction = await transactionService.createTransaction(
      req.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

async function getTransactions(req, res, next) {
  try {
    const { businessId } = req.query;

    const transactions = await transactionService.getTransactions(
      req.userId,
      businessId
    );

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
}

async function getTransaction(req, res, next) {
  try {
    const { id } = req.params;

    const transaction = await transactionService.getTransaction(
      req.userId,
      id
    );

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(req, res, next) {
  try {
    const { id } = req.params;

    const transaction = await transactionService.updateTransaction(
      req.userId,
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req, res, next) {
  try {
    const { id } = req.params;

    const result = await transactionService.deleteTransaction(
      req.userId,
      id
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};