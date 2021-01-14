/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import NavigationStyles from '../../Styles/NavigationStyles';
import useAppTheme from '../../Themes/Context';
import { ICON_TYPE } from '../../Icons';
import {Browse} from './Browse';

const MainScreen = ({navigation}) => {
  const {theme} = useAppTheme();

  useEffect(() => {
    const _toggleDrawer = () => {
      navigation.toggleDrawer();
    };

    console.log('use effect home');

    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={{marginLeft: 10}}>
            <HeaderButton
              icon="menuunfold"
              color={theme.colors.headerTitle}
              iconOrigin={ICON_TYPE.ANT_ICON}
              onPress={_toggleDrawer}
            />
          </View>
        );
      },
    });
  }, [navigation, theme.colors.headerTitle]);
  
  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          justifyContent: 'center',
          padding: 20,
        }}>
          <Browse />
      </Container>
    </LoadingActionContainer>
  );
};

MainScreen.navigationOptions = ({navigation, screenProps}) => {
  const {theme} = screenProps;
  return {
    headerStyle: [
      NavigationStyles.header_statusBar,
      {backgroundColor: theme.colors.header},
    ],
    headerTitle: 'Alumnos',
    headerTintColor: theme.colors.headerTitle,
    headerTitleStyle: [
      NavigationStyles.headerTitle,
      {color: theme.colors.headerTitle},
    ],
  };
};

export default MainScreen;
