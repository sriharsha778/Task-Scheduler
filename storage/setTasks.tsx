import AsyncStorage from "@react-native-async-storage/async-storage";
import { DailyTask, MiscTask, WeeklyTask } from "./getTasks";

const dailyTasksKey = "dailyTasks";
const weeklyTasksKey = "weeklyTasks";
const miscTasksKey = "miscTasks";

export const setDailyTasks = async (tasks: DailyTask[]): Promise<void> => {
  await AsyncStorage.setItem(dailyTasksKey, JSON.stringify(tasks));
};

export const setWeeklyTasks = async (tasks: WeeklyTask[]): Promise<void> => {
  await AsyncStorage.setItem(weeklyTasksKey, JSON.stringify(tasks));
};

export const setMiscTasks = async (tasks: MiscTask[]): Promise<void> => {
  await AsyncStorage.setItem(miscTasksKey, JSON.stringify(tasks));
};
