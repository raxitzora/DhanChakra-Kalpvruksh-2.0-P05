const forecastService = require("./forecast.service");

async function getForecast(req, res, next) {
  try {
    const {
      businessId,
      days,
    } = req.query;

    const forecast =
      await forecastService.getForecast(
        req.userId,
        businessId,
        days ? Number(days) : 7
      );

    res.status(200).json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getForecast,
};