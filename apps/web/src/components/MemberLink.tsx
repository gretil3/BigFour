import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router';
import { getPortfolioUrl, type Member } from '@bigfour/shared';
import { memberPath } from '../lib/routes';
import styles from './MemberLink.module.css';

interface MemberLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  member: Member;
}

/**
 * Every link to a member: their own portfolio website, in a new tab, when they have one (a
 * `portfolio` social in members.ts), otherwise their profile page on this site.
 */
export function MemberLink({ member, children, ...props }: MemberLinkProps) {
  const portfolioUrl = getPortfolioUrl(member);

  if (!portfolioUrl) {
    return (
      <Link to={memberPath(member)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  );
}
