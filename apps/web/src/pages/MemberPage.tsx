import { useParams } from 'react-router';
import { getMemberBySlug, getProjectsByMember, getServicesLedBy } from '@bigfour/shared';
import { MemberLayout } from '../features/members/layouts';
import { NotFoundPage } from './NotFoundPage';

export function MemberPage() {
  const { slug = '' } = useParams();
  const member = getMemberBySlug(slug);

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
