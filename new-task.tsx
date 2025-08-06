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
  Modal,
  Alert,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface CategoryOption {
  id: string;
  name: string;
  color: string;
}

const categoryOptions: CategoryOption[] = [
  { id: 'work', name: 'Work', color: '#4A90E2' },
  { id: 'fun', name: 'Fun', color: '#FF6B6B' },
  { id: 'home', name: 'Home', color: '#98D8C8' },
];

export default function NewTaskScreen() {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleDone = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please add a description for your task');
      return;
    }
    
    // Here you would typically save the task
    console.log({
      description,
      category: selectedCategory,
      date: selectedDate,
      time: selectedTime,
      important: isImportant,
    });
    
    // Navigate back
    router.back();
  };

  const handleCategorySelect = (category: CategoryOption) => {
    setSelectedCategory(category);
    setShowCategoryModal(false);
  };

  const renderCategorySelector = () => (
    <Modal
      visible={showCategoryModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Category</Text>
          {categoryOptions.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryOption}
              onPress={() => handleCategorySelect(category)}
            >
              <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
              <Text style={styles.categoryOptionText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => setShowCategoryModal(false)}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
            
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.headerTitle}>New Task</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Description Input */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add a description..."
            placeholderTextColor="#BBBBBB"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* Category Selection */}
        <TouchableOpacity 
          style={styles.inputSection}
          onPress={() => setShowCategoryModal(true)}
        >
          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, selectedCategory && styles.inputLabelSelected]}>
              {selectedCategory ? selectedCategory.name : 'Category'}
            </Text>
            <IconSymbol name="chevron.right" size={20} color="#BBBBBB" />
          </View>
        </TouchableOpacity>

        {/* Date Selection */}
        <TouchableOpacity style={styles.inputSection}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Date</Text>
            <IconSymbol name="calendar" size={20} color="#BBBBBB" />
          </View>
        </TouchableOpacity>

        {/* Time Selection */}
        <TouchableOpacity style={styles.inputSection}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Time</Text>
            <IconSymbol name="clock" size={20} color="#BBBBBB" />
          </View>
        </TouchableOpacity>

        {/* Important Toggle */}
        <TouchableOpacity 
          style={styles.inputSection}
          onPress={() => setIsImportant(!isImportant)}
        >
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Important?</Text>
            <View style={[styles.checkbox, isImportant && styles.checkboxChecked]}>
              {isImportant && (
                <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderCategorySelector()}
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
    paddingBottom: 40,
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  descriptionInput: {
    fontSize: 16,
    color: '#2C3E50',
    minHeight: 80,
    fontWeight: '400',
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#BBBBBB',
    fontWeight: '400',
  },
  inputLabelSelected: {
    color: '#2C3E50',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2E5BBA',
    borderColor: '#2E5BBA',
  },
  doneButton: {
    backgroundColor: '#2E5BBA',
    borderRadius: 50,
    paddingVertical: 18,
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#2E5BBA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    minWidth: 250,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  modalCancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#BBBBBB',
    fontWeight: '500',
  },
});
