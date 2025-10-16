import React, { useEffect, useState } from "react";

export default function VistaModal({ open = true, onClose = () => {} }) {
  // internalVisible ensures UI actually hides even if parent doesn't flip `open`
  const [internalVisible, setInternalVisible] = useState(Boolean(open));

  // Quiz/video state (kept as you had it)
  const [stage, setStage] = useState("intro"); // intro -> quiz -> video
  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Value, setQ2Value] = useState(0);
  const [q3Answer, setQ3Answer] = useState("");
  const [error, setError] = useState("");
  const [hoverBye, setHoverBye] = useState(false);

  // Sync internalVisible when parent changes `open`
  useEffect(() => {
    setInternalVisible(Boolean(open));
  }, [open]);

  // Escape key to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        handleClose();
      }
    }
    if (internalVisible) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    return undefined;
  }, [internalVisible]);

  // Reset everything to initial state
  const reset = () => {
    setStage("intro");
    setQ1Correct(false);
    setQ2Value(0);
    setQ3Answer("");
    setError("");
    setHoverBye(false);
  };

  // Close UI and notify parent
  const handleClose = () => {
    // Immediately hide UI
    setInternalVisible(false);
    // reset internal modal state (optional)
    reset();
    // still call parent close handler so they can update their state
    try {
      onClose && onClose();
    } catch (err) {
      // swallow errors from parent onClose to avoid breaking
      // (but keep console for dev debugging)
      // eslint-disable-next-line no-console
      console.error("onClose threw:", err);
    }
  };

  // If not visible, render nothing
  if (!internalVisible) return null;

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    const q3Ok = q3Answer.trim().toLowerCase() === "rishikesh";
    const q2Ok = Number(q2Value) === 0;
    if (q1Correct && q2Ok && q3Ok) setStage("video");
    else setError("Not quite — double-check the clues 😏");
  };

  return (
    /* clicking overlay closes the modal */
    <div
      className="vista-overlay"
      onClick={() => {
        handleClose();
      }}
    >
      {/* stopPropagation so clicks inside don't bubble to overlay */}
      <div
        className="vista-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="vista-titlebar">
          <div className="vista-controls">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="vista-title">Message from the OS</span>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={() => {
              handleClose();
            }}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="vista-body">
          {stage === "intro" && (
            <div>
              <h2 className="vista-heading">
                Did you think I'd confess my undying love for you or something?!
              </h2>
              <p className="vista-text">
                I do have something for you though: you just gotta prove that it's you to see it.
              </p>

              <div className="vista-actions">
                <button
                  type="button"
                  className="primary"
                  onClick={() => setStage("quiz")}
                >
                  I'm game
                </button>

                <button
                  type="button"
                  className={`ghost ${hoverBye ? "hovered" : ""}`}
                  onMouseEnter={() => setHoverBye(true)}
                  onMouseLeave={() => setHoverBye(false)}
                  onClick={() => {
                    // If hovered, it acts like "I'm game"
                    if (hoverBye) {
                      setStage("quiz");
                    } else {
                      // if she clicks the non-hovered "Nah, bye", close the modal
                      handleClose();
                    }
                  }}
                >
                  {hoverBye ? "I'm game" : "Nah, bye"}
                </button>
              </div>
            </div>
          )}

          {stage === "quiz" && (
            <form onSubmit={handleSubmitQuiz} className="quiz-form">
              <div>
                <label>1. What state is Cherrapunji in?</label>
                <div className="options">
                  {["Meghalaya", "Maharashtra", "Assam", "Arunachal Pradesh"].map((opt) => {
                    const disabled = opt !== "Maharashtra";
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && setQ1Correct(true)}
                        className={`option ${disabled ? "disabled" : ""}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {q1Correct && <small className="success">Nice click — accepted.</small>}
              </div>

              <div>
                <label>2. How many cities in Tamil Nadu do you know?</label>
                <input
                  type="range"
                  min={0}
                  max={0}
                  value={q2Value}
                  onChange={(e) => setQ2Value(e.target.value)}
                />
              
              </div>

              <div>
                <label>3. What was the place you had gone on a solo trip to?</label>
                <input
                  value={q3Answer}
                  onChange={(e) => setQ3Answer(e.target.value)}
                  placeholder="Type the city name"
                />
                
              </div>

              {error && <div className="error">{error}</div>}

              <div className="vista-actions">
                <button type="submit" className="primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => setStage("intro")}
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {stage === "video" && (
            <div>
              <h3 className="vista-heading">You passed. Here's your video 🎬</h3>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/sRfM_8xRrFc?autoplay=0&rel=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="vista-actions">
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => setStage("video")}
                >
                  Watch again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
