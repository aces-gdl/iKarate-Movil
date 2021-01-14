/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Section, TouchableX} from '../../Components';
import {Image, View} from 'react-native';
import {Text} from 'react-native';
import metrics from '../../Themes/Metrics';
import useAuth from '../../Services/Auth';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';

const Drawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Section style={{paddingTop: 100, backgroundColor: 'white'}}>
        <Text style={{fontSize: 20}}>Menú</Text>
      </Section>
      {/* <Image
        style={{width: metrics.drawerWidth, height: 200}}
        source={require('../../../hero/1.png')}
      /> */}

      <Content />
    </DrawerContentScrollView>
  );
};

const Content = () => {
  const {logout} = useAuth();
  return (
    <>
      <Item name="Casa"  />
      <Item name="Alumnos" onPress={(() => NavigationService.navigate(Routes.STUDENTS_SCREEN))}/>
      <Item name="Perfil" onPress={(() => NavigationService.navigate(Routes.PROFILE_SCREEN))}/>
      <Item name="Ajustes" />
      <View style={{height: 20, borderBottomWidth:0.3, borderColor:'lightgray'}} />
      <Item name="Salir" color={'red'} onPress={logout} />
    </>
  );
};

const Item = ({name, color = 'black', onPress = () => {}}) => {
  return (
    <TouchableX border onPress={onPress}>
      <View style={{padding: 16}}>
        <Text style={{color}}>{name}</Text>
      </View>
    </TouchableX>
  );
};

export default Drawer;
