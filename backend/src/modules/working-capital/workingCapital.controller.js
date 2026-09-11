const workingCapitalService = require("./workingCapital.service");

async function getWorkingCapital(req, res, next) {
  try {
    const { businessId } = req.query;

    const workingCapital =
      await workingCapitalService.getWorkingCapital(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: workingCapital,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWorkingCapital,
};