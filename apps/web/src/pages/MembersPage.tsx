import { Link } from 'react-router';
import { members, team } from '@bigfour/shared';
import { Section, SectionHeader, SectionLede } from '../components/Section';
import { formatIndex } from '../lib/format';
import { paletteStyle } from '../lib/palette';
import styles from './MembersPage.module.css';

export function MembersPage() {
  return (
    <Section labelledBy="members-title">
      <title>{`Members · ${team.name}`}</title>
      <SectionHeader
        as="h1"
        eyebrow="The team"
        title="Members"
        titleId="members-title"
        aside={<SectionLede>{team.description}</SectionLede>}
      />
      <ul className={styles.grid}>
        {members.map((member, index) => (
          <li key={member.slug}>
            <Link
              to={`/members/${member.slug}`}
              className={styles.card}
              style={paletteStyle(member.palette)}
            >
              <span className={styles.swatch} aria-hidden="true">
                {member.name.charAt(0)}
              </span>
              <span className={styles.number}>{formatIndex(index + 1)}</span>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.role}>{member.role}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
