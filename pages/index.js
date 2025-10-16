import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { detailed, TAB_ORDER, local } from '../data/roadmapsData';
import VistaModal from "./modal";

export default function IndexPage() {
  const [introDone, setIntroDone] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [sike, setSike] = useState(false);
  const [activeTab, setActiveTab] = useState(TAB_ORDER[0]);
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') {
        setIntroDone(true);
        if (audioEnabled && audioRef.current) audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [audioEnabled]);

  const enableAudioAndStart = () => {
    setAudioEnabled(true);
    try {
      audioRef.current && audioRef.current.play().catch(() => {});
    } catch {}
    setIntroDone(true);
  };

  const handleSikeClick = () => {
    setSike(true);
    setTimeout(() => setSike(false), 1000);
  };

  const renderAside = (detail) => (
    <aside className="aside-panel">
      <h4>Skills to build</h4>
      <ul>{(detail.skills || []).map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4>Tools</h4>
      <ul>{(detail.tools || []).map((t, i) => <li key={i}>{t}</li>)}</ul>

      <h4>Quick projects</h4>
      <ul>{(detail.projects || []).map((p, i) => <li key={i}>{p}</li>)}</ul>
    </aside>
  );

  const heartOnClicked = () => {
    const newCount = heartClickCount + 1;
    setHeartClickCount(newCount);
    if(newCount > 2) {
      setShowModal(true)
      setHeartClickCount(0);
    }
  }

  const renderContent = (detail) => (
    <section className="tab-content">
      <h2>{detail.title}</h2>
      <p className="overview">{detail.overview}</p>

      {/* GIF gallery */}
      <div className="gif-gallery">
        {(detail.gifs || []).map((g, i) => (
          <div className="gif-box" key={i}>
            <img src={g} alt="gif" />
          </div>
        ))}
      </div>

      {/* Weeks / steps */}
      {(detail.weeks || detail.steps || []).length > 0 && (
        <>
          <h3>Roadmap</h3>
          <div className="weeks">
            {(detail.weeks || detail.steps || []).map((w, i) => (
              <div key={i} className="week-block">
                <strong>{w.title || `Step ${i + 1}`}</strong>
                <div className="week-tasks">
                  {(w.tasks || w.items || (typeof w === 'string' ? [w] : [])).map((t, j) => (
                    <div key={j}>{t}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Resources */}
      {detail.resources && detail.resources.length > 0 && (
        <>
          <h3>Resources</h3>
          <ul>
            {detail.resources.map((r, i) =>
              typeof r === 'string' ? (
                <li key={i}><a href={r} target="_blank" rel="noreferrer">{r}</a></li>
              ) : (
                <li key={i}><a href={r.url} target="_blank" rel="noreferrer">{r.title || r.url}</a></li>
              )
            )}
          </ul>
        </>
      )}
    </section>
  );

  const activeDetail = detailed[activeTab];

  return (
    <div className="main-bg">
      {/* Intro Overlay */}
      {showModal && <VistaModal />}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="intro"
            className="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="intro-card"
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            >
              <div className="intro-header">
                <img src={local.cat_gamer} alt="cat" />
                <div>
                 
                </div>
              </div>
              <div className="intro-text">
                <div>Ni Hao Fine Shyt.🐾</div>
                <div>Wanna be a tech baddie?</div>
              </div>
              <div className="intro-buttons">
                <button onClick={enableAudioAndStart}>Yes I do 😊</button>
                <button onClick={handleSikeClick}>😤 Nah I don't want to</button>
              </div>
              {sike && <motion.div className="sike-text">sike 😏</motion.div>}
              <audio ref={audioRef} src={local.sound} loop />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <main className="main-content">
        <header className="page-header">
          <img src={local.cat_typing} alt="cat" />
          <div>
            <h1>Tech Glow-Up Guide <span>by Venky <span id="heart" onClick={heartOnClicked}>💙</span></span></h1>
            
          </div>
        </header>

        <div className="tab-buttons">
          {TAB_ORDER.map((id) => (
            <button
              key={id}
              className={activeTab === id ? 'active' : ''}
              onClick={() => setActiveTab(id)}
            >
              {detailed[id].title}
            </button>
          ))}
        </div>

        <div className="tab-grid">
          {renderAside(activeDetail)}
          {renderContent(activeDetail)}
        </div>

        <footer>Made with <span id="heart" onClick={heartOnClicked}>💙</span>, cats, code, and slightly aggressive charm.</footer>
      </main>
    </div>
  );
}
