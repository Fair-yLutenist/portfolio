import React from 'react';
import BackgroundEffect from '../components/BackgroundEffect';
import BlurText from '../components/BlurText';

const App = () => {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* EFECTO DE FONDO 3D */}
      <BackgroundEffect
        imageSrc="/textures/wall.jpg"
        depthSrc="/textures/wall-depth.webp"
      />

      {/* HEADER */}
      <header className="portfolio-header">
        <a href="#" className="portfolio-logo">
          Amelia Núñez
        </a>
        <nav className="portfolio-nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* NAME */}
      <section
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '32px',
          padding: '0 16px',
          textAlign: 'center',
        }}
      >
        <BlurText
  text="Creating what I once imagined."
  delay={150}
  animateBy="words"
  direction="top"
  className="text-white drop-shadow-2xl justify-center font-['Instrument_Serif'] text-[clamp(1.75rem,5vw,3rem)] leading-tight"
/>
      </section>
    </main>
  );
};

export default App;