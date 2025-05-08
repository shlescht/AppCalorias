import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export interface TodaysCaloriesProps {
  total: number;
  consumed: number;
  remaining: number;
  percentage: number;
}

export const TodaysCalories: FC<TodaysCaloriesProps> = ({
  total,
  consumed,
  remaining,
  percentage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix="%" />
      </View>
      <View style={styles.righContainer}>
        <Text style={styles.today}>Today</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Consumed</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLeyend}>Remaining</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  leftContainer: {
    flex: 1,
  },
  righContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rightItemLeyend: {
    flex: 1,
  },
  rightItemValue: {
    flex: 1,
    textAlign: 'right',
  },
  today: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 14,
  },
});
