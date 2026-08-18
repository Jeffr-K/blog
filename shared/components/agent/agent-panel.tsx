"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAgent } from "./agent-context";
import styles from "./agent-panel.module.css";

type Role = "user" | "assistant" | "system";
type Message = { id: string; role: Role; content: string };

const INITIAL: Message[] = [
  {
    id: "init",
    role: "system",
    content: "블로그 콘텐츠를 기반으로 답변합니다. RAG가 연결되면 글 전체를 참고해 정확한 답변을 드립니다.",
  },
];

const DEFAULT_WIDTH = 352;
const MIN_WIDTH = 280;
const MAX_WIDTH = 640;

export function AgentPanel() {
  const { isOpen, close } = useAgent();

  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const widthRef = useRef(DEFAULT_WIDTH);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isFullscreen) { setIsFullscreen(false); return; }
        if (isOpen) close();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, isFullscreen, close]);

  // ── Drag resize ─────────────────────────────────────────────────
  const onDragStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = widthRef.current;
    setIsDragging(true);

    function onMove(ev: PointerEvent) {
      const dx = startX - ev.clientX;
      const next = Math.min(
        Math.max(startWidth + dx, MIN_WIDTH),
        Math.min(MAX_WIDTH, window.innerWidth - 80)
      );
      widthRef.current = next;
      setWidth(next);
    }

    function onUp() {
      setIsDragging(false);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    }

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, []);

  // ── Send ─────────────────────────────────────────────────────────
  function resizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }

  async function send() {
    const content = input.trim();
    if (!content || isLoading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsLoading(true);

    try {
      // TODO: replace with real RAG API call
      // const res = await fetch("/api/agent", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ messages: [...messages, userMsg] }),
      // });
      // const { reply } = await res.json();
      await new Promise((r) => setTimeout(r, 900));
      const reply = "RAG 연동 준비 중입니다. API가 연결되면 블로그 글을 참고해 정확하게 답변드릴게요. 🚀";
      setMessages((p) => [...p, { id: crypto.randomUUID(), role: "assistant", content: reply }]);
    } finally {
      setIsLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const panelStyle = isFullscreen
    ? undefined
    : { width: `${width}px` };

  return (
    <>
      {/* Drag cursor overlay */}
      {isDragging && <div className={styles.dragOverlay} aria-hidden="true" />}

      {/* Backdrop */}
      {isOpen && !isFullscreen && (
        <div className={styles.backdrop} aria-hidden="true" onClick={close} />
      )}
      {isOpen && isFullscreen && (
        <div className={styles.fsBackdrop} aria-hidden="true" />
      )}

      <aside
        className={styles.panel}
        data-open={isOpen}
        data-fullscreen={isFullscreen}
        style={panelStyle}
        aria-label="익명이 에이전트"
        aria-hidden={!isOpen}
      >
        {/* Drag handle — 패널 전체 높이, hover 시 보라색 라인 표시 */}
        {!isFullscreen && (
          <div
            className={styles.dragHandle}
            onPointerDown={onDragStart}
            aria-hidden="true"
            title="드래그해서 너비 조절"
          />
        )}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>
              <AgentFaceIcon />
            </span>
            <span className={styles.headerTitle}>
              익명이 에이전트
            </span>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setIsFullscreen((f) => !f)}
              aria-label={isFullscreen ? "일반 크기로" : "전체화면"}
            >
              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={close}
              aria-label="패널 닫기"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages} role="log" aria-live="polite">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <ThinkingBubble />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="무엇이든 물어보세요... (Enter 전송)"
            value={input}
            rows={1}
            onChange={(e) => { setInput(e.target.value); resizeTextarea(); }}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            aria-label="메시지 입력"
          />
          <button
            type="button"
            className={styles.sendBtn}
            onClick={send}
            disabled={!input.trim() || isLoading}
            aria-label="전송"
          >
            <SendIcon />
          </button>
        </div>
      </aside>
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "system") {
    return (
      <div className={styles.systemMsg}>
        <p>{message.content}</p>
      </div>
    );
  }
  return (
    <div className={styles.msgRow} data-role={message.role}>
      {message.role === "assistant" && (
        <span className={styles.msgAvatar}><AgentFaceIcon size={12} /></span>
      )}
      <p className={styles.msgBubble}>{message.content}</p>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className={styles.msgRow} data-role="assistant">
      <span className={styles.msgAvatar}><AgentFaceIcon size={12} /></span>
      <div className={styles.thinking}>
        <span /><span /><span />
      </div>
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────── */

// Lucide Bot — the game-style robot icon
function AgentFaceIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}


// Lucide Expand — 4 arrows pointing outward
function MaximizeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/>
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6"/>
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/>
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6"/>
    </svg>
  );
}

// Lucide Shrink — 4 arrows pointing inward
function MinimizeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/>
      <path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/>
      <path d="M15 4.2V9m0 0h4.8M15 9l6-6"/>
      <path d="M9 4.2V9m0 0H4.2M9 9 3 3"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}
