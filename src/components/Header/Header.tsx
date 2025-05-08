import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {Image, StyleSheet, Text, View} from 'react-native';
import { RootStackParamList } from '../../types';
import { Button } from '@rneui/themed';
import { Icon } from '@rneui/base';
const staticInfo = {
  name: 'Jorge Loza',
  uri: 'https://lh3.googleusercontent.com/a/ACg8ocIWjfn7bcG--tBGnRPF5_JJG3d8brrJnVOva7qLRiDi1l6D_Fg=s288-c-no',
};

export const Header = () => {
    const {canGoBack, goBack} = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <View style={styles.container}>
      {canGoBack() && (
        <View style={styles.arrowContainer}>
          <Button radius={'xl'} type="clear">
            <Icon
              name="arrow-back"
              type="material"
              size={24}
              color="#black"
              onPress={() => goBack()}
            />
          </Button>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcome back to you goal.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: staticInfo.uri}} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
