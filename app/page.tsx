"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import {
  VercelIcon,
  GithubIcon,
  LoadingCircle,
  SendIcon,
  UserIcon,
} from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "What is a stock? 📈",
  "What is risk? ⚠️",
  "What type of stocks should I buy? 🤔",
  "What should I be careful about? 🛡️",
  "Tell me about Apple! 🍎",
  "How do I start investing? 🚀",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("Oops! You've asked too many questions today. Come back tomorrow! 🌟");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
        {/* Header space for future additions */}
      </div>
      
      {messages.length > 0 ? (
        <div className="w-full max-w-4xl">
          {messages.map((message, i) => (
            <div
              key={i}
              className={clsx(
                "flex w-full items-center justify-center py-6 px-4",
                message.role === "user" 
                  ? "bg-gradient-to-r from-blue-100 to-purple-100" 
                  : "bg-gradient-to-r from-yellow-50 to-orange-50",
                "border-b-2 border-purple-200"
              )}
            >
              <div className="flex w-full max-w-screen-md items-start space-x-4">
                <div
                  className={clsx(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg",
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-white"
                      : "bg-gradient-to-br from-blue-500 to-purple-500 text-white",
                  )}
                >
                  {message.role === "user" ? "👤" : "🤖"}
                </div>
                <div className="prose prose-lg prose-p:leading-relaxed mt-1 w-full break-words">
                  <div className="text-lg leading-relaxed text-gray-800 font-medium">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-5 mt-20 max-w-screen-md rounded-3xl border-4 border-purple-200 bg-white shadow-2xl sm:w-full overflow-hidden">
          <div className="flex flex-col space-y-6 p-8 sm:p-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                🤖
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Hi there, young investor! 👋
                </h1>
                <p className="text-xl text-blue-100">
                  I'm your friendly stock market buddy! Ask me anything about investing! 💰
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 bg-gradient-to-br from-yellow-50 to-orange-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Try asking me about... 🌟
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {examples.map((example, i) => (
                <button
                  key={i}
                  className="group relative rounded-2xl border-3 border-purple-300 bg-white px-6 py-4 text-left text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-purple-500 hover:bg-purple-50 hover:scale-105 hover:shadow-lg active:scale-95 transform"
                  onClick={() => {
                    setInput(example);
                    inputRef.current?.focus();
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{example.split(' ').pop()}</span>
                    <span>{example.replace(/\s*[^\s]*$/, '')}</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-4 bg-gradient-to-b from-transparent via-white to-white p-6 pb-6 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-2xl border-4 border-purple-300 bg-white px-6 pb-4 pt-5 shadow-2xl sm:pb-5 sm:pt-6"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Ask me anything about stocks! 💭"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-12 focus:outline-none text-lg font-medium text-gray-700 placeholder-gray-400 resize-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-4 my-auto flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110",
              disabled
                ? "cursor-not-allowed bg-gray-200"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-lg",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-5 w-5",
                  input.length === 0 ? "text-gray-400" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <p>💡 Tip: Ask me about your favorite companies or how to start investing!</p>
        </div>
      </div>
    </main>
  );
}
