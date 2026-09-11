import { useAuth } from "@clerk/react";
import { useState } from "react";

import { sendAIMessage } from "../services/ai.service";

function AIChatTest() {
  const { getToken } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSendMessage(event) {
    event.preventDefault();

    if (!message.trim() || loading) {
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
        userMessage
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: result.data.message,
        },
      ]);
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
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        DhanChakra AI
      </h1>

      <div className="bg-white border rounded-lg p-4 min-h-[400px] mb-4">

        {messages.length === 0 && (
          <p className="text-gray-500">
            Start a conversation with DhanChakra AI.
          </p>
        )}

        <div className="space-y-4">

          {messages.map((item, index) => (
            <div
              key={index}
              className={
                item.role === "user"
                  ? "text-right"
                  : "text-left"
              }
            >
              <div
                className={
                  item.role === "user"
                    ? "inline-block bg-black text-white px-4 py-2 rounded-lg"
                    : item.role === "error"
                    ? "inline-block bg-red-100 text-red-700 px-4 py-2 rounded-lg"
                    : "inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-lg"
                }
              >
                {item.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                Thinking...
              </div>
            </div>
          )}

        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex gap-3"
      >

        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Ask DhanChakra AI..."
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
        >
          Send
        </button>

      </form>

    </div>
  );
}

export default AIChatTest;