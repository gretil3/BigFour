import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { members, team, type Member } from '@bigfour/shared';
import { ArrowRightIcon } from '../components/icons';
import { Section, SectionHeader, SectionLede } from '../components/Section';
import { getMemberCutout } from '../lib/assets';
import styles from './MembersPage.module.css';

/** The member's own colors, used only for their avatar and the row's hover glow. */
function memberColors(member: Member): CSSProperties {
  return {
    '--member-hero': member.palette.hero,
    '--member-accent': member.palette.accent,
    '--member-ghost': member.palette.ghost,
  } as CSSProperties;
}

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
      <ul className={styles.list}>
        {members.map((member) => {
          const cutout = getMemberCutout(member.slug);
          return (
            <li key={member.slug}>
              <Link
                to={`/members/${member.slug}`}
                className={styles.row}
                style={memberColors(member)}
              >
                <span className={styles.avatar} aria-hidden="true">
                  {cutout ? (
                    <img className={styles.cutout} src={cutout} alt="" decoding="async" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </span>
                <span className={styles.identity}>
                  <h2 className={styles.name}>{member.name}</h2>
                  <span className={styles.role}>{member.role}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowRightIcon size={22} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
