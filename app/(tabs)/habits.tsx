import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import HabitForm from '../../components/HabitForm';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import {db} from '../../config/firebase'

type Habit = {
  id: string;
  title: string;
  category: string;
  frequency: string;
  priority: 'high' | 'medium' | 'low';
  streak: number;
};

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, "habits"), (snapshot) => {
        const newHabits: Habit[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Habit, "id">; // Ensure Firestore doesn't store `id`
          return { id: doc.id, ...data }; // Explicitly set `id` from Firestore metadata
        });
        setHabits(newHabits);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Firestore error:", error);
    }
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const handleSave = async (habit: Habit) => {
    try {
      if (editingHabit) {
        const habitRef = doc(db, "habits", editingHabit.id);
        await updateDoc(habitRef, { ...habit });
      } else {
        await addDoc(collection(db, "habits"), { ...habit, streak: 0 });
      }
      setIsFormVisible(false);
      setEditingHabit(undefined);
    } catch (error) {
      console.error("Firestore error:", error);
    }
  };


  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "habits", id));
    } catch (error) {
      console.error("Firestore error:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return ['#ef4444', '#dc2626'];
      case 'medium':
        return ['#f59e0b', '#d97706'];
      case 'low':
        return ['#10b981', '#059669'];
      default:
        return ['#6b7280', '#4b5563'];
    }
  };

  const renderHabitItem = ({ item }: { item: Habit }) => (
    <Pressable style={styles.habitItem} onPress={() => handleEdit(item)}>
      <LinearGradient
        colors={getPriorityColor(item.priority)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.priorityIndicator}
      />
      <View style={styles.habitContent}>
        <Text style={styles.habitTitle}>{item.title}</Text>
        <View style={styles.habitDetails}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.frequency}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color="#f59e0b" />
          <Text style={styles.streakText}>{item.streak}</Text>
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Mes Habitudes</Text>
            <Text style={styles.subtitle}>
              {habits.length} habitude{habits.length > 1 ? 's' : ''} en cours
            </Text>
          </View>
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => {
          setEditingHabit(undefined);
          setIsFormVisible(true);
        }}>
        <Ionicons name="add" size={32} color="#ffffff" />
      </Pressable>

      <HabitForm
        visible={isFormVisible}
        onClose={() => {
          setIsFormVisible(false);
          setEditingHabit(undefined);
        }}
        onSave={handleSave}
        initialHabit={editingHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  habitItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
  },
  habitContent: {
    flex: 1,
    padding: 16,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  habitDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#4b5563',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 8,
    borderRadius: 16,
  },
  streakText: {
    marginLeft: 4,
    color: '#92400e',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});