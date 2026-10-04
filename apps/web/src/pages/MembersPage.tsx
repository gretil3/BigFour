import type { CSSProperties } from 'react';
import { getPortfolioUrl, members, team, type Member } from '@bigfour/shared';
import { ArrowRightIcon, ArrowUpRightIcon } from '../components/icons';
import { MemberLink } from '../components/MemberLink';
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
              <MemberLink member={member} className={styles.row} style={memberColors(member)}>
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
                  {/* Up-right when the row leaves for the member's own site. */}
                  {getPortfolioUrl(member) ? (
                    <ArrowUpRightIcon size={22} />
                  ) : (
                    <ArrowRightIcon size={22} />
                  )}
                </span>
              </MemberLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
