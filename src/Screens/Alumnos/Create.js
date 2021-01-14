import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Button, Dialog} from 'react-native-paper';
import {ButtonX, InputX} from '../../Components';
import {BASE_URL} from '../../Config';

const initialValues = {
  surName: '',
  foreName: '',
  nickName: '',
  phoneHome: '',
  profilePicture: 'Mystery-Person-Silhouette.jpg',
};

export const Create = (props) => {
  const [values, setValues] = React.useState(initialValues);

  const handleChange = (name, value) => {
    setValues({...values, [name]: value});
  };

  const createStudent = () => {
    let myBody = {
      surName: values.surName,
      foreName: values.foreName,
      nickName: values.nickName,
      schoolId: 19,
      phoneHome: values.phoneHome,
      profilePicture: 'Mystery-Person-Silhouette.jpg',
    };

    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myBody),
    };

    let myURL = `${BASE_URL}students/`;
    fetch(myURL, payload)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        props.closePanel(false);
        setValues(initialValues);
        props.reloadData();
      })
      .catch((err) => {
        console.log('Error: ' + err)
      });

    console.log('Registro :' + JSON.stringify(payload));
  };

  return (
    <Dialog visible={props.panelVisible} onDismiss={() => props.onDismiss()}>
      <Dialog.Title>Registrar nuevo Estudiante</Dialog.Title>
      <Dialog.Content>
        <InputX
          id="surName"
          label="Nombre(s)"
          name="surName"
          required
          value={values.surName}
          onChangeText={(e) => handleChange('surName', e)}
        />
        <InputX
          id="foreName"
          label="Apellidos"
          name="foreName"
          required
          value={values.foreName}
          onChangeText={(value) => handleChange('foreName', value)}
        />
        <InputX
          label="Apodo"
          required
          name="nickName"
          value={values.nickName}
          onChangeText={(value) => handleChange('nickName', value)}
        />
        <InputX
          label="Telefono"
          required
          name="phoneHome"
          value={values.phoneHome}
          onChangeText={(value) => handleChange('phoneHome', value)}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => props.closePanel(false)}>Cancelar</Button>
        <Button onPress={() => createStudent()}>Aceptar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
