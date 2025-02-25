import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    {
      icon: 'notifications',
      title: 'Notifications',
      type: 'switch',
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      icon: 'moon',
      title: 'Mode sombre',
      type: 'switch',
      value: darkMode,
      onValueChange: setDarkMode,
    },
    {
      icon: 'settings',
      title: 'Paramètres',
      type: 'link',
    },
    {
      icon: 'help-circle',
      title: 'Aide & Support',
      type: 'link',
    },
    {
      icon: 'information-circle',
      title: 'À propos',
      type: 'link',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>Jean Dupont</Text>
        <Text style={styles.email}>jean.dupont@exemple.fr</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Pressable
            key={item.title}
            style={[styles.menuItem, index === 0 && styles.menuItemFirst]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color="#6b7280" />
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            {item.type === 'switch' ? (
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#d1d5db', true: '#7c3aed' }}
                thumbColor={item.value ? '#ffffff' : '#ffffff'}
              />
            ) : (
              <Ionicons name="chevron-forward" size={24} color="#6b7280" />
            )}
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <Ionicons name="log-out" size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginTop: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  menuItemFirst: {
    borderTopWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
});