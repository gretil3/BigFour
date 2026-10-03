import { awards } from '@bigfour/shared';
import { Section, SectionTitle } from '../../components/Section';
import styles from './RecognitionSection.module.css';

export function RecognitionSection() {
  return (
    <Section labelledBy="recognition-title">
      <div className={styles.layout}>
        <SectionTitle
          eyebrow="Recognition"
          title="Awards & hackathons"
          titleId="recognition-title"
          className={styles.heading}
        />
        <ol className={styles.list}>
          {awards.map((award) => (
            <li key={award.title} className={styles.item}>
              <span className={styles.year}>{award.year}</span>
              <div className={styles.body}>
                <span className={styles.title}>{award.title}</span>
                <span className={styles.detail}>{award.detail}</span>
              </div>
              <span className={styles.tag}>{award.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
