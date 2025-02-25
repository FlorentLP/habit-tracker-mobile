import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HabitFormProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  initialHabit?: Habit;
};

type Habit = {
  id: string;
  title: string;
  category: string;
  frequency: string;
  priority: 'high' | 'medium' | 'low';
};

const categories = ['Santé', 'Apprentissage', 'Productivité', 'Bien-être'];
const frequencies = ['Quotidien', 'Mar, Jeu, Dim', 'Week-end', 'Week-days'];
const priorities = [
  { value: 'high', label: 'Haute' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'low', label: 'Basse' },
];

export default function HabitForm({
  visible,
  onClose,
  onSave,
  initialHabit,
}: HabitFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Santé');
  const [frequency, setFrequency] = useState('Quotidien');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (initialHabit) {
      setTitle(initialHabit.title);
      setCategory(initialHabit.category);
      setFrequency(initialHabit.frequency);
      setPriority(initialHabit.priority);
    }
  }, [initialHabit]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: initialHabit?.id || Math.random().toString(),
      title: title.trim(),
      category,
      frequency,
      priority,
    });

    setTitle('');
    setCategory('Santé');
    setFrequency('Quotidien');
    setPriority('medium');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {initialHabit ? 'Modifier' : 'Nouvelle'} habitude
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </Pressable>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Titre</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Méditation matinale"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Catégorie</Text>
              <View style={styles.optionsGrid}>
                {categories.map(cat => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.optionButton,
                      category === cat && styles.optionButtonActive,
                    ]}
                    onPress={() => setCategory(cat)}>
                    <Text
                      style={[
                        styles.optionText,
                        category === cat && styles.optionTextActive,
                      ]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Fréquence</Text>
              <View style={styles.optionsGrid}>
                {frequencies.map(freq => (
                  <Pressable
                    key={freq}
                    style={[
                      styles.optionButton,
                      frequency === freq && styles.optionButtonActive,
                    ]}
                    onPress={() => setFrequency(freq)}>
                    <Text
                      style={[
                        styles.optionText,
                        frequency === freq && styles.optionTextActive,
                      ]}>
                      {freq}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Priorité</Text>
              <View style={styles.optionsGrid}>
                {priorities.map(({ value, label }) => (
                  <Pressable
                    key={value}
                    style={[
                      styles.optionButton,
                      priority === value && styles.optionButtonActive,
                    ]}
                    onPress={() => setPriority(value as 'high' | 'medium' | 'low')}>
                    <Text
                      style={[
                        styles.optionText,
                        priority === value && styles.optionTextActive,
                      ]}>
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {initialHabit ? 'Modifier' : 'Ajouter'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  optionButtonActive: {
    backgroundColor: '#7c3aed',
  },
  optionText: {
    color: '#4b5563',
    fontSize: 14,
  },
  optionTextActive: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#7c3aed',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});