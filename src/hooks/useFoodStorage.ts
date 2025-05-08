import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meal} from '../types';
import {isToday} from 'date-fns';

const MY_FOOD_KEY = '@myFood:Key';
const MY_TODAYS_FOOD_KEY = '@myTodayFood:Key';

const saveInfoToStorage = async (key: string, value: Meal) => {
  try {
    const currentSavedFood = await AsyncStorage.getItem(key);
    if (currentSavedFood) {
      const currentSavedFoodParsed = JSON.parse(currentSavedFood);
      currentSavedFoodParsed.push(value);

      // AsyncStorage.setItem(key, value) es un metodo que nos permite guardar datos en el dispositivo
      // el primer parametro es la key y el segundo es el valor
      await AsyncStorage.setItem(key, JSON.stringify(currentSavedFoodParsed));

      return Promise.resolve();
    }
    await AsyncStorage.setItem(key, JSON.stringify([value]));
    return Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

const getInfoFromStorage = async (key: string): Promise<Meal[]> => {
  try {
    const foods = await AsyncStorage.getItem(key);
    if (foods !== null) {
      return Promise.resolve(JSON.parse(foods));
    }
    return Promise.resolve([]);
  } catch (error) {
    return Promise.reject(error);
  }
};

// guardar el alimento en el storage
export const handleSaveFood = async ({cal, name, portion}: Meal) => {
  const result = await saveInfoToStorage(MY_FOOD_KEY, {cal, name, portion});
  return Promise.resolve(result);
};

// obtener el alimento del storage
export const handleGetFood = async (): Promise<Meal[]> => {
  return await getInfoFromStorage(MY_FOOD_KEY);
};

// guardar el alimento del dia de hoy
export const handleSaveTodaysFood = async ({cal, name, portion}: Meal) => {
  const result = await saveInfoToStorage(MY_TODAYS_FOOD_KEY, {
    cal,
    name,
    portion,
    date: new Date().toISOString(),
  });
  return Promise.resolve(result);
};

// metodo para obtener el alimento del dia de hoy
export const handleGetTodaysFood = async (): Promise<Meal[]> => {
  try {
    const foods = await AsyncStorage.getItem(MY_TODAYS_FOOD_KEY);
    if (foods !== null) {
      const parsedFoods = JSON.parse(foods) as Meal[];
      return Promise.resolve(
        parsedFoods.filter(
          (meal: Meal) => meal.date && isToday(new Date(meal.date)),
        ),
      );
    }
    return Promise.resolve([]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const handleDeleteTodaysFood = async (name: string) => {
  try {
    const todaysFood = await handleGetTodaysFood();
    // lo ideal seria borrar por id de item, te lo dejo de tarea
    // Jorge del futuro (ya quiero pasar a firebase y notificaciones push)
    const filteredItems = todaysFood.filter((item: Meal) => {
      return item.name !== name;
    });
    await AsyncStorage.setItem(
      MY_TODAYS_FOOD_KEY,
      JSON.stringify(filteredItems),
    );
    return Promise.resolve(filteredItems);
  } catch (error) {
    return Promise.reject(error);
  }
};
