const businessService = require("./business.service");

async function createBusiness(req, res, next) {
  try {
    const { name } = req.body;

    const business = await businessService.createBusiness(
      req.userId,
      name
    );

    res.status(201).json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

async function getBusinesses(req, res, next) {
  try {
    const businesses = await businessService.getBusinesses(
      req.userId
    );

    res.status(200).json({
      success: true,
      data: businesses,
    });
  } catch (error) {
    next(error);
  }
}

async function getBusiness(req, res, next) {
  try {
    const { id } = req.params;

    const business = await businessService.getBusiness(
      req.userId,
      id
    );

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBusiness(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const business = await businessService.updateBusiness(
      req.userId,
      id,
      name
    );

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteBusiness(req, res, next) {
  try {
    const { id } = req.params;

    const result = await businessService.deleteBusiness(
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
  createBusiness,
  getBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
};