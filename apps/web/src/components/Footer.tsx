import { members, socialPlatformLabels, team } from '@bigfour/shared';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.members}>
          {members.map((member) => (
            <div key={member.slug} className={styles.member}>
              <span className={styles.name}>{member.name}</span>
              <div className={styles.links}>
                {member.socials.map((social) => {
                  const label = socialPlatformLabels[social.platform];
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s ${label}`}
                      className={styles.link}
                    >
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>
            © {currentYear} {team.name}
          </span>
          <span className={styles.sitemap}>Home · Members · Projects</span>
        </div>
      </div>
    </footer>
  );
}
