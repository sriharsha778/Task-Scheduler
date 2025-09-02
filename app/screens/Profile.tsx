import { Image, StyleSheet, Text, View } from "react-native";

let username = "JohnDoe"; // Example username
let userDetails = {
  email: "john.doe@example.com",
  joined: "Jan 2024",
};

let achievements = {
  dailyTasksDone: 15,
  weeklyTasksDone: 8,
  totalTasks: 23,
};

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.w-L3HP_7QYalYXw7apT2tAHaHx%3Fr%3D0%26pid%3DApi&f=1&ipt=8b018c06d6fb5ba1af5d0fda14f1f8bcf1427b7104f903ee1e3b6da413fe2c12&ipo=images",
        }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{username}</Text>
      <View style={styles.detailsCard}>
        <Text style={styles.detailsHeader}>User Details</Text>
        <Text style={styles.detailsText}>Email: {userDetails.email}</Text>
        <Text style={styles.detailsText}>Joined: {userDetails.joined}</Text>
      </View>
      <View style={styles.achievementsCard}>
        <Text style={styles.achievementsHeader}>Achievements</Text>
        <View style={styles.achievementRow}>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementNumber}>
              {achievements.dailyTasksDone}
            </Text>
            <Text style={styles.achievementLabel}>Daily Tasks Done</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementNumber}>
              {achievements.weeklyTasksDone}
            </Text>
            <Text style={styles.achievementLabel}>Weekly Tasks Done</Text>
          </View>
          <View style={styles.achievementItem}>
            <Text style={styles.achievementNumber}>
              {achievements.totalTasks}
            </Text>
            <Text style={styles.achievementLabel}>Total Tasks</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7f8fa",
    paddingTop: 32,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#2a2a72",
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "85%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  achievementsCard: {
    backgroundColor: "#e0e7ff",
    borderRadius: 16,
    padding: 16,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a2a72",
    marginBottom: 12,
    textAlign: "center",
  },
  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  achievementItem: {
    alignItems: "center",
    flex: 1,
  },
  achievementNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a2a72",
  },
  achievementLabel: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
    textAlign: "center",
  },
});

export default ProfileScreen;
