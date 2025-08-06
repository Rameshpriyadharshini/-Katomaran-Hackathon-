import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'Work' | 'Fun' | 'Home';
  important: boolean;
  completed: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Careers advice appointment',
      date: '17/10',
      time: '11:00 - 11:30',
      category: 'Work',
      important: true,
      completed: false,
    },
    {
      id: '2',
      title: 'Return library books',
      date: '17/10',
      time: 'any time',
      category: 'Fun',
      important: true,
      completed: false,
    },
    {
      id: '3',
      title: 'Finish group presentation slides',
      date: '17/10',
      time: '13:00 - 15:00',
      category: 'Work',
      important: false,
      completed: false,
    },
    {
      id: '4',
      title: 'Warhammer Painting',
      date: '17/10',
      time: '18:00 - 20:00',
      category: 'Fun',
      important: false,
      completed: false,
    },
    {
      id: '5',
      title: 'Take out the Rubbish',
      date: '17/10',
      time: 'any time',
      category: 'Home',
      important: false,
      completed: false,
    },
    {
      id: '6',
      title: 'Clean the lounge',
      date: '17/10',
      time: 'any time',
      category: 'Home',
      important: false,
      completed: true,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return '#4A90E2';
      case 'Fun':
        return '#FF6B6B';
      case 'Home':
        return '#98D8C8';
      default:
        return '#D0D0D0';
    }
  };

  const getCheckboxColor = (important: boolean, completed: boolean) => {
    if (completed) {
      return important ? '#E74C3C' : '#4A90E2';
    }
    return important ? '#E74C3C' : '#4A90E2';
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E5BBA" />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Today: 17 October</Text>
          <Text style={styles.headerSubtitle}>
            {completedTasks} of {totalTasks} Items
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Item Section */}
        <TouchableOpacity
          style={styles.addItemSection}
          onPress={() => router.push('/new-task')}
        >
          <Text style={styles.addItemTitle}>Add a new item...</Text>
          <Text style={styles.addItemSubtitle}>Date and time</Text>
          <Text style={styles.addItemSubtitle}>Category</Text>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDateTime}>
                  {task.date} at {task.time}
                </Text>
                <View style={styles.taskTags}>
                  <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(task.category) }]}>
                    <Text style={styles.categoryText}>{task.category}</Text>
                  </View>
                  {task.important && (
                    <View style={styles.importantTag}>
                      <Text style={styles.importantText}>Important</Text>
                    </View>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.checkbox,
                  {
                    borderColor: getCheckboxColor(task.important, task.completed),
                    backgroundColor: task.completed ? getCheckboxColor(task.important, task.completed) : 'transparent',
                  }
                ]}
                onPress={() => toggleTask(task.id)}
              >
                {task.completed && (
                  <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#2E5BBA',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 30,
    paddingTop: 20,
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  menuButton: {
    padding: 8,
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: '#FFFFFF',
    marginVertical: 2,
    borderRadius: 1.5,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  addItemSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  addItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 16,
  },
  addItemSubtitle: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '300',
  },
  tasksList: {
    paddingBottom: 100,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskContent: {
    flex: 1,
    marginRight: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
    lineHeight: 24,
  },
  taskDateTime: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  taskTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  importantTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FFE6E6',
  },
  importantText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E74C3C',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
});
