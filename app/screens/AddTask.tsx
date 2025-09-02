import {
  getDailyTasks,
  getMiscTasks,
  getWeeklyTasks,
} from "@/storage/getTasks";
import {
  setDailyTasks,
  setMiscTasks,
  setWeeklyTasks,
} from "@/storage/setTasks";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface AddTaskScreenProps {
  onTaskAdded: () => void;
}

function AddTaskScreen({ onTaskAdded }: AddTaskScreenProps) {
  const [task, setTask] = useState("");
  const [type, setType] = useState("daily");
  const [day, setDay] = useState(days[0]);
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (task.trim()) {
      try {
        switch (type) {
          case "daily":
            const dailyTasks = await getDailyTasks();
            const newDailyId =
              dailyTasks.length > 0
                ? Math.max(...dailyTasks.map((t) => t.id)) + 1
                : 1;
            const newDailyTask = { id: newDailyId, task };
            await setDailyTasks([...dailyTasks, newDailyTask]);
            break;
          case "weekly":
            const weeklyTasks = await getWeeklyTasks();
            const newWeeklyId =
              weeklyTasks.length > 0
                ? Math.max(...weeklyTasks.map((t) => t.id)) + 1
                : 1;
            const newWeeklyTask = { id: newWeeklyId, task, day };
            await setWeeklyTasks([...weeklyTasks, newWeeklyTask]);
            break;
          case "misc":
            const miscTasks = await getMiscTasks();
            const newMiscId =
              miscTasks.length > 0
                ? Math.max(...miscTasks.map((t) => t.id)) + 1
                : 1;
            const newMiscTask = { id: newMiscId, task };
            await setMiscTasks([...miscTasks, newMiscTask]);
            break;
        }

        onTaskAdded();
        navigation.goBack();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Add New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task name"
            value={task}
            onChangeText={setTask}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.label}>Type of Task</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={type}
              style={styles.picker}
              onValueChange={setType}
            >
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Miscellaneous" value="misc" />
            </Picker>
          </View>
          {type === "weekly" && (
            <>
              <Text style={styles.label}>Day</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={day}
                  style={styles.picker}
                  onValueChange={setDay}
                >
                  {days.map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>
            </>
          )}
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f7f8fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    shadowColor: "#2a2a72",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#2a2a72",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e7ff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    fontSize: 17,
    backgroundColor: "#f7f8fa",
    color: "#2a2a72",
  },
  label: {
    fontSize: 16,
    color: "#2a2a72",
    marginBottom: 8,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  pickerWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e7ff",
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: "#f7f8fa",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 60, // Increased height for better visibility
    color: "#2a2a72",
  },
  addBtn: {
    backgroundColor: "#2a2a72",
    paddingHorizontal: 38,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
    width: "100%",
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  closeBtn: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 38,
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 4,
  },
  closeBtnText: {
    color: "#2a2a72",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default AddTaskScreen;
