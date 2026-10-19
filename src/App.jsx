import { useEffect, useRef, useState } from "react";
import "./App.css";

const statements = [
  "YOU SAID TOMORROW.",
  "TOMORROW IS TODAY.",
  "STOP NEGOTIATING.",
  "MAKE IT HAPPEN.",
  "DO THE HARD THING.",
  "PROVE IT TO YOURSELF.",
  "GET BACK TO WORK.",
];

const transmissions = [
  "Waiting for motivation is a terrible strategy.",
  "Your future self is watching.",
  "Discipline doesn't need permission.",
  "The plan means nothing without action.",
  "You know exactly what you need to do.",
  "Small progress is still progress.",
  "Nobody can do it for you.",
];

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function useScramble(words) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0]);

  useEffect(() => {
    let frame = 0;
    let interval;

    const timeout = setTimeout(() => {
      const nextIndex = (index + 1) % words.length;
      const target = words[nextIndex];

      interval = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, position) => {
              if (char === " ") return " ";
              if (position < frame / 2) return char;
              return characters[
                Math.floor(Math.random() * characters.length)
              ];
            })
            .join("")
        );

        frame++;

        if (frame >= target.length * 2 + 8) {
          clearInterval(interval);
          setDisplay(target);
          setIndex(nextIndex);
        }
      }, 28);
    }, 3300);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [index, words]);

  return display;
}

