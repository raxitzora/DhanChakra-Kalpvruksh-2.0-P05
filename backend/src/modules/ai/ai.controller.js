const aiService = require("./ai.service");

async function chat(req, res, next) {
  try {
    const { message, businessId } = req.body;

    const result = await aiService.chat(
      req.userId,
      businessId,
      message
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function execute(req, res, next) {
  try {
    const { action, arguments: actionArguments } = req.body;

    const result = await aiService.executeAction(
      req.userId,
      actionArguments.businessId,
      action,
      actionArguments
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
  chat,
  execute,
};