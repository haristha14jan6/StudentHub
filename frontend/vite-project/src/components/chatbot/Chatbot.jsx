import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

// --- DUMMY DATASET / KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = {
  greetings: ["hi", "hello", "hey", "namaste"],
  responses: {
    greeting: "Hi 👋 I'm EduTrack Assistant from R.M.K College! I can help you track achievements, upload certificates, or build your portfolio. What's on your mind?",
    upload: "To upload a certificate, go to your 'Home' dashboard and click 'Click to upload' on the relevant category (Hackathons, Internships, etc.).",
    portfolio: "The Portfolio feature turns your activity data into a professional digital resume. Click 'Portfolio' in the sidebar to generate yours!",
    leaderboard: "The Leaderboard ranks students based on points earned from verified activities. Keep uploading to climb to the top!",
    placement: "EduTrack helps you stay placement-ready by showcasing your verified skills and certificates to recruiters.",
    fallback: "I'm not sure I understand. You can ask me about 'how to upload certificates', 'building a portfolio', or 'the leaderboard'!"
  }
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm EduTrack Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- DUMMY AI LOGIC ---
  const getStaticResponse = (userInput) => {
    const text = userInput.toLowerCase();
    
    if (KNOWLEDGE_BASE.greetings.some(g => text.includes(g))) return KNOWLEDGE_BASE.responses.greeting;
    if (text.includes("upload") || text.includes("certificate")) return KNOWLEDGE_BASE.responses.upload;
    if (text.includes("portfolio") || text.includes("resume")) return KNOWLEDGE_BASE.responses.portfolio;
    if (text.includes("leaderboard") || text.includes("rank") || text.includes("points")) return KNOWLEDGE_BASE.responses.leaderboard;
    if (text.includes("placement") || text.includes("job")) return KNOWLEDGE_BASE.responses.placement;
    
    return KNOWLEDGE_BASE.responses.fallback;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate "Bot is thinking" delay
    setTimeout(() => {
      const botReply = getStaticResponse(userMsg);
      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] bg-blue-600 hover:bg-blue-700 p-4 rounded-full text-white shadow-2xl transition-transform active:scale-90"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-85 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold tracking-tight">EduTrack Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-blue-500 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  } max-w-[85%]`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ask me about certificates..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors shadow-md shadow-blue-100"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}