function App() {
  const headline = useScramble(statements);
  const [transmission, setTransmission] = useState(0);
  const [time, setTime] = useState(new Date());
  const [coordinates, setCoordinates] = useState({ x: 50, y: 50 });
  const [soundOn, setSoundOn] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransmission((previous) => (previous + 1) % transmissions.length);
    }, 5100);

    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(event) {
    if (!mainRef.current) return;

    const rect = mainRef.current.getBoundingClientRect();

    setCoordinates({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  function triggerReveal() {
    setRevealed((previous) => !previous);
  }

  return (
    <div className="logic-site">
      <header className="site-header">
        <a className="logo" href="/" aria-label="Logic home">
          <span className="logo-icon">
            <span />
            <span />
            <span />
            <span />
          </span>
          logic<span className="logo-period">.</span>
        </a>

        <div className="header-right">
          <div className="system-status">
            <span className="live-dot" />
            SYSTEM IN DEVELOPMENT
          </div>
          <span className="header-number">001—∞</span>
        </div>
      </header>

      <main
        className="main-stage"
        ref={mainRef}
        onMouseMove={handleMouseMove}
        style={{
          "--mouse-x": `${coordinates.x}%`,
          "--mouse-y": `${coordinates.y}%`,
        }}
      >
        <div className="background-grid" aria-hidden="true" />
        <div className="cursor-glow" aria-hidden="true" />

        <div className="vertical-label" aria-hidden="true">
          AN EXPERIMENT IN ACCOUNTABILITY — 2026
        </div>

        <div className="corner-label top-left">
          <span className="crosshair">+</span>
          <span>PROJECT / LOGIC</span>
        </div>

        <div className="corner-label top-right">
          <span>PRE-RELEASE BUILD</span>
          <span className="crosshair">+</span>
        </div>

        <section className="hero-content">
          <div className="hero-overline">
            <span className="overline-index">[ 00.01 ]</span>
            <span className="overline-rule" />
            <span>THIS IS YOUR WAKE-UP CALL</span>
          </div>

          <div className="hero-title-wrap">
            <h1>
              LESS TALK.
              <br />
              <span className="title-outline">MORE</span> ACTION
              <span className="title-period">.</span>
            </h1>
            <span className="title-asterisk" aria-hidden="true">
              ✳
            </span>
          </div>

          <div className="scramble-section">
            <span className="scramble-indicator">
              <span className="indicator-square" />
              CURRENT TRANSMISSION
            </span>

            <div className="scramble-line" aria-live="off">
              <span className="scramble-arrow">↳</span>
              <span className="scramble-text">{headline}</span>
              <span className="scramble-cursor" />
            </div>
          </div>

          <div className="hero-bottom-content">
            <div className="hero-description">
              <span className="description-symbol">↗</span>
              <p>
                An AI that doesn't just tell you what you want to hear.
                <br />
                It makes sure you actually do what you said you would.
              </p>
            </div>

            <button
              className={`reveal-button ${revealed ? "active" : ""}`}
              onClick={triggerReveal}
              type="button"
              aria-expanded={revealed}
            >
              <span className="button-text">
                {revealed ? "MESSAGE RECEIVED" : "WHAT IS LOGIC?"}
              </span>
              <span className="button-icon">{revealed ? "✓" : "↗"}</span>
            </button>
          </div>

          <div className={`reveal-panel ${revealed ? "visible" : ""}`}>
            <div className="reveal-panel-inner">
              <span className="panel-index">THE MISSION / 001</span>
              <p>
                Your goals don't need another app you forget to open.
                They need something that remembers, checks in, and
                holds you to your word.
              </p>
              <span className="panel-footer">
                LOGIC IS COMING. YOU'VE BEEN WARNED. ↗
              </span>
            </div>
          </div>
        </section>

        <div className="stage-footer">
          <div className="stage-footer-left">
            <span className="tiny-asterisk">✳</span>
            <span>YOUR EXCUSES HAVE AN EXPIRATION DATE.</span>
          </div>
          <span>SCROLL / THERE'S NOTHING ELSE YET</span>
        </div>
      </main>

      <section className="ticker" aria-label="Logic is coming soon">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span className="ticker-set" key={index}>
              COMING SOON <span>✳</span> NO MORE EXCUSES{" "}
              <span>✳</span> COMING SOON <span>✳</span>
            </span>
          ))}
        </div>
      </section>

      <section className="terminal-section">
        <div className="terminal-container">
          <div className="terminal-heading">
            <div>
              <span className="terminal-eyebrow">[ LIVE FEED ]</span>
              <h2>LOGIC IS LISTENING<span>.</span></h2>
            </div>
            <span className="terminal-build">BUILD 0.0.1 / PRIVATE</span>
          </div>

          <div className="terminal-box">
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>
              <span>logic://transmission</span>
              <span className="terminal-online">
                <span className="live-dot" /> ACTIVE
              </span>
            </div>

            <div className="terminal-body">
              <div className="terminal-row muted">
                <span className="terminal-prefix">&gt;</span>
                <span>initializing accountability protocol...</span>
                <span className="terminal-ok">[OK]</span>
              </div>

              <div className="terminal-row muted">
                <span className="terminal-prefix">&gt;</span>
                <span>excuse detection enabled</span>
                <span className="terminal-ok">[OK]</span>
              </div>

              <div className="terminal-row muted">
                <span className="terminal-prefix">&gt;</span>
                <span>preparing next transmission...</span>
                <span className="terminal-ok">[OK]</span>
              </div>

              <div className="terminal-separator" />

              <div className="terminal-message">
                <span className="message-prompt">LOGIC &gt;</span>
                <span key={transmission} className="message-content">
                  {transmissions[transmission]}
                </span>
              </div>

              <div className="terminal-input-line">
                <span>&gt;</span>
                <span className="terminal-block-cursor" />
              </div>
            </div>

            <div className="terminal-bottombar">
              <span>TRANSMISSION {String(transmission + 1).padStart(2, "0")}/07</span>
              <span>
                {time.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="terminal-bottom">
            <span>NO SIGNUPS. NO EMPTY PROMISES. NOT YET.</span>
            <button
              type="button"
              className="sound-toggle"
              onClick={() => setSoundOn((previous) => !previous)}
              aria-pressed={soundOn}
            >
              <span className="sound-icon">{soundOn ? "◉" : "◎"}</span>
              {soundOn ? "FOCUS MODE: ON" : "FOCUS MODE: OFF"}
            </button>
          </div>
          {soundOn && (
            <p className="focus-note">
              Focus mode armed. The only thing left is to start.
            </p>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-logo">logic<span>.</span></div>
          <div className="footer-statement">
            BUILT FOR THE VERSION OF YOU
            <br />
            THAT ACTUALLY FOLLOWS THROUGH.
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LOGIC</span>
          <span>STILL BUILDING. NEVER SETTLING.</span>
          <a href="#top" onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;