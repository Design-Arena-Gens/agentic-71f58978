'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

// Scene data
const scenes = [
  {
    id: 1,
    title: "The Routine",
    time: "0:00 - 0:08",
    duration: "8s",
    visual: "WIDE SHOT: A massive, empty warehouse. Rows of silent, towering shelves. SPARK is meticulously polishing a shelf with a small, motorized brush. Its single eye is dull, reflecting its monotonous task.",
    audio: "SFX: Gentle, rhythmic whirring of SPARK's internal mechanisms. A metallic squeak as it moves. MUSIC: Sparse, melancholic piano notes.",
    mood: "melancholic"
  },
  {
    id: 2,
    title: "The Light",
    time: "0:08 - 0:15",
    duration: "7s",
    visual: "SPARK stops its work. Its eye slowly tracks a single, brilliant shaft of golden sunset light streaming through a high, dusty window. The light is beautiful and fleeting. SPARK's eye widens slightly.",
    audio: "MUSIC: A gentle, hopeful piano chord rings out and sustains. The whirring stops.",
    mood: "hopeful"
  },
  {
    id: 3,
    title: "The Failed Capture",
    time: "0:15 - 0:25",
    duration: "10s",
    visual: "SPARK finds a small, clear glass jar and carefully maneuvers it into the beam of light. It quickly closes the lid, hoping to 'capture' the light. It rolls back and opens the jar. It's empty. SPARK's eye droops in disappointment.",
    audio: "SFX: Clink of glass. A sad, deflated whir from SPARK. MUSIC: The hopeful chord fades into silence.",
    mood: "sad"
  },
  {
    id: 4,
    title: "The Discovery",
    time: "0:25 - 0:35",
    duration: "10s",
    visual: "SPARK looks down at its own chest, where a small, flickering light source is located. It looks at the light, then at the empty jar. A spark of realization lights up its eye. It carefully uses its manipulator arm to unscrew its chest light.",
    audio: "MUSIC: A moment of realization. A small, determined, pizzicato string section begins.",
    mood: "determined"
  },
  {
    id: 5,
    title: "The Sharing",
    time: "0:35 - 0:45",
    duration: "10s",
    visual: "SPARK places the now-detached chest light inside the glass jar and screws the lid on. The jar glows warmly. SPARK, now without its chest light, rolls to a dark, forgotten corner. It finds a tiny, broken-down toy robot sitting alone. SPARK gently places the glowing jar next to the toy.",
    audio: "SFX: Gentle, determined rolling. A soft, warm hum from the glowing jar.",
    mood: "warm"
  },
  {
    id: 6,
    title: "The Connection",
    time: "0:45 - 0:55",
    duration: "10s",
    visual: "The light from the jar illuminates the toy robot, casting a warm glow on the dusty corner. SPARK watches, its single eye now reflecting the warm light. SPARK sits next to its new, silent friend, the jar glowing between them like a shared candle. SPARK's eye blinks contentedly. FADE OUT.",
    audio: "MUSIC: Swells to a warm, emotional peak, ending on a final, sustained, hopeful note.",
    mood: "heartwarming"
  }
];

