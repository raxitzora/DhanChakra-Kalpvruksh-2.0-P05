const alertService = require("./alert.service");

async function getRiskAnalysis(req, res, next) {
  try {
    const { businessId } = req.query;

    const riskAnalysis =
      await alertService.getRiskAnalysis(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: riskAnalysis,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRiskAnalysis,
};