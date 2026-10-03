import { ScrollView, StyleSheet, Text } from 'react-native';
import type { MemberLayoutProps } from './types';

export function DefaultMemberLayout({ member, projects }: MemberLayoutProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.name}>{member.name}</Text>
      <Text>{member.role}</Text>
      <Text>{member.tagline}</Text>
      <Text>{member.bio}</Text>

      <Text style={styles.heading}>Skills</Text>
      <Text>{member.skills.join(' · ')}</Text>

      {projects.length > 0 && (
        <>
          <Text style={styles.heading}>Projects</Text>
          {projects.map((project) => (
            <Text key={project.slug}>{project.title}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  name: { fontSize: 28, fontWeight: '700' },
  heading: { fontSize: 20, fontWeight: '700', marginTop: 12 },
});
