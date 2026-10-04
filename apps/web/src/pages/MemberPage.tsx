import { useParams } from 'react-router';
import { getMemberBySlug, getProjectsByMember, getServicesLedBy } from '@bigfour/shared';
import { MemberLayout } from '../features/members/layouts';
import { useThemeOverride } from '../lib/theme';
import { NotFoundPage } from './NotFoundPage';

export function MemberPage() {
  const { slug = '' } = useParams();
  const member = getMemberBySlug(slug);
  // While it is open, a member's page wears their theme across the whole site.
  useThemeOverride(member);

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
