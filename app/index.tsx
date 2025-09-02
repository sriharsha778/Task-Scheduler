import {
  getDailyTasks,
  getMiscTasks,
  getWeeklyTasks,
} from "@/storage/getTasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddTaskScreen from "./screens/AddTask";
import HomeScreen from "./screens/HomePage";
import Profile from "./screens/Profile";
import Setting from "./screens/Settings";

// Define interfaces for your data structures
interface DailyTask {
  id: number;
  task: string;
}
interface WeeklyTask {
  id: number;
  task: string;
  day: string;
}
interface MiscTask {
  id: number;
  task: string;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState<{
    daily: DailyTask[];
    weekly: WeeklyTask[];
    misc: MiscTask[];
  }>({
    daily: [],
    weekly: [],
    misc: [],
  });

  const fetchTasks = async () => {
    try {
      const daily = await getDailyTasks();
      const weekly = await getWeeklyTasks();
      const misc = await getMiscTasks();
      setTasks({ daily, weekly, misc });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleTaskDeleted = async (
    taskType: "daily" | "weekly" | "misc",
    taskId: number
  ) => {
    let updatedTasks = [];
    let key = "";

    switch (taskType) {
      case "daily":
        updatedTasks = tasks.daily.filter((task) => task.id !== taskId);
        await AsyncStorage.setItem("dailyTasks", JSON.stringify(updatedTasks));
        break;
      case "weekly":
        updatedTasks = tasks.weekly.filter((task) => task.id !== taskId);
        await AsyncStorage.setItem("weeklyTasks", JSON.stringify(updatedTasks));
        break;
      case "misc":
        updatedTasks = tasks.misc.filter((task) => task.id !== taskId);
        await AsyncStorage.setItem("miscTasks", JSON.stringify(updatedTasks));
        break;
    }

    fetchTasks();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            paddingBottom: 5,
            borderCurve: "circular",
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
          }}
        >
          {() => <HomeScreen tasks={tasks} onDeleteTask={handleTaskDeleted} />}
        </Tab.Screen>
        <Tab.Screen
          name="AddTask"
          options={{
            tabBarIcon: () => <Text style={styles.plusText}>+</Text>,
            tabBarButton: (props) => (
              <TouchableOpacity style={styles.plusBtn} onPress={props.onPress}>
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            ),
          }}
        >
          {() => <AddTaskScreen onTaskAdded={handleTaskAdded} />}
        </Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={Setting}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>⚙️</Text>,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 22 }}>👤</Text>,
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  plusBtn: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a72",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  plusText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});
