const agentService = require("./agent.service");

const {
  executeCreateReceivable,
} = require("./tools/receivable.tools");

async function chat(clerkUserId, businessId, message) {
  if (!message || !message.trim()) {
    throw new Error("Message is required.");
  }

  if (!businessId) {
    throw new Error("Business ID is required.");
  }

  return agentService.processMessage(
    clerkUserId,
    businessId,
    message
  );
}

async function executeAction(
  clerkUserId,
  businessId,
  action,
  actionArguments
) {
  if (!businessId) {
    throw new Error("Business ID is required.");
  }

  if (!action) {
    throw new Error("Action is required.");
  }

  if (!actionArguments) {
    throw new Error("Action arguments are required.");
  }

  if (action === "createReceivable") {
    const receivable =
      await executeCreateReceivable(
        clerkUserId,
        businessId,
        actionArguments
      );

    return {
      type: "action_completed",
      action: "createReceivable",
      message: "Receivable created successfully.",
      data: receivable,
    };
  }

  throw new Error(
    `Unsupported AI action: ${action}`
  );
}

module.exports = {
  chat,
  executeAction,
};