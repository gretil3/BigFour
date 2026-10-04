import { useEffect, useRef, useState } from 'react';
import { holdScroll } from '../lib/smoothScroll';
import { CloseIcon, ExternalLinkIcon, LoaderIcon, ReloadIcon } from './icons';
import styles from './LiveDemoDialog.module.css';

interface LiveDemoDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Video played in the window. When set, it takes the place of the live site. */
  trailer?: string;
  /** Page shown in the window when there is no trailer; the site must allow iframe embedding. */
  embedUrl?: string;
  /** Opened by "open in a new tab", when it differs from the embedded page. */
  liveUrl?: string;
}

/**
 * A project's preview in a browser-style window over the page: its trailer when it has one,
 * otherwise its live site. A native modal dialog, so Escape closes it and focus returns to the
 * button that opened it; a click on the backdrop closes it too.
 */
export function LiveDemoDialog({
  open,
  onClose,
  title,
  trailer: trailerSrc,
  embedUrl,
  liveUrl,
}: LiveDemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const siteUrl = liveUrl ?? embedUrl;
  // A trailer this device cannot play gives way to the live site, when there is one.
  const [failedTrailer, setFailedTrailer] = useState<string>();
  const trailer =
    trailerSrc && !(trailerSrc === failedTrailer && embedUrl) ? trailerSrc : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    // Keep the page behind still while the window is open.
    return holdScroll();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      // The page's smooth scroller leaves wheel and touch inside the window to the browser.
      data-lenis-prevent
      aria-label={trailer ? `${title} trailer` : `${title} live demo`}
      onClose={onClose}
      onClick={(event) => {
        // The window fills the dialog, so a click on the dialog itself landed on the backdrop.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.bar}>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.address}>
          {trailer ? (
            <span className={styles.tag}>Trailer</span>
          ) : (
            <span className={styles.live} aria-hidden="true" />
          )}
          <span>{siteUrl ? new URL(siteUrl).host : title}</span>
        </div>
        <button
          type="button"
          className={styles.action}
          aria-label={trailer ? 'Replay trailer' : 'Reload demo'}
          onClick={() => setReloadKey((key) => key + 1)}
        >
          <ReloadIcon size={15} />
        </button>
        {siteUrl && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.action}
            aria-label={`Open ${title} in a new tab`}
          >
            <ExternalLinkIcon size={15} />
          </a>
        )}
        <button
          type="button"
          className={styles.action}
          aria-label="Close preview"
          onClick={onClose}
        >
          <CloseIcon size={17} />
        </button>
      </div>
      {/* Mounted only while open, so closing the window also stops the video. */}
      {open && trailer && (
        <TrailerFrame
          key={`${trailer}-${reloadKey}`}
          src={trailer}
          title={title}
          onError={() => setFailedTrailer(trailer)}
        />
      )}
      {open && !trailer && embedUrl && (
        <DemoFrame key={`${embedUrl}-${reloadKey}`} url={embedUrl} title={title} />
      )}
    </dialog>
  );
}

function TrailerFrame({
  src,
  title,
  onError,
}: {
  src: string;
  title: string;
  onError: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.frame}>
      {!loaded && (
        <div className={styles.loading} role="status">
          <LoaderIcon size={24} />
          Loading trailer…
        </div>
      )}
      {/* Plays on its own every time the window opens, silent and on a loop. No controls, so
          none of that can be changed from the window. */}
      <video
        className={styles.video}
        src={src}
        aria-label={`${title} trailer`}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        data-loaded={loaded ? '' : undefined}
        onCanPlay={() => setLoaded(true)}
        onError={onError}
      />
    </div>
  );
}

function DemoFrame({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.frame}>
      {!loaded && (
        <div className={styles.loading} role="status">
          <LoaderIcon size={24} />
          Loading live demo…
        </div>
      )}
      <iframe
        className={styles.iframe}
        src={url}
        title={`${title} live demo`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
        allow="clipboard-write; fullscreen"
        data-loaded={loaded ? '' : undefined}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
