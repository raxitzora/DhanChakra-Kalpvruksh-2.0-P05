const dashboardService = require("./dashboard.service");

async function getDashboard(req, res, next) {
  try {
    const { businessId } = req.query;

    const dashboard =
      await dashboardService.getDashboard(
        req.userId,
        businessId
      );

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboard,
};