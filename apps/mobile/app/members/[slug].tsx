import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { getMemberBySlug, getProjectsByMember } from '@bigfour/shared';
import { MemberLayout } from '@/features/members/layouts';

export default function MemberScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const member = getMemberBySlug(slug);

  if (!member) {
    return (
      <View style={{ padding: 16, gap: 12 }}>
        <Text>Member not found.</Text>
        <Link href="/members">Back to members</Link>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: member.name }} />
      <MemberLayout member={member} projects={getProjectsByMember(member.slug)} />
    </>
  );
}
