import {Alert, StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';
import {AddFoodModal} from '../../components/AddFoodModal';
import {useEffect, useState} from 'react';
import {Meal} from '../../types';
import {handleGetFood} from '../../hooks';
import {FoodList} from '../../components/FoodList';

export const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [food, setFood] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  async function getFoods() {
    try {
      setFood(await handleGetFood());
    } catch (error) {
      Alert.alert('Error', 'Error al obtener los alimentos');
      console.error('Error', error);
    }
  }
  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('Error');
    }
    setVisible(false);
    getFoods();
  };
  const handleAddFood = () => {
    setVisible(true);
  };

  const handleSearchOnChange = (e: string) =>
    setSearch(e === '' ? undefined : e);
  const handleSearchFood = async () => {
    try {
      const result = await handleGetFood();
      setFood(result.filter((item: Meal) => item.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase() || '')));
    } catch (error) {
      Alert.alert('Error', 'Error al filtrar los alimentos');
      console.error('Error', error);
      getFoods();
    }
  };

  useEffect(() => {
    getFoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //el boton en esta pantalla es traido por
  //awesome icons
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.textContainer}>
          <Text>Add Food</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            radius={'xl'}
            type="solid"
            color={'#4ecb71'}
            size="lg"
            onPress={handleAddFood}>
            <Icon name="plus" type="font-awesome" color="#fff" />
          </Button>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="appples, pie, soda, etc."
            value={search}
            onChangeText={handleSearchOnChange}
          />
        </View>
        <View style={styles.searchButtonContainer}>
          <Button
            radius={'xl'}
            type="solid"
            color={'#ade8af'}
            size="lg"
            onPress={handleSearchFood}>
            <Text style={styles.buttonText}>Search</Text>
            <Icon
              name="search"
              type="font-awesome"
              color="black"
              size={20}
              style={styles.iconPadding}
            />
          </Button>
        </View>
        <AddFoodModal onClose={handleModalClose} visible={visible} />
      </View>
      <FoodList food={food} todays={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 24,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 0.8,
  },
  searchButtonContainer: {
    flex: 0.2,
    paddingRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconPadding: {
    paddingLeft: 5,
  },
});
