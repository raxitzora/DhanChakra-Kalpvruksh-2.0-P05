const { Type } = require("@google/genai");

const receivableService = require("../../receivables/receivable.service");

const createReceivableTool = {
  name: "createReceivable",
  description:
    "Creates a new pending receivable for the authenticated user's business. Use this when the user wants to record money that a customer owes the business.",

  parameters: {
    type: Type.OBJECT,

    properties: {
      customerName: {
        type: Type.STRING,
        description:
          "The name of the customer who owes money.",
      },

      amount: {
        type: Type.NUMBER,
        description:
          "The receivable amount in Indian rupees. Example: 5000 means ₹5,000.",
      },

      expectedDate: {
        type: Type.STRING,
        description:
          "The expected payment date in YYYY-MM-DD format.",
      },

      description: {
        type: Type.STRING,
        description:
          "Optional description or note about the receivable.",
      },
    },

    required: [
      "customerName",
      "amount",
    ],
  },
};

async function executeCreateReceivable(
  clerkUserId,
  businessId,
  args
) {
  const amountPaise = Math.round(
    Number(args.amount) * 100
  );

  const receivableData = {
    businessId,
    customerName: args.customerName,
    amountPaise,
    expectedDate: args.expectedDate || null,
    description: args.description || null,
    status: "PENDING",
  };

  const receivable =
    await receivableService.createReceivable(
      clerkUserId,
      receivableData
    );

  return receivable;
}

module.exports = {
  createReceivableTool,
  executeCreateReceivable,
};