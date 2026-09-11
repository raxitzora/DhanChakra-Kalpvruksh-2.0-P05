const { GoogleGenAI } = require("@google/genai");

const {
  createReceivableTool,
  executeCreateReceivable,
} = require("./tools/receivable.tools");

const {
  createPayableTool,
  executeCreatePayable,
} = require("./tools/payable.tools");

const {
  getCashPositionTool,
  executeGetCashPosition,
} = require("./tools/cashflow.tools");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.5-flash";

const systemInstruction = `
You are DhanChakra AI, an intelligent business assistant for small business owners.

You can understand natural language requests and perform actions using the
available business tools.

Important rules:

1. Execute clear user requests directly using the appropriate action tool.
2. Do not ask for confirmation when the user has clearly requested an action.
3. Never invent financial data.
4. Never access the database directly.
5. Always use the provided tools for business data and financial actions.
6. Never calculate financial truth yourself when a business tool is available.
7. Use the result returned by the business tool as the source of truth.
8. Never guess missing required information.
9. If required information is missing, ask the user for that information.
10. Amounts provided by the user are in Indian rupees.
11. Convert dates into YYYY-MM-DD format when possible.
12. For newly created receivables and payables, use the appropriate pending status.
13. After successfully executing an action, clearly tell the user what was done.
14. When answering financial questions, clearly explain the relevant numbers returned
    by the business tools.
15. If an action or business-data request fails, clearly explain that it could not
    be completed.
16. Never expose internal tool names, database details, or implementation details.
17. Keep responses concise and natural.

Available capabilities:

- Create a receivable when a customer owes the business money.
- Create a payable when the business owes money to a supplier or another party.
- Get the current cash position of the business.

For cash-position questions:

- Use getCashPosition.
- Do not calculate the cash position yourself.
- Explain the returned values in simple language.
`;

async function processMessage(clerkUserId, businessId, message) {
  if (!message || !message.trim()) {
    throw new Error("Message is required.");
  }

  if (!businessId) {
    throw new Error("Business ID is required.");
  }

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];

  const config = {
    systemInstruction,
    tools: [
      {
        functionDeclarations: [
          createReceivableTool,
          createPayableTool,
          getCashPositionTool,
        ],
      },
    ],
  };

  const response = await ai.models.generateContent({
    model: MODEL,
    contents,
    config,
  });

  const functionCalls = response.functionCalls || [];

  if (functionCalls.length === 0) {
    return {
      type: "message",
      message: response.text,
    };
  }

  const functionCall = functionCalls[0];

  let functionResult;
  let action;

  if (functionCall.name === "createReceivable") {
    action = "createReceivable";

    functionResult = await executeCreateReceivable(
      clerkUserId,
      businessId,
      functionCall.args
    );
  } else if (functionCall.name === "createPayable") {
    action = "createPayable";

    functionResult = await executeCreatePayable(
      clerkUserId,
      businessId,
      functionCall.args
    );
  } else if (functionCall.name === "getCashPosition") {
    action = "getCashPosition";

    functionResult = await executeGetCashPosition(
      clerkUserId,
      businessId
    );
  } else {
    throw new Error(
      `Unsupported AI function: ${functionCall.name}`
    );
  }

  contents.push(response.candidates[0].content);

  contents.push({
    role: "user",
    parts: [
      {
        functionResponse: {
          name: functionCall.name,
          response: {
            result: functionResult,
          },
          ...(functionCall.id ? { id: functionCall.id } : {}),
        },
      },
    ],
  });

  const finalResponse = await ai.models.generateContent({
    model: MODEL,
    contents,
    config,
  });

  if (action === "getCashPosition") {
    return {
      type: "message",
      message: finalResponse.text,
      data: functionResult,
    };
  }

  return {
    type: "action_completed",
    action,
    message: finalResponse.text,
    data: functionResult,
  };
}

module.exports = {
  processMessage,
};