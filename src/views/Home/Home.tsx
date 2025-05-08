import {Alert, View} from 'react-native';
import {Header} from '../../components/Header';
import {Calories} from '../../components/Calories';
import {handleGetTodaysFood} from '../../hooks';
import {useCallback, useState} from 'react';
import {Meal} from '../../types';
import {FoodList} from '../../components/FoodList';
import {useFocusEffect} from '@react-navigation/native';
import {
  TodaysCalories,
  TodaysCaloriesProps,
} from '../../components/TodaysCalories';

export const Home = () => {
  const TOTAL_CALORIES = 2000
  const [todaysFood, setTodaysFood] = useState<Meal[]>([]);
  const [todaysStatistics, setTodaysStatistics] = useState<TodaysCaloriesProps>(
    {total: 0, consumed: 0, remaining: 0, percentage: 0},
  );

  const calculateTodaysStatistics = (food: Meal[]) => {
    try {
      const total = TOTAL_CALORIES;
      const consumed = food.reduce((acomulator, current) => acomulator + Number(current.cal), 0);
      const remaining = TOTAL_CALORIES - consumed;
      const percentage = (consumed / TOTAL_CALORIES) * 100;

      setTodaysStatistics({total, consumed, remaining, percentage});
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ha habido un error');
    }
  };
  // el useCallback es un hook que se usa para memorizar una funcion
  // y evitar que se vuelva a crear cada vez que el componente se renderiza
  // se usa para optimizar el rendimiento de la aplicacion
  // se le pasa como primer parametro la funcion y como segundo parametro
  // un array de dependencias, si alguna de las dependencias cambia
  // la funcion se vuelve a crear
  // si no se le pasa el segundo parametro, la funcion se vuelve a crear
  // cada vez que el componente se renderiza
  const getTodaysFood = useCallback(async () => {
    try {
      const result = await handleGetTodaysFood();
      calculateTodaysStatistics(result);
      setTodaysFood(result);
    } catch (error) {
      Alert.alert('Error', 'Error al obtener los alimentos del dia de hoy');
      console.error('Error', error);
    }
  }, []);
  // el useFocusEffect es un hook que se ejecuta cada vez que la pantalla es enfocada
  // es decir, cada vez que la pantalla es visible
  // se puede usar para hacer peticiones a la api o para actualizar el estado de la pantalla
  // el useEffect se ejecuta solo una vez cuando la pantalla es montada
  // el useFocusEffect se ejecuta cada vez que la pantalla es enfocada
  useFocusEffect(
    useCallback(() => {
      getTodaysFood().catch(null);
    }, [getTodaysFood]),
  );

  return (
    <View style={styles.container}>
      <Header />
      <Calories />
      <TodaysCalories {...todaysStatistics} />
      <FoodList food={todaysFood} todays={true} onComplete={() => getTodaysFood()}/>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
};
