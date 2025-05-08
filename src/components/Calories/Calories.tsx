import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

export const Calories = () => {
    const {navigate} = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
    const handleAddCalories = () => {
        navigate('AddFood');
    };
    // el boton en esta pantalla es traido por
    // react native vector icons
    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
            <Text style={styles.text}>Calories</Text>
        </View>
        <View style={styles.containerRight}>
          <Button radius={'xl'} type="solid" color={'#4ecb71'} size="lg" onPress={handleAddCalories}>
            <Icon name="plus" color="white" />
          </Button>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  containerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  containerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
