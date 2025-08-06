import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CategoryItem {
  title: string;
  itemCount: number;
  color: string;
}

const categories: CategoryItem[] = [
  { title: 'Today', itemCount: 6, color: '#1E40AF' }, // Blue
  { title: 'This week', itemCount: 20, color: '#EA580C' }, // Orange
  { title: 'This month', itemCount: 25, color: '#EC4899' }, // Pink
  { title: 'All tasks', itemCount: 30, color: '#7C2D12' }, // Dark red
  { title: 'Work', itemCount: 16, color: '#0EA5E9' }, // Light blue
  { title: 'Home', itemCount: 10, color: '#7C3AED' }, // Purple
  { title: 'Fun', itemCount: 4, color: '#DC2626' }, // Red
];

function CategoryListItem({ title, itemCount, color }: CategoryItem) {
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({ light: '#687076', dark: '#9BA1A6' }, 'icon');

  return (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryContent}>
        <View style={styles.categoryTextContainer}>
          <ThemedText style={[styles.categoryTitle, { color: textColor }]}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.categorySubtitle, { color: subtitleColor }]}>
            {itemCount} items
          </ThemedText>
        </View>
        <View style={[styles.categoryIndicator, { backgroundColor: color }]} />
      </View>
    </TouchableOpacity>
  );
}

export default function WelcomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({ light: '#687076', dark: '#9BA1A6' }, 'icon');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="menu" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <ThemedText style={[styles.mainTitle, { color: textColor }]}>
            All lists
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: subtitleColor }]}>
            7 categories
          </ThemedText>
        </View>

        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <CategoryListItem
              key={index}
              title={category.title}
              itemCount={category.itemCount}
              color={category.color}
            />
          ))}
        </View>

        {/* Add New List */}
        <TouchableOpacity style={styles.addNewItem}>
          <View style={styles.addNewContent}>
            <ThemedText style={[styles.addNewText, { color: subtitleColor }]}>
              Add a new list..
            </ThemedText>
            <View style={styles.addIconContainer}>
              <MaterialIcons name="add" size={20} color={subtitleColor} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
  },
  titleSection: {
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  categoriesContainer: {
    gap: 0,
  },
  categoryItem: {
    paddingVertical: 20,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  categoryIndicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  addNewItem: {
    paddingVertical: 20,
    marginTop: 16,
    marginBottom: 40,
  },
  addNewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addNewText: {
    fontSize: 20,
    lineHeight: 28,
    flex: 1,
  },
  addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
