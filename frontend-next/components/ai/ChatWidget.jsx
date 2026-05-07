"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { sendChatMessage } from "@/lib/api";
import { relatedItemLink } from "@/lib/chatRelatedItems";

const SUGGESTIONS = [
  "What events are happening this week?",
  "Any free events on campus?",
  "Tell me about upcoming tech talks",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    try {
      const data = await sendChatMessage(trimmed);
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.response, relatedItems: data.relatedItems || [] },
      ]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: `⚠️ ${err.message}`, error: true }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    send(input);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI chat"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          height: 56,
          padding: "0 1.25rem",
          borderRadius: 28,
          border: "none",
          background: "var(--primary)",
          color: "#fff",
          fontSize: "0.95rem",
          fontWeight: 600,
          boxShadow: "var(--shadow)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 50,
        }}
      >
        <span>✨</span>
        <span>Ask AI</span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        width: "min(380px, calc(100vw - 2rem))",
        height: "min(560px, calc(100vh - 2rem))",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <header
        style={{
          padding: "0.85rem 1rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--primary-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.1rem" }}>✨</span>
          <strong style={{ color: "var(--primary)" }}>Student Hub Assistant</strong>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: "1.4rem",
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      </header>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            <p style={{ margin: "0 0 0.75rem 0" }}>
              Ask about campus events. I only know what&apos;s posted on Student Hub.
            </p>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.8rem" }}>Try:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    textAlign: "left",
                    background: "var(--surface-soft)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.5rem 0.75rem",
                    color: "var(--text)",
                    fontSize: "0.85rem",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <p style={{ margin: "0.75rem 0 0 0", fontSize: "0.7rem", color: "var(--muted)" }}>
              Note: messages may be used by Google to improve their models. Don&apos;t paste personal info.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: m.role === "user" ? "var(--primary)" : "var(--surface-soft)",
              color: m.role === "user" ? "#fff" : "var(--text)",
              border: m.role === "assistant" ? "1px solid var(--border)" : "none",
              borderRadius: "var(--radius-sm)",
              padding: "0.6rem 0.85rem",
              fontSize: "0.9rem",
              lineHeight: 1.45,
              whiteSpace: "pre-wrap",
            }}
          >
            <div>{m.text}</div>
            {m.relatedItems && m.relatedItems.length > 0 && (
              <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {m.relatedItems.map((item) => {
                  const { href, label } = relatedItemLink(item);
                  return (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={href}
                      onClick={() => setOpen(false)}
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.55rem",
                        borderRadius: 12,
                        background: "var(--primary-soft)",
                        color: "var(--primary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {label} #{item.id}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: "flex-start", color: "var(--muted)", fontSize: "0.85rem" }}>
            Thinking…
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "0.75rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about events…"
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.55rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: "0.9rem",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0 1rem",
            border: "none",
            borderRadius: "var(--radius-sm)",
            background: "var(--primary)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
