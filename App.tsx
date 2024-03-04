import { StatusBar } from 'expo-status-bar';
import courseData from './assets/result.json';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [courseName, setCourseName] = useState('');
  const [prerequisites, setPrerequisites] = useState('');

  useEffect(() => {
    fetchPrerequisites();
  }, [courseName]);

  const fetchPrerequisites = () => {
    const course = courseData.find(c => c.identifier === courseName.toUpperCase());
    if (course && course.prerequisites) {
      const prereqs = course.prerequisites.courses.map(pr => {
        if (typeof pr === 'string') {
          return pr;
        } else if (pr.type === 'or') {
          return '(' + pr.courses.join(' OR ') + ')';
        } else if (pr.type === 'and') {
          return '(' + pr.courses.join(' AND ') + ')';
        }
        return '';
      }).join(' AND ');
      setPrerequisites(`${prereqs}`);
    } else {
      setPrerequisites('No prerequisites found or course does not exist.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Course Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCourseName}
        value={courseName}
        placeholder="e.g. MATH 3012"
      />
      <Text style={styles.prereq_header}>Prerequisites Info</Text>
      {prerequisites ? (
        <Text style={styles.prerequisites}>Prerequisites: {prerequisites}</Text>
      ) : null}
      <StatusBar style="auto" />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  prereq_header: {
    marginTop: 20,
    textAlign: 'center',
    color: '#003057',
    fontWeight: 'bold',
  },
  prerequisites: {
    marginTop: 20,
    textAlign: 'center',
  },
});
