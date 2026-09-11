const { Type } = require("@google/genai");

const cashflowService = require("../../cashflow/cashflow.service");

const getCashPositionTool = {
  name: "getCashPosition",
  description:
    "Gets the authenticated user's current cash position for the selected business. Use this when the user asks how much cash they have, how much money is available right now, their current cash position, or similar questions.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

async function executeGetCashPosition(clerkUserId, businessId) {
  const cashflow = await cashflowService.getCashflow(
    clerkUserId,
    businessId
  );

  return {
    availableCash: cashflow.availableCash,
    pendingIncoming: cashflow.pendingIncoming,
    upcomingOutflows: cashflow.upcomingOutflows,
    netCashPosition: cashflow.netCashPosition,
  };
}

module.exports = {
  getCashPositionTool,
  executeGetCashPosition,
};