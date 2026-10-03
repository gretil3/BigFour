import { useEffect, useRef, useState } from 'react';
import { CloseIcon, ExternalLinkIcon, LoaderIcon, ReloadIcon } from './icons';
import styles from './LiveDemoDialog.module.css';

interface LiveDemoDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Page shown in the window; the site must allow iframe embedding. */
  embedUrl: string;
  /** Opened by "open in a new tab", when it differs from the embedded page. */
  liveUrl?: string;
}

/**
 * A project's live site in a browser-style window over the page. A native modal dialog, so
 * Escape closes it and focus returns to the button that opened it; a click on the backdrop
 * closes it too.
 */
export function LiveDemoDialog({ open, onClose, title, embedUrl, liveUrl }: LiveDemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    // Keep the page behind still while the window is open.
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = '';
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={`${title} live demo`}
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
          <span className={styles.live} aria-hidden="true" />
          <span>{new URL(embedUrl).host}</span>
        </div>
        <button
          type="button"
          className={styles.action}
          aria-label="Reload demo"
          onClick={() => setReloadKey((key) => key + 1)}
        >
          <ReloadIcon size={15} />
        </button>
        <a
          href={liveUrl ?? embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.action}
          aria-label={`Open ${title} in a new tab`}
        >
          <ExternalLinkIcon size={15} />
        </a>
        <button type="button" className={styles.action} aria-label="Close demo" onClick={onClose}>
          <CloseIcon size={17} />
        </button>
      </div>
      {open && <DemoFrame key={`${embedUrl}-${reloadKey}`} url={embedUrl} title={title} />}
    </dialog>
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
