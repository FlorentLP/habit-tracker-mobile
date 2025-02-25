import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
};

export default function TodayScreen() {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: 'Méditation matinale',
      completed: false,
      category: 'Santé',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Lecture 30 minutes',
      completed: false,
      category: 'Apprentissage',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Exercice physique',
      completed: false,
      category: 'Santé',
      priority: 'high',
    },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
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

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <Pressable
      onPress={() => toggleTodo(item.id)}
      style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <LinearGradient
        colors={getPriorityColor(item.priority)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.priorityIndicator}
      />
      <View style={styles.todoContent}>
        <Text style={[styles.todoTitle, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.checkboxContainer}>
        {item.completed ? (
          <Ionicons name="checkmark-circle" size={24} color="#10b981" />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#9ca3af" />
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.subtitle}>
          {todos.filter(t => t.completed).length} sur {todos.length} complétés
        </Text>
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  date: {
    fontSize: 24,
    fontWeight: '600',
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
  todoItem: {
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
  todoContent: {
    flex: 1,
    padding: 16,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  completedTodo: {
    opacity: 0.7,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  checkboxContainer: {
    padding: 16,
  },
});