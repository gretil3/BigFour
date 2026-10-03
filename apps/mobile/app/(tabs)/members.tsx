import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { members } from '@bigfour/shared';

export default function MembersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {members.map((member) => (
        <View key={member.slug}>
          <Link href={{ pathname: '/members/[slug]', params: { slug: member.slug } }}>
            <Text style={styles.name}>{member.name}</Text>
          </Link>
          <Text>{member.role}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  name: { fontSize: 18, fontWeight: '600' },
});
