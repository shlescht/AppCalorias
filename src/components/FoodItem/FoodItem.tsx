import {Alert, StyleSheet, Text, View} from 'react-native';
import {Meal} from '../../types';
import {Button, Icon} from '@rneui/themed';
import {handleDeleteTodaysFood, handleSaveTodaysFood} from '../../hooks';
interface FoodItemProps {
  food: Meal;
  todays: boolean;
  onComplete?: () => void
}

export const FoodItem = ({food, todays, onComplete}: FoodItemProps) => {
  const handleAddTodaysFoodButton = async () => {
    try {
      const {cal, portion, name} = food;
      await handleSaveTodaysFood({cal, portion, name});
      Alert.alert(
        `Alimento '${food.name}' agregado correctamente.`,
        'El alimento se ha agregado correctamente',
      );
    } catch (error) {
      Alert.alert('Error', 'Error al agregar el alimento');
      console.error('Error', error);
    }
  };

  const handleDeleteTodaysFoodButton = async (item: string) => {
    await handleDeleteTodaysFood(item);
    onComplete?.();
  };

  return (
    <View>
      <View style={styles.upper}>
        <Text style={styles.text}>{food.name}</Text>
        <Button
          type="clear"
          onPress={() => {
            if (!todays) {
              handleAddTodaysFoodButton();
            } else {
              handleDeleteTodaysFoodButton(food.name);
            }
          }}>
          <Icon
            name={!todays ? 'plus' : 'minus'}
            type="font-awesome"
            color="black"
          />
        </Button>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.text}>{food.portion}</Text>
        <Text style={styles.text}>{food.cal} KCal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    // height: 450,
  },
  listContainer: {},
  upper: {
    borderTopLeftRadius: 10,
    borderEndStartRadius: 10,
    backgroundColor: '#ade8af',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  bottom: {
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#ade8af',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'black',
  },
});
