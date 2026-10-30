'use client';

import { useEffect, useState } from 'react';
import labPhoto from '../assets/images/lab1.webp';
import teamPhoto from '../assets/images/lab2.webp';
import firstResult from '../assets/images/result1.webp';
import secondResult from '../assets/images/result2.webp';

const slides = [
  { image: labPhoto, caption: 'In the lab, working on an amplitude and frequency modulation (AM & FM) experiment.' },
  { image: teamPhoto, caption: 'A team discussion during laboratory research.' },
  { image: firstResult, caption: 'Displaying the modulated FM signal.' },
  { image: secondResult, caption: 'Analyzing experimental results with an oscilloscope.' },
];

export default function ResearchSlideshow() {
  const [current, setCurrent] = useState(0);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (interacting || motion.matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !motion.matches) setCurrent(previous => (previous + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [interacting]);
  const slide = slides[current];
  return <section className="research-slideshow" aria-label="Photos from the laboratory" aria-roledescription="carousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <figure className="research-figure">
      <img src={slide.image.src} alt={slide.caption} width={slide.image.width} height={slide.image.height} loading="lazy" />
      <figcaption aria-live={interacting ? 'polite' : 'off'}>{slide.caption}</figcaption>
    </figure>
    <div className="research-slide-controls">
      <div className="research-slide-dots">{slides.map((item, index) => <button type="button" key={item.image.src} aria-label={`Show photo ${index + 1}: ${item.caption}`} aria-current={index === current ? 'true' : undefined} onClick={() => setCurrent(index)}><span /></button>)}</div>
    </div>
  </section>;
}
