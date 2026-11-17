"use client";

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { workProjects, type WorkFilm } from '@/lib/featured-work';
import styles from './FeaturedWorkStokt.module.css';

const copy = {
  en: {
    tag: '[ Selected Projects ]', heading: 'Featured Work', allWork: 'Explore all 9 films',
    watch: 'Watch project', films: 'films', film: 'film', close: 'Close gallery',
    previous: 'Previous film', next: 'Next film', selected: 'Selected films',
    soundOn: 'Sound on', soundOff: 'Sound off', loading: 'Loading film…',
    error: 'This film could not be loaded.', download: 'Open video',
    instagram: 'Watch on Instagram', newTab: 'opens in a new tab',
    hint: '← → Browse films · Esc to close',
  },
  fr: {
    tag: '[ Projets Sélectionnés ]', heading: 'Nos Réalisations', allWork: 'Voir les 9 films',
    watch: 'Voir le projet', films: 'films', film: 'film', close: 'Fermer la galerie',
    previous: 'Film précédent', next: 'Film suivant', selected: 'Sélection de films',
    soundOn: 'Activer le son', soundOff: 'Couper le son', loading: 'Chargement du film…',
    error: 'Ce film n’a pas pu être chargé.', download: 'Ouvrir la vidéo',
    instagram: 'Voir sur Instagram', newTab: 's’ouvre dans un nouvel onglet',
    hint: '← → Parcourir les films · Échap pour fermer',
  },
};
type GalleryCopy = (typeof copy)['en'];
type Selection = { project: number; film: number };

function PlayIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z" /></svg>;
}

export default function FeaturedWork() {
  const { lang } = useLanguage();
  const [selection, setSelection] = useState<Selection | null>(null);
  const reducedMotion = useReducedMotion();
  const t = copy[lang];

  return (
    <section id="work" className={styles.section} aria-labelledby="featured-work-heading">
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>{t.tag}</p>
            <h2 id="featured-work-heading" className={styles.heading}>{t.heading}</h2>
          </div>
          <button className={styles.allWork} onClick={() => setSelection({ project: 0, film: 0 })}>
            {t.allWork} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className={styles.grid}>
          {workProjects.map((project, index) => (
            <button key={project.id} className={`${styles.card} ${project.wide ? styles.wide : styles.narrow}`}
              aria-label={`${t.watch}: ${project.name}, ${project.films.length} ${project.films.length === 1 ? t.film : t.films}`}
              aria-haspopup="dialog" onClick={() => setSelection({ project: index, film: 0 })}>
              <Image src={project.cover} alt="" fill sizes={project.wide ? '(max-width: 767px) 100vw, 66vw' : '(max-width: 767px) 100vw, 33vw'} className={styles.cover} style={{ objectPosition: project.coverPosition }} />
              <span className={styles.shade} />
              <span className={styles.count}>{String(project.films.length).padStart(2, '0')} {project.films.length === 1 ? t.film : t.films}</span>
              <span className={styles.play}><PlayIcon /></span>
              <span className={styles.cardInfo}>
                <span className={styles.category}>{project.category[lang]}</span>
                <span className={styles.brand}>{project.name}</span>
                <span className={styles.watch}>{t.watch} <span aria-hidden="true">↗</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selection !== null && <ProjectGallery key="work-gallery" projectIndex={selection.project} filmIndex={selection.film}
            onSelect={setSelection} onClose={() => setSelection(null)} reducedMotion={!!reducedMotion} />}
        </AnimatePresence>, document.body,
      )}
    </section>
  );
}

