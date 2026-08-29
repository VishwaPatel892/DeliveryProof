import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeliveryTimeline({ status, timeline }) {
  const statuses = [
    "Assigned",
    "Picked Up",
    "On the Way",
    "Arrived",
    "Delivered"
  ];

  const getTimelineStatus = (currentStatus) => {
    if (currentStatus === "Pending") {
      return "Assigned";
    }
    return currentStatus;
  };

  const currentTimelineStatus = getTimelineStatus(status);
  const currentIndex = statuses.indexOf(currentTimelineStatus);

  return (
    <View style={styles.container}>
      {statuses.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const timestamp = timeline[stage];
        const isLast = index === statuses.length - 1;

        let color = "#A4C3A2";
        let symbol = "○";

        if (isCompleted) {
          color = "#5D7B6F";
          symbol = "✓";
        } else if (isCurrent) {
          color = "#B0D4B8";
          symbol = "●";
        }

        return (
          <View key={stage} style={styles.row}>
            <View style={styles.leftCol}>
              <View style={[styles.circle, { borderColor: color }]}>
                <Text style={[styles.symbol, { color: color }]}>{symbol}</Text>
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: isCompleted ? "#5D7B6F" : "#A4C3A2" }
                  ]}
                />
              )}
            </View>
            <View style={styles.rightCol}>
              <Text
                style={[
                  styles.stageText,
                  { color: isCompleted ? "#5D7B6F" : (isCurrent ? "#5D7B6F" : "#A4C3A2") },
                  isCurrent && styles.currentStageText
                ]}
              >
                {stage}
              </Text>
              {timestamp ? (
                <Text style={styles.timestampText}>{timestamp}</Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    minHeight: 65,
  },
  leftCol: {
    alignItems: 'center',
    width: 32,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAE7D6',
  },
  symbol: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  rightCol: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  stageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentStageText: {
    fontSize: 16,
    fontWeight: '900',
  },
  timestampText: {
    fontSize: 13,
    color: '#5D7B6F',
    marginTop: 2,
  },
});
