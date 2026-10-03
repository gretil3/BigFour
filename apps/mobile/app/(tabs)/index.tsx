import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { team } from '@bigfour/shared';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{team.name}</Text>
      <Text>{team.tagline}</Text>
      <Text>{team.description}</Text>
      <Link href="/members">Meet the members</Link>
      <Link href="/projects">See our projects</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  title: { fontSize: 28, fontWeight: '700' },
});