function ProjectGallery({ projectIndex, filmIndex, onSelect, onClose, reducedMotion }: {
  projectIndex: number; filmIndex: number; onSelect: (selection: Selection) => void;
  onClose: () => void; reducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const project = workProjects[projectIndex];
  const film = project.films[filmIndex];
  const close = () => { videoRef.current?.pause(); onClose(); };
  const changeFilm = (direction: number) => onSelect({ project: projectIndex, film: (filmIndex + direction + project.films.length) % project.films.length });

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.dialog ref={dialogRef} className={styles.dialog} aria-labelledby="work-gallery-heading"
      initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.98 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }}
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest('video') || project.films.length < 2) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); changeFilm(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
      <header className={styles.galleryHeader}>
        <span className={styles.eyebrow}>{t.selected} <span className={styles.total}>/ 09</span></span>
        <button autoFocus className={styles.close} aria-label={t.close} onClick={close}>✕</button>
      </header>
      <nav className={styles.brandTabs} aria-label={lang === 'en' ? 'Choose a project' : 'Choisir un projet'}>
        {workProjects.map((item, index) => (
          <button key={item.id} aria-pressed={index === projectIndex} onClick={() => onSelect({ project: index, film: 0 })}>
            {item.name}<span>{String(item.films.length).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>
      <div className={styles.galleryBody}>
        <div className={styles.stage}>
          <AnimatePresence mode="wait" initial={false}>
            <FilmPlayer key={film.id} film={film} title={film.title[lang]} t={t} reducedMotion={reducedMotion} videoRef={videoRef} />
          </AnimatePresence>
        </div>
        <div className={styles.details}>
          <p className={styles.eyebrow}>{project.category[lang]}</p>
          <h3 id="work-gallery-heading" className={styles.projectTitle}>{project.name}</h3>
          <p className={styles.description}>{project.description[lang]}</p>
          <div className={styles.filmHeading}>
            <p className={styles.eyebrow}>{String(filmIndex + 1).padStart(2, '0')} / {String(project.films.length).padStart(2, '0')}</p>
            {project.films.length > 1 && <div className={styles.arrows}>
              <button aria-label={t.previous} onClick={() => changeFilm(-1)}>←</button>
              <button aria-label={t.next} onClick={() => changeFilm(1)}>→</button>
            </div>}
          </div>
          <p className={styles.filmTitle} aria-live="polite">{film.title[lang]}</p>
          <a
            className={styles.instagramLink}
            href={`https://www.instagram.com/reel/${film.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.instagram}: ${film.title[lang]} (${t.newTab})`}
            onClick={() => videoRef.current?.pause()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
            </svg>
            {t.instagram}
            <span aria-hidden="true">↗</span>
          </a>
          <div className={styles.playlist} aria-label={project.name}>
            {project.films.map((item, index) => (
              <button key={item.id} className={styles.playlistItem} aria-pressed={filmIndex === index} onClick={() => onSelect({ project: projectIndex, film: index })}>
                <span className={styles.thumbnail}><Image src={item.poster} alt="" fill sizes="48px" /></span>
                <span className={styles.playlistText}><span>{item.title[lang]}</span><small>{item.duration}</small></span>
                <span className={styles.smallPlay}><PlayIcon /></span>
              </button>
            ))}
          </div>
          <p className={styles.keyboardHint}>{t.hint}</p>
        </div>
      </div>
    </motion.dialog>
  );
}

function FilmPlayer({ film, title, t, reducedMotion, videoRef }: {
  film: WorkFilm; title: string; t: GalleryCopy; reducedMotion: boolean; videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  return (
    <motion.div className={styles.film} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
      <video ref={videoRef} src={film.src} poster={film.poster} aria-label={title} controls playsInline autoPlay muted={muted} preload="metadata"
        onLoadedData={() => setLoading(false)} onError={() => { setLoading(false); setFailed(true); }} onVolumeChange={(event) => setMuted(event.currentTarget.muted)} />
      {!failed && <button className={styles.sound} onClick={() => setMuted(!muted)}>{muted ? t.soundOn : t.soundOff} <span aria-hidden="true">{muted ? '＋' : '−'}</span></button>}
      {loading && <span className={styles.loading} role="status">{t.loading}</span>}
      {failed && <div className={styles.playerError} role="alert"><p>{t.error}</p><a href={film.src}>{t.download} ↗</a></div>}
    </motion.div>
  );
}
