import { DailyTask, MiscTask, WeeklyTask } from "@/storage/getTasks";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SwipeableTaskItem } from "../components/SwipeableTaskItem"; // Import the new component

interface HomeScreenProps {
  tasks: {
    daily: DailyTask[];
    weekly: WeeklyTask[];
    misc: MiscTask[];
  };
  onDeleteTask: (taskType: "daily" | "weekly" | "misc", taskId: number) => void;
}

function HomeScreen({ tasks, onDeleteTask }: HomeScreenProps) {
  const { daily, weekly, misc } = tasks;

  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = days[today.getDay()];

  const todaysWeeklyTasks = weekly.filter((task) => task.day === todayName);
  const unfinishedMiscTasks = misc;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.subHeader}>
        Today is <Text style={styles.today}>{todayName}</Text>
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Daily Tasks</Text>
        {daily.length > 0 ? (
          daily.map((task) => (
            <SwipeableTaskItem
              key={task.id}
              onDelete={() => onDeleteTask("daily", task.id)}
              backgroundColor="#d1f7c4"
            >
              <Text style={styles.taskText}>{task.task}</Text>
            </SwipeableTaskItem>
          ))
        ) : (
          <Text style={styles.noTaskText}>No daily tasks for today!</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Weekly Tasks</Text>
        {todaysWeeklyTasks.length > 0 ? (
          todaysWeeklyTasks.map((task) => (
            <SwipeableTaskItem
              key={task.id}
              onDelete={() => onDeleteTask("weekly", task.id)}
              backgroundColor="#e0e7ff"
            >
              <Text style={styles.taskText}>{task.task}</Text>
            </SwipeableTaskItem>
          ))
        ) : (
          <Text style={styles.noTaskText}>No weekly tasks for today!</Text>
        )}

        <Text style={styles.sectionSubHeader}>Miscellaneous Tasks</Text>
        {unfinishedMiscTasks.length > 0 ? (
          unfinishedMiscTasks.map((task) => (
            <SwipeableTaskItem
              key={task.id}
              onDelete={() => onDeleteTask("misc", task.id)}
              backgroundColor="#ffe7c2"
            >
              <Text style={styles.taskText}>{task.task}</Text>
            </SwipeableTaskItem>
          ))
        ) : (
          <Text style={styles.noTaskText}>
            All miscellaneous tasks are done!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
  },
  today: {
    fontWeight: "bold",
    color: "#2a2a72",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 12,
  },
  sectionSubHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e67e22",
    marginTop: 16,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 18,
    color: "#333",
  },
  noTaskText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
});

export default HomeScreen;
