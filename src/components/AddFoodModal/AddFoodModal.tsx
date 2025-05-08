import {Icon} from '@rneui/base';
import {Button, Input} from '@rneui/themed';
import {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {handleSaveFood} from '../../hooks';
import {Meal} from '../../types';

interface AddFoodModalProps {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
}
export const AddFoodModal = ({onClose, visible}: AddFoodModalProps) => {
  const [cal, setCal] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [portion, setPortion] = useState<string | undefined>(undefined);

  // el metodo o funcion que ejecuta en handle no es un onChange como podria ser en una web app
  // el metodo correcto para capturar el evento es onChangeText y solo retorna el valor de tipo string
  // en lugar del evento completo (event.target.value)
  const handleCalOnChange = (e: string) => {
    setCal(e);
  };
  const handleNameOnChange = (e: string) => {
    setName(e);
  };
  const handlePortionOnChange = (e: string) => {
    setPortion(e);
  };

  const handleClose = (shouldUpdate?: boolean) => {
    onClose(shouldUpdate);
    setCal(undefined);
    setName(undefined);
    setPortion(undefined);
  };
  const handleSubmit = async () => {
    try {
      // aqui se puede hacer la logica para agregar el alimento a la base de datos
      await handleSaveFood({cal, name, portion} as Meal);
      // una vez agregado el alimento a la base de datos, se pueden limpiar los campos
      handleClose(false);
    } catch (error) {
      handleClose(true);
    }
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      animationType="fade"
      transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button onPress={() => handleClose()} type="clear">
              <Icon name="close" type="font-awesome" color="black" />
            </Button>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input value={cal} onChangeText={handleCalOnChange} />
            </View>
            <View style={styles.lableContainer}>
              <Text>CAL</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input value={name} onChangeText={handleNameOnChange} />
            </View>
            <View style={styles.lableContainer}>
              <Text>Name</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input value={portion} onChangeText={handlePortionOnChange} />
            </View>
            <View style={styles.lableContainer}>
              <Text>Portion</Text>
            </View>
          </View>
          <View style={styles.formButtonContainer}>
            <Button
              radius={'xl'}
              type="solid"
              color={'#4ecb71'}
              size="lg"
              disabled={!cal?.trim() || !name?.trim() || !portion?.trim()}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add</Text>
              <Icon name="plus" type="font-awesome" color="black" size={20} />
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android elevation
    elevation: 5,
  },
  closeContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.8,
    alignItems: 'flex-start',
  },
  lableContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  lable: {},
  input: {},
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  formButtonContainer: {
    alignItems: 'flex-end',
  },
});
