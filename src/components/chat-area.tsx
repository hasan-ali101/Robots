import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; refusal?: null };

const ChatArea = () => {
  const [newMessage, setNewMessage] = useState<Message>({
    role: "user",
    content: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [personality, setPersonality] = useState(
    "angry, sarcastic, melodramatic"
  );

  const sendMessage = async () => {
    const updatedMessages = [...messages, newMessage];
    setNewMessage({ role: "user", content: "" });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const res = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ personality, updatedMessages }),
    });
    const data = await res.json();
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6">
      <div className="h-full md:max-h-[500px] max-h-80 w-full overflow-scroll flex flex-col p-2 gap-2 resize-none">
        {messages.map((message) => {
          return (
            <div
              className={cn(
                message.role === "user"
                  ? "bg-[#89CB9D] ml-6"
                  : "bg-[#89B1CB] mr-6",
                "text-xs p-2 border rounded-lg text-white"
              )}
            >
              {message.content}
            </div>
          );
        })}
      </div>
      <div className="flex ">
        <input
          onChange={(e) => {
            const newMessage = e.currentTarget.value;
            setNewMessage({ content: newMessage, role: "user" });
          }}
          value={newMessage.content}
          type="text"
          className="w-full rounded-l-lg"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
          className="bg-black rounded-r-lg p-1 text-white "
        >
          send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
