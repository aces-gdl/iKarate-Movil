import React, {useEffect, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import {APP_STATE} from '../../Constants';
import {resetLoginCredentials} from '../Keychain';
import {useStoreActions, useStoreState} from 'easy-peasy';
import useCheckVersion from '../CheckVersion';

const AppStateContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppStateContext);
};

export const AppContextProvider = props => {
  const {loginUser, setState, checkLogin} = useStoreActions(actions => ({
    loginUser: actions.login.loginUser,
    setState: actions.login.changeAppState,
    checkLogin: actions.login.checkLogin,
  }));
  useCheckVersion();
  const state = useStoreState(store => store.login.appstate);

  const _logoutUser = useCallback(async () => {
    const reset = resetLoginCredentials();
    if (reset) {
      // do logout
      setState(APP_STATE.PUBLIC);
    }
  }, [setState]);

  const logout = useCallback(() => {
    Alert.alert(
      'Confirmar acción',
      'Esta seguro de querer salir?',
      [
        {
          text: 'Si, Salir',
          onPress: _logoutUser,
        },
        {
          type: 'cancel',
          text: 'No, Seguir en la aplicación',
        },
      ],
    );
  }, [_logoutUser]);

  const login = useCallback(
    reqData => {
      loginUser(reqData);
    },
    [loginUser],
  );

  // check loggedin on mount
  useEffect(() => {
    state === APP_STATE.UNKNOWN && checkLogin();
  }, [checkLogin, state]);

  return (
    <AppStateContext.Provider
      value={{
        state,
        logout,
        login,
      }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
