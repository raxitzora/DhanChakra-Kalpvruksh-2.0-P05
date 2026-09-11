import { useAuth } from "@clerk/react";
import { useState } from "react";

import { sendAIMessage } from "../services/ai.service";

function AIChatTest() {
  const { getToken } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const businessId = localStorage.getItem("selectedBusinessId");

  async function handleSendMessage(event) {
    event.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    if (!businessId) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "error",
          content: "Please select a business first.",
        },
      ]);

      return;
    }

    const userMessage = message.trim();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await sendAIMessage(
        getToken,
        businessId,
        userMessage
      );

      const data = result.data;

      if (
        data.type === "message" ||
        data.type === "action_completed"
      ) {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            role: "assistant",
            content: data.message,
          },
        ]);
      } else if (data.type === "confirmation_required") {
        const args = data.arguments;

        const confirmationMessage = `
I understood that you want to add a receivable:

Customer: ${args.customerName}
Amount: ₹${args.amount}
Expected Date: ${args.expectedDate || "Not provided"}
Description: ${args.description || "Not provided"}

Please confirm this action.
        `.trim();

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            role: "assistant",
            content: confirmationMessage,
            action: {
              type: "confirmation_required",
              action: data.action,
              arguments: args,
            },
          },
        ]);
      }
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "error",
          content: error.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          DhanChakra AI
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Ask questions or manage your business using natural language.
        </p>
      </div>

      {/* Chat */}
      <div className="mb-4 flex min-h-[420px] flex-col rounded-xl border border-gray-200 bg-white">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="flex min-h-[360px] items-center justify-center">
              <p className="text-center text-sm text-gray-500">
                Start a conversation with DhanChakra AI.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    item.role === "user"
                      ? "max-w-[85%] rounded-lg bg-gray-900 px-4 py-2.5 text-sm leading-6 text-white sm:max-w-[70%]"
                      : item.role === "error"
                      ? "max-w-[85%] rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm leading-6 text-red-700 sm:max-w-[70%]"
                      : "max-w-[85%] rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm leading-6 text-gray-800 sm:max-w-[70%]"
                  }
                >
                  {item.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Ask DhanChakra AI..."
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default AIChatTest;