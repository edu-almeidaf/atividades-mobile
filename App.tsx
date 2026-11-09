import { useCallback, useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import type { SectionListRenderItem } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import motorcyclesData from './src/mocks/motorcycles.json';
import { MotorcycleItem } from './src/components/MotorcycleItem';
import { SectionHeader } from './src/components/SectionHeader';
import { SectionFooter } from './src/components/SectionFooter';
import { ItemSeparator } from './src/components/ItemSeparator';
import { groupByCategory } from './src/utils/groupByCategory';
import type { Motorcycle, MotorcycleSection } from './src/types/motorcycle';
import { colors, spacing } from './src/theme';

const motorcycles = motorcyclesData as Motorcycle[];

export default function App() {
  const sections = useMemo(() => groupByCategory(motorcycles), []);

  const renderItem: SectionListRenderItem<Motorcycle, MotorcycleSection> = useCallback(
    ({ item }) => <MotorcycleItem motorcycle={item} />,
    [],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
          renderSectionFooter={({ section }) => <SectionFooter total={section.data.length} />}
          ItemSeparatorComponent={ItemSeparator}
          stickySectionHeadersEnabled
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Catálogo de Motos</Text>
              <Text style={styles.subtitle}>
                {motorcycles.length} motocicletas em {sections.length} categorias
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          initialNumToRender={20}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
});
