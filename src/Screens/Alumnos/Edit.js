import * as React from 'react';
import {View, Image, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Button, Dialog} from 'react-native-paper';
import {ButtonX} from '../../Components';
import {BASE_URL} from '../../Config';

export const Edit = (props) => {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Agregar Estudiante</Text>
      </View>
    </>
  );
};
