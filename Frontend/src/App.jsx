
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Activity,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Send,
  X,
  ShieldCheck,
  Bot,
  UserRound,
  Menu,
  Stethoscope,
  Sparkles,
} from "lucide-react";

const API_URL = "http://localhost:3000/ask";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Assalam-o-Alaikum! 👋 Main aapka Medical AI Assistant hoon. Aap apni health se related koi bhi sawal pooch sakte hain.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text = prompt) {
    const question = text.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        prompt: question,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.data.answer ||
            "Sorry, mujhe is waqt jawab nahi mil saka.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.response?.data?.error ||
            "Server se connection nahi ho saka. Please backend check karein.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = [
    "Headache ke liye kya karun?",
    "Healthy diet tips",
    "Neend behtar kaise karein?",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r
        border-slate-200 bg-white p-6 transition-transform
        md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            <HeartPulse size={27} />
          </div>
          <div>
            <h1 className="text-xl font-bold">MediCare AI</h1>
            <p className="text-xs text-slate-500">Health Assistant</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>

        <button
          onClick={() => setSidebarOpen(false)}
          className="mb-2 flex w-full items-center gap-3 rounded-xl
          bg-emerald-50 p-3 text-left font-medium text-emerald-700"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => {
            setChatOpen(true);
            setSidebarOpen(false);
          }}
          className="flex w-full items-center gap-3 rounded-xl
          p-3 text-left text-slate-600 hover:bg-slate-50"
        >
          <MessageCircle size={20} />
          Medical Chat
        </button>

        <div className="mt-10 rounded-2xl bg-emerald-50 p-4">
          <ShieldCheck className="mb-2 text-emerald-700" size={25} />
          <h3 className="font-semibold">Your health matters</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Get general health information and guidance.
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="mt-6 text-sm text-slate-500 md:hidden"
        >
          Close menu
        </button>
      </aside>

      {/* Main dashboard */}
      <main className="min-h-screen md:ml-64">
        <header className="flex items-center justify-between border-b
          border-slate-200 bg-white px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>
            <div>
              <h2 className="text-lg font-bold">Dashboard</h2>
              <p className="text-sm text-slate-500">
                Your personal health space
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full
            bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            AI Assistant
          </div>
        </header>

        <section className="p-5 md:p-8">
          <div className="rounded-3xl bg-gradient-to-r
            from-emerald-700 to-teal-600 p-7 text-white md:p-10">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2
                rounded-full bg-white/15 px-3 py-2 text-sm">
                <Sparkles size={16} />
                Your healthcare companion
              </span>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                Take care of your health, every day.
              </h1>

              <p className="mt-4 leading-7 text-emerald-50">
                Get general health information, nutrition advice,
                and answers to medical questions with your AI assistant.
              </p>

              <button
                onClick={() => setChatOpen(true)}
                className="mt-6 flex items-center gap-2 rounded-xl
                bg-white px-5 py-3 font-semibold text-emerald-800
                transition hover:bg-emerald-50"
              >
                <MessageCircle size={19} />
                Start a conversation
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              icon={<HeartPulse size={24} />}
              title="Health Assistant"
              description="Ask general questions about health and symptoms."
              color="bg-emerald-100 text-emerald-700"
            />
            <DashboardCard
              icon={<Activity size={24} />}
              title="Wellness & Fitness"
              description="Explore healthy habits, fitness, and nutrition."
              color="bg-blue-100 text-blue-700"
            />
            <DashboardCard
              icon={<ShieldCheck size={24} />}
              title="Safety First"
              description="Learn when to seek professional medical care."
              color="bg-violet-100 text-violet-700"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200
            bg-white p-6">
            <h2 className="text-lg font-bold">Need medical guidance?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Open the chat assistant to ask your health-related questions.
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="mt-4 rounded-xl bg-emerald-600 px-5 py-3
              font-medium text-white hover:bg-emerald-700"
            >
              Chat with MediCare AI
            </button>
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-5 text-slate-400">
            This assistant provides general health information and is
            not a substitute for professional medical advice or emergency care.
          </p>
        </section>
      </main>

      {/* Background overlay for mobile sidebar */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Floating chat button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Open medical chat"
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16
          items-center justify-center rounded-full bg-emerald-600
          text-white shadow-xl transition hover:scale-105
          hover:bg-emerald-700"
        >
          <MessageCircle size={29} />
        </button>
      )}

      {/* Chat dialogue */}
      {chatOpen && (
        <section
          className="fixed bottom-4 right-4 z-50 flex h-[min(650px,85dvh)]
          w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden
          rounded-2xl border border-slate-200 bg-white shadow-2xl
          sm:bottom-6 sm:right-6"
          aria-label="Medical chat window"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between
            bg-emerald-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/15 p-2">
                <Stethoscope size={23} />
              </div>
              <div>
                <h2 className="font-bold">Medical AI Assistant</h2>
                <p className="mt-1 flex items-center gap-2 text-xs
                  text-emerald-100">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  Here to help
                </p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="rounded-lg p-2 hover:bg-white/15"
              aria-label="Close chat"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className={`shrink-0 rounded-full p-2 ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {message.role === "user" ? (
                    <UserRound size={17} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div className={`max-w-[82%] whitespace-pre-wrap
                  break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-emerald-600 text-white"
                    : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                }`}>
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Bot size={19} className="text-emerald-700" />
                <span className="animate-pulse">
                  Preparing your answer...
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="border-t border-slate-100 bg-white px-4 pt-3">
              <p className="mb-2 text-xs text-slate-500">
                Try asking
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    disabled={loading}
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-emerald-200
                    px-3 py-2 text-xs text-emerald-800
                    hover:bg-emerald-50 disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-2 border-t border-slate-200
              bg-white p-3"
          >
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask a health question..."
              rows={1}
              disabled={loading}
              aria-label="Your medical question"
              className="max-h-24 min-h-11 flex-1 resize-y rounded-xl
              border border-slate-200 bg-slate-50 px-3 py-3
              text-sm outline-none focus:border-emerald-500
              disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center
              justify-center rounded-xl bg-emerald-600 text-white
              hover:bg-emerald-700 disabled:cursor-not-allowed
              disabled:opacity-50"
            >
              <Send size={19} />
            </button>
          </form>

          <div className="bg-white px-3 pb-3 text-center
            text-[10px] leading-4 text-slate-400">
            General information only · Not a medical diagnosis
          </div>
        </section>
      )}
    </div>
  );
}

function DashboardCard({ icon, title, description, color }) {
  return (
    <div className="rounded-2xl border border-slate-200
      bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