// Animated Robot Component
function SparkRobot({ scene, isPlaying }: { scene: typeof scenes[0]; isPlaying: boolean }) {
  const getMoodColors = () => {
    switch (scene.mood) {
      case 'melancholic': return { eye: '#7a7a9a', light: '#4a4a6a' };
      case 'hopeful': return { eye: '#ffdb99', light: '#ffc04d' };
      case 'sad': return { eye: '#6a8a9a', light: '#3a5a6a' };
      case 'determined': return { eye: '#ffd700', light: '#ffaa00' };
      case 'warm': return { eye: '#ffcc66', light: '#ff9933' };
      case 'heartwarming': return { eye: '#ffdd88', light: '#ffaa44' };
      default: return { eye: '#aaa', light: '#666' };
    }
  };
  
  const colors = getMoodColors();
  const showChestLight = scene.id < 5;
  const showJar = scene.id >= 3;
  const jarGlowing = scene.id >= 5;
  const showToyRobot = scene.id >= 5;
  
  return (
    <div className={styles.sceneVisualization}>
      {/* Warehouse Background */}
      <div className={styles.warehouse}>
        {/* Shelves */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.shelf} style={{ left: `${i * 22 + 5}%` }} />
        ))}
        
        {/* Dust particles */}
        {isPlaying && [...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={styles.dust}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Light beam (scenes 2+) */}
        {scene.id >= 2 && (
          <motion.div 
            className={styles.lightBeam}
            initial={{ opacity: 0 }}
            animate={{ opacity: scene.id === 2 ? 0.8 : 0.4 }}
            transition={{ duration: 1 }}
          />
        )}
        
        {/* Window */}
        <div className={styles.window}>
          <div className={styles.windowFrame} />
        </div>
      </div>
      
      {/* SPARK Robot */}
      <motion.div 
        className={styles.sparkRobot}
        animate={{
          x: scene.id >= 5 ? 80 : 0,
          y: scene.id === 1 ? [0, -5, 0] : 0
        }}
        transition={{ 
          x: { duration: 1 },
          y: { repeat: isPlaying ? Infinity : 0, duration: 2 }
        }}
      >
        {/* Robot Body */}
        <div className={styles.robotBody}>
          {/* Antenna */}
          <div className={styles.antenna}>
            <motion.div 
              className={styles.antennaLight}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
          
          {/* Eye */}
          <motion.div 
            className={styles.robotEye}
            style={{ backgroundColor: colors.eye }}
            animate={{ 
              scaleY: scene.mood === 'sad' ? 0.6 : 1,
              scale: scene.mood === 'hopeful' ? 1.1 : 1
            }}
          >
            <motion.div 
              className={styles.eyeHighlight}
              animate={isPlaying ? { 
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            {/* Blink animation */}
            <motion.div 
              className={styles.eyelid}
              animate={isPlaying ? {
                scaleY: [0, 0, 1, 0, 0]
              } : { scaleY: 0 }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                times: [0, 0.9, 0.92, 0.94, 1]
              }}
            />
          </motion.div>
          
          {/* Chest Light */}
          {showChestLight && (
            <motion.div 
              className={styles.chestLight}
              style={{ backgroundColor: colors.light }}
              animate={scene.id === 4 ? {
                opacity: [1, 0.5, 1, 0],
                scale: [1, 1.2, 1, 0]
              } : {
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: scene.id === 4 ? 0 : Infinity, 
                duration: scene.id === 4 ? 2 : 1.5 
              }}
            />
          )}
          
          {/* Arms */}
          <motion.div 
            className={styles.armLeft}
            animate={scene.id === 1 ? { rotate: [0, 15, 0] } : { rotate: 0 }}
            transition={{ repeat: isPlaying && scene.id === 1 ? Infinity : 0, duration: 1 }}
          />
          <motion.div 
            className={styles.armRight}
            animate={scene.id === 3 || scene.id === 4 ? { rotate: -30 } : { rotate: 0 }}
          />
          
          {/* Treads */}
          <div className={styles.treads}>
            <motion.div 
              className={styles.treadPattern}
              animate={isPlaying ? { x: [-10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Glass Jar */}
      {showJar && (
        <motion.div 
          className={styles.jar}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: scene.id >= 5 ? 120 : 0
          }}
          style={{
            boxShadow: jarGlowing ? `0 0 30px rgba(255, 180, 80, 0.8)` : 'none'
          }}
        >
          <div className={styles.jarLid} />
          {jarGlowing && (
            <motion.div 
              className={styles.jarGlow}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </motion.div>
      )}
      
      {/* Toy Robot */}
      {showToyRobot && (
        <motion.div 
          className={styles.toyRobot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.toyBody}>
            <div className={styles.toyEye} style={{ 
              backgroundColor: jarGlowing ? '#ffcc88' : '#555' 
            }} />
            <div className={styles.toyArm} />
            <div className={styles.toyArm} style={{ right: '-8px', left: 'auto' }} />
          </div>
        </motion.div>
      )}
      
      {/* Scene mood overlay */}
      <div 
        className={styles.moodOverlay}
        style={{
          background: scene.mood === 'heartwarming' || scene.mood === 'warm'
            ? 'radial-gradient(circle at 70% 70%, rgba(255, 180, 80, 0.2), transparent 60%)'
            : scene.mood === 'melancholic' || scene.mood === 'sad'
            ? 'radial-gradient(circle at 50% 50%, rgba(100, 100, 150, 0.2), transparent 60%)'
            : 'transparent'
        }}
      />
    </div>
  );
}

// Scene Card Component
function SceneCard({ 
  scene, 
  isActive, 
  isPlaying,
  onClick 
}: { 
  scene: typeof scenes[0]; 
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div 
      className={`${styles.sceneCard} ${isActive ? styles.activeScene : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.sceneHeader}>
        <span className={styles.sceneNumber}>Scene {scene.id}</span>
        <span className={styles.sceneTime}>{scene.time}</span>
      </div>
      <h3 className={styles.sceneTitle}>{scene.title}</h3>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.sceneDetails}
          >
            <div className={styles.visualBox}>
              <span className={styles.label}>🎬 Visual</span>
              <p>{scene.visual}</p>
            </div>
            <div className={styles.audioBox}>
              <span className={styles.label}>🔊 Audio</span>
              <p>{scene.audio}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Progress Bar Component
function ProgressBar({ currentScene, totalScenes }: { currentScene: number; totalScenes: number }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <motion.div 
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${((currentScene) / totalScenes) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className={styles.progressMarkers}>
        {scenes.map((scene) => (
          <div 
            key={scene.id}
            className={`${styles.marker} ${scene.id <= currentScene ? styles.markerActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const activeScene = scenes.find(s => s.id === currentScene) || scenes[0];

  const goToScene = useCallback((id: number) => {
    if (id >= 1 && id <= scenes.length) {
      setCurrentScene(id);
    }
  }, []);

  const nextScene = useCallback(() => {
    if (currentScene < scenes.length) {
      setCurrentScene(prev => prev + 1);
    } else if (autoPlay) {
      setCurrentScene(1);
    }
  }, [currentScene, autoPlay]);

  const prevScene = useCallback(() => {
    if (currentScene > 1) {
      setCurrentScene(prev => prev - 1);
    }
  }, [currentScene]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay) return;
    
    const durations: Record<number, number> = {
      1: 8000, 2: 7000, 3: 10000, 4: 10000, 5: 10000, 6: 10000
    };
    
    const timer = setTimeout(() => {
      nextScene();
    }, durations[currentScene] || 8000);

    return () => clearTimeout(timer);
  }, [isPlaying, autoPlay, currentScene, nextScene]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevScene();
          break;
        case 'p':
          setIsPlaying(prev => !prev);
          break;
        case 'a':
          setAutoPlay(prev => !prev);
          break;
        default:
          if (e.key >= '1' && e.key <= '6') {
            goToScene(parseInt(e.key));
          }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextScene, prevScene, goToScene]);

  return (
    <main className={styles.main}>
      {/* Header */}
      <motion.header 
        className={styles.header}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>✨</span>
            The Light Collector
          </h1>
          <p className={styles.subtitle}>A Pixar-Style Short Film • 55 Seconds</p>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.badge}>Heartwarming</span>
          <span className={styles.badge}>Non-Verbal</span>
          <span className={styles.badge}>Wall-E Inspired</span>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Visualization Panel */}
        <motion.section 
          className={styles.visualizationPanel}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.visualizationHeader}>
            <h2>Scene {activeScene.id}: {activeScene.title}</h2>
            <span className={styles.duration}>{activeScene.duration}</span>
          </div>
          
          <SparkRobot scene={activeScene} isPlaying={isPlaying} />
          
          {/* Controls */}
          <div className={styles.controls}>
            <button 
              className={styles.controlBtn}
              onClick={prevScene}
              disabled={currentScene === 1}
            >
              ◀ Prev
            </button>
            
            <button 
              className={`${styles.controlBtn} ${styles.playBtn}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            
            <button 
              className={`${styles.controlBtn} ${autoPlay ? styles.activeBtn : ''}`}
              onClick={() => setAutoPlay(!autoPlay)}
            >
              🔄 Auto
            </button>
            
            <button 
              className={styles.controlBtn}
              onClick={nextScene}
              disabled={currentScene === scenes.length && !autoPlay}
            >
              Next ▶
            </button>
          </div>
          
          <ProgressBar currentScene={currentScene} totalScenes={scenes.length} />
        </motion.section>

        {/* Scene List */}
        <motion.section 
          className={styles.sceneList}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>📋 Storyboard</h2>
          <div className={styles.scenesContainer}>
            {scenes.map(scene => (
              <SceneCard 
                key={scene.id}
                scene={scene}
                isActive={scene.id === currentScene}
                isPlaying={isPlaying && scene.id === currentScene}
                onClick={() => goToScene(scene.id)}
              />
            ))}
          </div>
        </motion.section>
      </div>

      {/* Character Info */}
      <motion.section 
        className={styles.characterSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className={styles.characterCard}>
          <div className={styles.characterIcon}>🤖</div>
          <div>
            <h3>SPARK</h3>
            <p>A small, dusty, maintenance robot with one large, expressive optical sensor (eye) and a small, flickering light on its chest.</p>
          </div>
        </div>
        <div className={styles.settingCard}>
          <div className={styles.characterIcon}>🏭</div>
          <div>
            <h3>Setting</h3>
            <p>A vast, abandoned, but still functional, automated warehouse at sunset.</p>
          </div>
        </div>
      </motion.section>

      {/* Footer with keyboard shortcuts */}
      <footer className={styles.footer}>
        <div className={styles.shortcuts}>
          <span><kbd>←</kbd><kbd>→</kbd> Navigate</span>
          <span><kbd>Space</kbd> Next</span>
          <span><kbd>P</kbd> Play/Pause</span>
          <span><kbd>A</kbd> Auto-play</span>
          <span><kbd>1-6</kbd> Jump to scene</span>
        </div>
        <p className={styles.copyright}>The Light Collector • A heartwarming robot story</p>
      </footer>
    </main>
  );
}
