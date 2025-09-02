import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -width * 0.3; // Distance to swipe before it snaps

interface SwipeableTaskItemProps {
  children: React.ReactNode;
  onDelete: () => void;
  backgroundColor: string;
}

export const SwipeableTaskItem: React.FC<SwipeableTaskItemProps> = ({
  children,
  onDelete,
  backgroundColor,
}) => {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      // Snap to fully open if swipe is past threshold
      const shouldBeDismissed = event.translationX < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        // Run the delete action on the JS thread
        runOnJS(onDelete)();
      } else {
        // Snap back to original position
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -20 ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      {/* The background "delete" button */}
      <Animated.View style={[styles.deleteButton, rTaskContainerStyle]}>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButtonTouchable}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* The foreground content that slides */}
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.taskItem, { backgroundColor }, rStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  taskItem: {
    padding: 12,
    minHeight: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 16,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: width * 0.25,
    backgroundColor: "#ff4c4c",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonTouchable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
