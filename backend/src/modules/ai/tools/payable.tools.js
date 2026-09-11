const { Type } = require("@google/genai");

const payableService = require("../../payables/payable.service");

const createPayableTool = {
  name: "createPayable",
  description:
    "Creates a new pending payable for the authenticated user's business. Use this when the user wants to record money that the business owes to a supplier or another party.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      supplierName: {
        type: Type.STRING,
        description:
          "The name of the supplier or person the business owes money to.",
      },
      amount: {
        type: Type.NUMBER,
        description:
          "The payable amount in Indian rupees. Example: 5000 means ₹5,000.",
      },
      dueDate: {
        type: Type.STRING,
        description:
          "The date by which the payment is due. This is required. Use YYYY-MM-DD format.",
      },
      description: {
        type: Type.STRING,
        description:
          "Optional description or note about the payable.",
      },
    },
    required: ["supplierName", "amount", "dueDate"],
  },
};

async function executeCreatePayable(clerkUserId, businessId, args) {
  const amountPaise = Math.round(Number(args.amount) * 100);

  const payableData = {
    businessId,
    supplierName: args.supplierName,
    amountPaise,
    dueDate: args.dueDate,
    description: args.description || null,
    status: "PENDING",
  };

  const payable = await payableService.createPayable(
    clerkUserId,
    payableData
  );

  return payable;
}

module.exports = {
  createPayableTool,
  executeCreatePayable,
};