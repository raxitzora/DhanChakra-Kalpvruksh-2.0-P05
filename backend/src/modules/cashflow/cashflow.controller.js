const cashflowService = require("./cashflow.service");

async function getCashflow(req, res, next) {
  try {
    const { businessId } = req.query;

    const cashflow =
      await cashflowService.getCashflow(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: cashflow,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCashflow,
};