import type { ReactNode } from 'react';
import { cx } from '../lib/cx';
import styles from './Section.module.css';

interface SectionProps {
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** Centered, max-width page section with the design's standard padding. */
export function Section({ labelledBy, className, children }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={cx(styles.section, className)}>
      {children}
    </section>
  );
}

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  titleId: string;
  /** Use 'h1' when the section title is the page title. */
  as?: 'h1' | 'h2';
  className?: string;
}

/** Mono eyebrow over a large heading. */
export function SectionTitle({
  eyebrow,
  title,
  titleId,
  as: Heading = 'h2',
  className,
}: SectionTitleProps) {
  return (
    <div className={cx(styles.titleGroup, className)}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Heading id={titleId} className={styles.title}>
        {title}
      </Heading>
    </div>
  );
}

interface SectionHeaderProps extends Omit<SectionTitleProps, 'className'> {
  /** Content aligned to the right of the title, such as a lede or a link. */
  aside?: ReactNode;
  className?: string;
}

export function SectionHeader({ aside, className, ...titleProps }: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, className)}>
      <SectionTitle {...titleProps} />
      {aside}
    </div>
  );
}

export function SectionLede({ children }: { children: ReactNode }) {
  return <p className={styles.lede}>{children}</p>;
}
