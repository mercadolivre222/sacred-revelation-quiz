import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import solomonLock from "../assets/solomon_lock.png";

export const Route = createFileRoute("/templo")({
  component: TemploPage,
  head: () => ({
    meta: [
      { title: "Protocolo de Salomão - Ativação da Provisão" },
      {
        name: "description",
        content: "A revelação sagrada do Código de Salomão para quebrar a escassez.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
});

function TemploPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterfaceActive, setIsInterfaceActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formattedTime, setFormattedTime] = useState("0:00 / 12:47");
  const [isRevealed, setIsRevealed] = useState(false);
  
  const delayedRef = useRef<HTMLDivElement>(null);
  const playbackDuration = 767; // 12m 47s in seconds
  const currentPlaybackTime = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Security block (Safeguard the sales funnel)
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" ||
            e.key === "J" ||
            e.key === "C" ||
            e.key === "i" ||
            e.key === "j" ||
            e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Setup 40-second delay (or 3-second delay in test/fast mode)
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.get("test") === "true" || urlParams.get("fast") === "true";
    const delayTime = isTestMode ? 3000 : 40000;

    const delayTimeout = setTimeout(() => {
      setIsRevealed(true);
      
      // Auto scroll down smoothly
      setTimeout(() => {
        if (delayedRef.current) {
          delayedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 400);
    }, delayTime);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(delayTimeout);
    };
  }, []);

  const handlePlayClick = () => {
    if (isPlaying || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
      setIsInterfaceActive(true);

      // Simulate video timeline progression
      const interval = setInterval(() => {
        currentPlaybackTime.current += 1;
        if (currentPlaybackTime.current >= playbackDuration) {
          clearInterval(interval);
          return;
        }

        const percentage = (currentPlaybackTime.current / playbackDuration) * 100;
        setProgress(percentage);

        const m = Math.floor(currentPlaybackTime.current / 60);
        const s = currentPlaybackTime.current % 60;
        setFormattedTime(`${m}:${s.toString().padStart(2, "0")} / 12:47`);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="vsl-body-wrapper">
      {/* VSL Specific Styles (Scoped to .vsl-body-wrapper to not leak into other routes) */}
      <style>{`
        .vsl-body-wrapper {
          background-color: #000000;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
          position: relative;
        }

        .vsl-body-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 50% 20%, rgba(20, 15, 10, 0.4) 0%, rgba(0, 0, 0, 0.95) 70%),
            radial-gradient(circle at 0% 100%, rgba(40, 30, 15, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(40, 30, 15, 0.15) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        .vsl-main {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px 64px 16px;
          position: relative;
          z-index: 2;
        }

        /* 1. Top Bar Alert Box */
        .vsl-top-alert {
          width: 100%;
          background: linear-gradient(90deg, rgba(255, 59, 59, 0.15) 0%, rgba(255, 59, 59, 0.3) 50%, rgba(255, 59, 59, 0.15) 100%);
          border-bottom: 2px solid #ff3b3b;
          padding: 12px 16px;
          text-align: center;
          z-index: 10;
          box-shadow: 0 4px 20px rgba(255, 59, 59, 0.3);
        }

        .vsl-top-alert-text {
          color: #ff3b3b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: vsl-alert-blink 2s infinite ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @keyframes vsl-alert-blink {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 2px rgba(255, 59, 59, 0.5)); }
          50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 59, 59, 1)); }
        }

        /* 2. Main Heading Section */
        .vsl-header-section {
          text-align: center;
          margin-top: 40px;
          margin-bottom: 32px;
          padding: 0 8px;
        }

        .vsl-main-title {
          font-family: 'Cinzel', serif;
          font-size: 26px;
          font-weight: 900;
          color: #ffd700;
          letter-spacing: 0.05em;
          line-height: 1.25;
          text-transform: uppercase;
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(255, 215, 0, 0.2);
          margin-bottom: 12px;
        }

        @media (min-width: 480px) {
          .vsl-main-title {
            font-size: 32px;
          }
        }

        .vsl-subtitle {
          font-size: 13px;
          color: #a89d8c;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: 0.03em;
          max-width: 450px;
          margin: 0 auto;
        }

        /* 3. VSL Vertical Video Container (9:16 Aspect Ratio) */
        .vsl-video-wrapper {
          width: 100%;
          max-width: 340px;
          aspect-ratio: 9/16;
          background-color: #0d0d0d;
          border: 2px solid rgba(255, 215, 0, 0.4);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.9),
            0 0 30px rgba(255, 215, 0, 0.15);
          margin-bottom: 40px;
          cursor: pointer;
        }

        .vsl-video-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 14px;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 3;
        }

        /* Video Mock Image Thumbnail */
        .vsl-video-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.65;
          transition: opacity 0.5s ease;
          filter: brightness(0.65) contrast(1.1);
          background: radial-gradient(circle at center, #1f1a12 0%, #050505 100%);
        }

        /* Mystical elements inside player background */
        .vsl-mystical-seal {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: 180px;
          border: 1px dashed rgba(255, 215, 0, 0.15);
          border-radius: 50%;
          animation: vsl-seal-rotate 40s linear infinite;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vsl-mystical-seal::before {
          content: "✡";
          font-size: 32px;
          color: rgba(255, 215, 0, 0.15);
        }

        @keyframes vsl-seal-rotate {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Play Button Overlay */
        .vsl-play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 4;
          background: rgba(0,0,0,0.2);
        }

        .vsl-play-btn-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700 0%, #c59e58 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 10px 25px rgba(255, 215, 0, 0.4),
            0 0 0 8px rgba(255, 215, 0, 0.15);
          animation: vsl-play-pulse 2s infinite ease-in-out;
          transition: all 0.3s ease;
        }

        @keyframes vsl-play-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4), 0 0 0 8px rgba(255, 215, 0, 0.15);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 12px 30px rgba(255, 215, 0, 0.6), 0 0 0 16px rgba(255, 215, 0, 0);
          }
        }

        .vsl-play-icon {
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-left: 26px solid #000000;
          margin-left: 6px;
        }

        .vsl-play-caption {
          margin-top: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.9);
          animation: vsl-caption-pulse 1.5s infinite ease-in-out;
        }

        @keyframes vsl-caption-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Active VSL Mock Player Interface */
        .vsl-interface-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
          z-index: 5;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        .vsl-interface-overlay.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .vsl-progress-bar-container {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.15);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .vsl-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffd700, #ff3b3b);
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .vsl-controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .vsl-play-indicator-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vsl-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ff3b3b;
          animation: vsl-dot-pulse 1s infinite ease-in-out;
        }

        @keyframes vsl-dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .vsl-status-info {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #a89d8c;
        }

        .vsl-time-text {
          font-size: 11px;
          font-family: monospace;
          color: #a89d8c;
        }

        /* VSL Spinner Overlay */
        .vsl-loading-screen {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.85);
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .vsl-spin-loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(255, 215, 0, 0.15);
          border-top-color: #ffd700;
          animation: vsl-spin-anim 1s linear infinite;
          margin-bottom: 16px;
        }

        .vsl-loading-title {
          font-size: 12px;
          color: #ffd700;
          letter-spacing: 0.1em;
          font-weight: 600;
          text-transform: uppercase;
        }

        @keyframes vsl-spin-anim {
          to { transform: rotate(360deg); }
        }

        /* 4. Delayed Section Area (VSL delay simulation) */
        .vsl-delayed-section {
          width: 100%;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          visibility: hidden;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), max-height 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vsl-delayed-section.revealed {
          opacity: 1;
          max-height: 5000px;
          visibility: visible;
          overflow: visible;
        }

        /* Circular Solomon's Lock container */
        .vsl-seal-container {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          position: relative;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vsl-seal-halo {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: 
            0 0 35px rgba(255, 215, 0, 0.45),
            inset 0 0 25px rgba(255, 215, 0, 0.25);
          animation: vsl-halo-pulse 3s infinite ease-in-out;
          border: 1px solid rgba(255, 215, 0, 0.3);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes vsl-halo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 215, 0, 0.2); }
          50% { transform: scale(1.04); opacity: 1; box-shadow: 0 0 50px rgba(255, 215, 0, 0.65), inset 0 0 35px rgba(255, 215, 0, 0.4); }
        }

        .vsl-seal-img {
          width: 88%;
          height: 88%;
          object-fit: cover;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 4px 15px rgba(0,0,0,0.8);
          border: 1.5px solid #ffd700;
        }

        /* Manifesto typography */
        .vsl-manifesto-box {
          text-align: center;
          padding: 0 12px;
          margin-bottom: 36px;
        }

        .vsl-manifesto-text {
          font-size: 17px;
          line-height: 1.7;
          color: #e5e5e5;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        @media (min-width: 480px) {
          .vsl-manifesto-text {
            font-size: 19px;
          }
        }

        .vsl-highlight-gold {
          color: #ffd700;
          font-weight: 700;
          text-shadow: 0 0 12px rgba(255, 215, 0, 0.25);
        }

        /* Benefits Card component */
        .vsl-benefits-card {
          width: 100%;
          background: linear-gradient(135deg, rgba(20, 18, 14, 0.95) 0%, rgba(8, 7, 5, 0.98) 100%);
          border: 1.5px solid #ffd700;
          border-radius: 14px;
          padding: 28px 24px;
          margin-bottom: 40px;
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.8),
            0 0 20px rgba(255, 215, 0, 0.05);
          position: relative;
          text-align: left;
        }

        .vsl-benefits-card::before {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px solid rgba(255, 215, 0, 0.15);
          border-radius: 10px;
          pointer-events: none;
        }

        .vsl-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .vsl-benefit-item:last-child {
          margin-bottom: 0;
        }

        .vsl-benefit-icon {
          color: #ffd700;
          font-size: 20px;
          line-height: 1;
          margin-top: 2px;
          filter: drop-shadow(0 0 5px rgba(255,215,0,0.5));
        }

        .vsl-benefit-content {
          flex: 1;
        }

        .vsl-benefit-title {
          font-family: 'Cinzel', serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffd700;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }

        .vsl-benefit-desc {
          font-size: 12.5px;
          color: #d1c8bd;
          line-height: 1.5;
          font-weight: 400;
        }

        /* Gold Bar Premium CTA Button */
        .vsl-gold-bar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 480px;
          color: #000000 !important;
          font-weight: 800;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          padding: 22px 28px;
          background: linear-gradient(180deg, #ffe880 0%, #ffd700 45%, #bfa12a 100%);
          border: 2px solid #ecd56b;
          border-radius: 8px;
          box-shadow: 
            0 15px 30px rgba(255, 215, 0, 0.25),
            inset 0 2px 2px rgba(255, 255, 255, 0.5),
            inset 0 -2px 3px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          margin-bottom: 32px;
          animation: vsl-bar-pulse 2.5s infinite ease-in-out;
          text-align: center;
        }

        @media (min-width: 480px) {
          .vsl-gold-bar-btn {
            font-size: 18px;
          }
        }

        .vsl-gold-bar-btn:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 
            0 20px 40px rgba(255, 215, 0, 0.4),
            inset 0 2px 2px rgba(255, 255, 255, 0.6);
          filter: brightness(1.05);
        }

        .vsl-gold-bar-btn:active {
          transform: translateY(1px) scale(0.99);
          box-shadow: 
            0 8px 20px rgba(255, 215, 0, 0.2),
            inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        /* Sweeping Shine Overlay Animation */
        .vsl-gold-bar-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transform: skewX(-25deg);
          animation: vsl-gold-shine 4s infinite linear;
        }

        @keyframes vsl-gold-shine {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }

        @keyframes vsl-bar-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 25px rgba(255, 215, 0, 0.2), inset 0 2px 2px rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 16px 35px rgba(255, 215, 0, 0.35), inset 0 2px 2px rgba(255, 255, 255, 0.5);
          }
        }

        /* 5. Urgency Footer Warning */
        .vsl-urgency-footer {
          text-align: center;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 0 12px;
        }

        .vsl-urgency-warning-text {
          font-size: 11px;
          font-weight: 500;
          line-height: 1.6;
          color: rgba(255, 59, 59, 0.65);
          letter-spacing: 0.02em;
          border-top: 1px solid rgba(255, 59, 59, 0.15);
          padding-top: 20px;
        }

        .vsl-urgency-warning-text strong {
          color: #ff3b3b;
          font-weight: 700;
        }

        /* Smooth Scroll Indicator Helper */
        .vsl-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          opacity: 0.6;
        }

        .vsl-scroll-indicator-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a89d8c;
        }

        .vsl-scroll-arrow {
          font-size: 14px;
          color: #ffd700;
          animation: vsl-arrow-bounce 1.5s infinite ease-in-out;
        }

        @keyframes vsl-arrow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>

      {/* 1. TOP BAR ALERT */}
      <div className="vsl-top-alert">
        <div className="vsl-top-alert-text">
          <span>🛡️ DIAGNÓSTICO CONCLUÍDO - PROTOCOLO DE SALOMÃO ATIVADO</span>
        </div>
      </div>

      <main className="vsl-main">
        {/* 2. MAIN HEADER */}
        <section className="vsl-header-section">
          <h1 className="vsl-main-title">SUA LINHA DE ESCASSEZ FOI DETECTADA</h1>
          <p className="vsl-subtitle">Assista ao vídeo abaixo imediatamente para liberar seu código de ativação.</p>
        </section>

        {/* 3. PREMIUM VSL PLAYER */}
        <div className="vsl-video-wrapper" onClick={handlePlayClick}>
          {/* Background / Mock video frame */}
          <div className="vsl-mystical-seal"></div>

          {/* Video Thumbnail mock background */}
          <div className="vsl-video-thumbnail"></div>

          {/* Play Button Overlay */}
          {!isPlaying && !isLoading && (
            <div className="vsl-play-overlay">
              <div className="vsl-play-btn-circle">
                <div className="vsl-play-icon"></div>
              </div>
              <p className="vsl-play-caption">CLIQUE PARA ASSISTIR A REVELAÇÃO</p>
            </div>
          )}

          {/* Loading screen simulation */}
          {isLoading && (
            <div className="vsl-loading-screen">
              <div className="vsl-spin-loader"></div>
              <p className="vsl-loading-title">Conectando ao Templo de Salomão...</p>
            </div>
          )}

          {/* Player interface overlay */}
          <div className={`vsl-interface-overlay ${isInterfaceActive ? "active" : ""}`}>
            <div className="vsl-progress-bar-container">
              <div
                className="vsl-progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="vsl-controls-row">
              <div className="vsl-play-indicator-box">
                <div className="vsl-pulse-dot"></div>
                <p className="vsl-status-info">REVELANDO A VERDADE</p>
              </div>
              <span className="vsl-time-text">{formattedTime}</span>
            </div>
          </div>
        </div>

        {/* Scroll Helper Indicator */}
        {isRevealed && (
          <div className="vsl-scroll-indicator">
            <span className="vsl-scroll-indicator-text">Selo Disponível Abaixo</span>
            <span className="vsl-scroll-arrow">▼</span>
          </div>
        )}

        {/* 4. DELAYED CONTENT SECTION */}
        <section
          ref={delayedRef}
          className={`vsl-delayed-section ${isRevealed ? "revealed" : ""}`}
        >
          {/* Circular Solomon's Lock */}
          <div className="vsl-seal-container">
            <div className="vsl-seal-halo"></div>
            <img className="vsl-seal-img" src={solomonLock} alt="Selo de Salomão" />
          </div>

          {/* Manifesto Block */}
          <div className="vsl-manifesto-box">
            <p className="vsl-manifesto-text">
              O veredito do seu Quiz <span className="vsl-highlight-gold">confirmou o bloqueio</span>. Sua linhagem está sob o peso da <span className="vsl-highlight-gold">escassez hereditária</span>.{" "}
              Ao quebrar esse selo agora, você ativa a <span className="vsl-highlight-gold">Provisão Terrena Absoluta</span> para esvaziar seus boletos e garante o seu <span className="vsl-highlight-gold">Terreno Sagrado</span> e morada eterna no Reino dos Céus.
            </p>
          </div>

          {/* Benefits Card */}
          <div className="vsl-benefits-card">
            {/* Benefit 1 */}
            <div className="vsl-benefit-item">
              <span className="vsl-benefit-icon">✦</span>
              <div className="vsl-benefit-content">
                <h3 className="vsl-benefit-title">Quebra do Selo Familiar</h3>
                <p className="vsl-benefit-desc">Rompe as amarras invisíveis que drenam as finanças de sua família há gerações.</p>
              </div>
            </div>
            {/* Benefit 2 */}
            <div className="vsl-benefit-item">
              <span className="vsl-benefit-icon">✦</span>
              <div className="vsl-benefit-content">
                <h3 className="vsl-benefit-title">Ativação do Ouro Terreno</h3>
                <p className="vsl-benefit-desc">Ativa as frequências ancestrais de prosperidade material para reverter as suas perdas físicas.</p>
              </div>
            </div>
            {/* Benefit 3 */}
            <div className="vsl-benefit-item">
              <span className="vsl-benefit-icon">✦</span>
              <div className="vsl-benefit-content">
                <h3 className="vsl-benefit-title">Garantia de Herança Eterna</h3>
                <p className="vsl-benefit-desc">Sela permanentemente sua conexão divina e reserva seu quinhão no reino da glória.</p>
              </div>
            </div>
          </div>

          {/* Massive Gold Bar CTA Button */}
          {/* INSERT YOUR FINAL CHECKOUT OR SALES LINK HERE */}
          <a href="https://SEU_LINK_DE_CHECKOUT_AQUI.com" className="vsl-gold-bar-btn">
            🔑 QUEBRAR SELO & REIVINDICAR MINHA HERANÇA
          </a>

          {/* 5. URGENCY WARNING FOOTER */}
          <footer className="vsl-urgency-footer">
            <p className="vsl-urgency-warning-text">
              Aviso fatal: Restam apenas <strong>7 licenças</strong> de liberação espiritual disponíveis para o seu endereço IP.{" "}
              Se você fechar esta página, seu nome será permanentemente removido do protocolo sagrado de Salomão.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
