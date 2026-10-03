import { useParams } from 'react-router';
import { getMemberBySlug, getProjectsByMember, getServicesLedBy } from '@bigfour/shared';
import { MemberLayout } from '../features/members/layouts';
import { useMemberTheme } from '../lib/theme';
import { NotFoundPage } from './NotFoundPage';

export function MemberPage() {
  const { slug = '' } = useParams();
  const member = getMemberBySlug(slug);
  // Every layout gets the member's palette across the whole site.
  useMemberTheme(member);

  if (!member) {
    return <NotFoundPage />;
  }

  return (
    <MemberLayout
      member={member}
      services={getServicesLedBy(member.slug)}
      projects={getProjectsByMember(member.slug)}
    />
  );
}
