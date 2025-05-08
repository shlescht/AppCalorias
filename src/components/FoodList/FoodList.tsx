import {Meal} from '../../types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {FoodItem} from '../FoodItem';

interface FoodListProps {
  food: Meal[],
  todays: boolean,
  onComplete?: () => void
}
// al desestructurar los props, se puede definir el tipo de la propiedad
// como {food}: {food: Meal[]} ya que food es un array de tipo Meal
// y debemos desestructar los props para obtener el valor de food
// no podemos definir el tipo de la propiedad como {food: Meal[]} ya que
// food es un array de tipo Meal
export const FoodList = ({food, todays, onComplete}: FoodListProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.listContainer}>
        {food?.map((item: Meal, index: number) => {
            // el key es un valor unico que se le asigna a cada elemento de la lista
            // no se necesita enviar como prop, solo se le asigna al elemento
            // y react se encarga de manejarlo
          return <FoodItem food={item} key={index} todays={todays} onComplete={onComplete} />;
        })}
      </View>
    </ScrollView>
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
