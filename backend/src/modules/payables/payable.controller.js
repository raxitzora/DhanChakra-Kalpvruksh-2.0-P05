const payableService = require("./payable.service");

async function createPayable(req, res, next) {
  try {
    const payable =
      await payableService.createPayable(
        req.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: payable,
    });
  } catch (error) {
    next(error);
  }
}

async function getPayables(req, res, next) {
  try {
    const { businessId } = req.query;

    const payables =
      await payableService.getPayables(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: payables,
    });
  } catch (error) {
    next(error);
  }
}

async function getPayable(req, res, next) {
  try {
    const { id } = req.params;

    const payable =
      await payableService.getPayable(
        req.userId,
        id
      );

    res.status(200).json({
      success: true,
      data: payable,
    });
  } catch (error) {
    next(error);
  }
}

async function updatePayable(req, res, next) {
  try {
    const { id } = req.params;

    const payable =
      await payableService.updatePayable(
        req.userId,
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: payable,
    });
  } catch (error) {
    next(error);
  }
}

async function deletePayable(req, res, next) {
  try {
    const { id } = req.params;

    const result =
      await payableService.deletePayable(
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
  createPayable,
  getPayables,
  getPayable,
  updatePayable,
  deletePayable,
};