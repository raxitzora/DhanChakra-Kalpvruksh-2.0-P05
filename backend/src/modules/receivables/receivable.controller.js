const receivableService = require("./receivable.service");

async function createReceivable(req, res, next) {
  try {
    const receivable =
      await receivableService.createReceivable(
        req.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: receivable,
    });
  } catch (error) {
    next(error);
  }
}

async function getReceivables(req, res, next) {
  try {
    const { businessId } = req.query;

    const receivables =
      await receivableService.getReceivables(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: receivables,
    });
  } catch (error) {
    next(error);
  }
}

async function getReceivable(req, res, next) {
  try {
    const { id } = req.params;

    const receivable =
      await receivableService.getReceivable(
        req.userId,
        id
      );

    res.status(200).json({
      success: true,
      data: receivable,
    });
  } catch (error) {
    next(error);
  }
}

async function updateReceivable(req, res, next) {
  try {
    const { id } = req.params;

    const receivable =
      await receivableService.updateReceivable(
        req.userId,
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: receivable,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReceivable(req, res, next) {
  try {
    const { id } = req.params;

    const result =
      await receivableService.deleteReceivable(
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
  createReceivable,
  getReceivables,
  getReceivable,
  updateReceivable,
  deleteReceivable,
};