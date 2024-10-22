import { cn } from "@/utils/cn";
import { ArrowUp, Send } from "lucide-react";
import { useEffect, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; refusal?: null };

const ChatArea = ({ hidden }: { hidden: boolean }) => {
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

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    messageContainer?.scrollTo(0, messageContainer.scrollHeight);
  }, [messages]);

  return (
    <div
      className={
        "bg-[#e5c7c5] md:p-8 w-full max-h-[670px] max-w-[800px] h-full  border flex flex-col justify-between"
      }
    >
      <div
        id="message-container"
        className={cn(
          hidden ? "hidden" : "flex",
          "scroll-smooth w-full md:flex overflow-scroll flex-col p-2 gap-2 resize-none"
        )}
      >
        {messages.map((message) => {
          console.log(message);
          return (
            <div
              className={cn(
                message.role === "user" ? "justify-start" : "justify-end",
                "w-full flex"
              )}
            >
              <div
                className={cn(
                  message.role === "user"
                    ? "bg-[#89B1CB] mr-10"
                    : "bg-[#89CB9D] ml-10",
                  "text-sm lg:text-base p-4 border w-fit rounded-2xl text-white"
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={cn(
          hidden ? "mt-2" : "mt-0",
          "flex justify-center relative mb-6 md:mb-0"
        )}
      >
        <input
          onChange={(e) => {
            const newMessage = e.currentTarget.value;
            setNewMessage({ content: newMessage, role: "user" });
          }}
          value={newMessage.content}
          type="text"
          className={cn(
            hidden ? "rounded-none" : "rounded-full",
            "w-full pl-4 pr-14 h-12 md:rounded-full"
          )}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              newMessage.content && sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            newMessage.content && sendMessage();
          }}
          className={cn(
            newMessage.content
              ? "bg-[#b0cbdd] cursor-pointer"
              : "bg-slate-200 cursor-default",
            "absolute right-4 top-2 rounded-full p-2 text-white"
          )}
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
