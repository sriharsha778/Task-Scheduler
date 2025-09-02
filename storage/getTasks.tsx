import AsyncStorage from "@react-native-async-storage/async-storage";

const dailyTasksKey = "dailyTasks";
const weeklyTasksKey = "weeklyTasks";
const miscTasksKey = "miscTasks";

export interface DailyTask {
  id: number;
  task: string;
}
export interface WeeklyTask {
  id: number;
  task: string;
  day: string;
}
export interface MiscTask {
  id: number;
  task: string;
}

export const getDailyTasks = async (): Promise<DailyTask[]> => {
  const dailyTasks = await AsyncStorage.getItem(dailyTasksKey);
  if (dailyTasks) {
    return JSON.parse(dailyTasks);
  } else {
    return [];
  }
};

export const getWeeklyTasks = async (): Promise<WeeklyTask[]> => {
  const weeklyTasks = await AsyncStorage.getItem(weeklyTasksKey);
  if (weeklyTasks) {
    return JSON.parse(weeklyTasks);
  } else {
    return [];
  }
};

export const getMiscTasks = async (): Promise<MiscTask[]> => {
  const miscTasks = await AsyncStorage.getItem(miscTasksKey);
  if (miscTasks) {
    return JSON.parse(miscTasks);
  } else {
    return [];
  }
};
