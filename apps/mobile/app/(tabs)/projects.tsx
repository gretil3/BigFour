import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProjectsByStatus, projectStatusLabels, projectStatusOrder } from '@bigfour/shared';

export default function ProjectsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {projectStatusOrder.map((status) => {
        const projects = getProjectsByStatus(status);
        if (projects.length === 0) return null;

        return (
          <View key={status} style={styles.group}>
            <Text style={styles.heading}>{projectStatusLabels[status]}</Text>
            {projects.map((project) => (
              <View key={project.slug}>
                <Text style={styles.title}>{project.title}</Text>
                <Text>{project.tagline}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 24 },
  group: { gap: 12 },
  heading: { fontSize: 22, fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '600' },
});
