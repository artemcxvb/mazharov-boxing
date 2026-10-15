import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const studentsData = [
  { id: 1, name: 'Артём Волков', group: 'Youth', weight: '60 кг', present: true },
  { id: 2, name: 'Дмитрий Соколов', group: 'Elite', weight: '67 кг', present: false },
  { id: 3, name: 'Иван Петров', group: 'Youth', weight: '75 кг', present: true },
  { id: 4, name: 'Кирилл Морозов', group: 'Elite', weight: '66 кг', present: true },
];

const translations = {
  ru: { students: 'Ученики', attendance: 'Посещаемость', schedule: 'Тренировки', progress: 'Прогресс', payments: 'Платежи' },
  en: { students: 'Students', attendance: 'Attendance', schedule: 'Sessions', progress: 'Progress', payments: 'Payments' },
};

export default function App() {
  const [tab, setTab] = useState('students');
  const [lang, setLang] = useState('ru');
  const [students, setStudents] = useState(studentsData);
  const t = translations[lang];

  const togglePresent = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>MAZHAROV <Text style={{ color: '#ff6a00' }}>BOXING</Text></Text>
        <TouchableOpacity onPress={() => setLang(lang === 'ru' ? 'en' : 'ru')}>
          <Text style={styles.lang}>{lang.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{t[tab] || t.students}</Text>
        {students.map(s => (
          <View key={s.id} style={styles.card}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{s.name[0]}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{s.name}</Text>
              <Text style={styles.meta}>{s.group} • {s.weight}</Text>
            </View>
            {tab === 'attendance' && (
              <TouchableOpacity style={[styles.btnSmall, s.present ? styles.btnOk : styles.btnNo]} onPress={() => togglePresent(s.id)}>
                <Text style={styles.btnText}>{s.present ? '✓' : '–'}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.tabbar}>
        {[['students','👥'],['attendance','✅'],['schedule','📅'],['progress','📈'],['payments','💳']].map(([id, icon]) => (
          <TouchableOpacity key={id} style={styles.tab} onPress={() => setTab(id)}>
            <Text style={styles.tabIcon}>{icon}</Text>
            <Text style={[styles.tabLabel, tab === id && styles.tabActive]}>{t[id] || id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0c0c0e' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#2c2c2e' },
  logo: { fontSize: 18, fontWeight: '800', color: '#fff' },
  lang: { color: '#ff6a00', fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 16 },
  card: { backgroundColor: '#161618', borderRadius: 14, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#2c2c2e', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  name: { color: '#fff', fontWeight: '600', fontSize: 16 },
  meta: { color: '#8e8e93', fontSize: 13, marginTop: 2 },
  btnSmall: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  btnOk: { backgroundColor: '#30d158' },
  btnNo: { backgroundColor: '#3a3a3c' },
  btnText: { color: '#fff', fontWeight: '600' },
  tabbar: { flexDirection: 'row', backgroundColor: '#161618', borderTopWidth: 1, borderTopColor: '#2c2c2e', paddingBottom: 20, paddingTop: 8 },
  tab: { flex: 1, alignItems: 'center' },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 10, color: '#8e8e93', marginTop: 2 },
  tabActive: { color: '#ff6a00' },
});