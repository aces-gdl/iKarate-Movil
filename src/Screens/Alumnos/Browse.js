/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Image, Text, Alert, RefreshControl} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Button, Card, Dialog, Paragraph, Searchbar} from 'react-native-paper';

import {IconX, ICON_TYPE} from '../../Icons/index';
import theme from '../../Themes/configs/default';
import {BASE_URL} from '../../Config';
import {InputX} from '../../Components';
import {Create} from './Create';

export function Browse({navigation}) {
  const [myData, setMyData] = React.useState([]);
  const [myPhoto, setMyPhoto] = React.useState(null);
  const [editPanelVisible, setEditPanelVisible] = React.useState(false);
  const [createPanelVisible, setCreatePanelVisible] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const refreshData = () => {
    console.log('Refreshing data...');
    setIsRefreshing(true);
    let myURL = BASE_URL + 'students/';
    if (searchQuery.length > 0) myURL += 'search/' + searchQuery;
    fetch(myURL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMyData(jsonResponse);
        setIsRefreshing(false);
        //       console.log(jsonResponse);
      });
  };

  var HandlePhotoSelection = (camera) => {
    let options = {
      title: ' Seleccion fotografia',
      customButtons: [{name: 'fb', title: 'Selecciona foto de Facebook'}],
      noData: true,
    };
    console.log('Entre a Handle Photo Selection');
    if (camera == 'camera') {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};
          setMyPhoto(source);
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};
          console.log('uri                 : ' + response.uri);
          console.log('origURL             : ' + response.origURL);
          console.log('Tye                 : ' + response.type);
          console.log('fileName            : ' + response.fileName);
          console.log('Image.path          : ' + response.path);
          console.log('--------> : ' + JSON.stringify(response));

          setMyPhoto(source);
         // setIsNewImageSelected(true);
          UploadPicture(source);
        }
      });
    }
  };

  const UploadPicture = (source) => {
    let uploadData = new FormData();
    //    if (isNewImageSelected) {
    uploadData.append('name', 'juan');
    uploadData.append('file', {
      uri: source.uri,
      type: source.type,
      name: source.uri.substr(source.uri.lastIndexOf('/') + 1),
    });
    fetch(BASE_URL + 'photo/' + currentItem.id, {
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      body: uploadData,
    }).then((response) => {
      console.log(response);
      setIsRefreshing(false);
    });
    //  }
  };

  React.useEffect(() => {
    refreshData();
    return () => {
      console.log('Search query changed');
    };
  }, [searchQuery]);

  const renderItem = ({item}) => {
    let profilePicture =
      BASE_URL + 'photo/' + item.id + '/' + item.profilePicture;
    return (
      <Card style={{marginBottom: 5}}>
        <Card.Title
          title={item.foreName + ' ' + item.surName}
          subtitle={item.nickName}
          subtitleNumberOfLines={3}
          rightStyle={{paddingRight: 10}}
          right={() => (
            <Image
              source={{uri: profilePicture}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          )}
        />
        <Card.Actions>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => DeleteStudent(item)}>
              <IconX
                name="trash-outline"
                origin={ICON_TYPE.ICONICONS}
                size={22}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SetStudent(item)}>
              <IconX
                name="image-outline"
                origin={ICON_TYPE.ICONICONS}
                size={22}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCreatePanelVisible(true)}>
              <IconX
                name="create-outline"
                origin={ICON_TYPE.ICONICONS}
                size={22}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Card.Actions>
      </Card>
    );
  };

  const SetStudent = (item) => {
    setCurrentItem(item);
    setMyPhoto({
      uri: BASE_URL + 'photo/' + item.id + '/' + item.profilePicture,
    });
    setEditPanelVisible(true);
  };

  const DeleteStudent = (item) => {
    let myURL = BASE_URL + 'students/' + item.id;
    fetch(myURL, {
      method: 'DELETE',
    }).then((response) => {
      console.log(response);
      Alert.alert('Registro Borrado ');
      refreshData();
    });
  };

  const ShowPhotoDialog = () => {
    return (
      <Dialog
        visible={editPanelVisible}
        onDismiss={() => setEditPanelVisible(false)}>
        <Dialog.Title>Actualizar Fotografia</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            {currentItem.foreName} {currentItem.surName}
          </Paragraph>
          <Paragraph>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity onPress={() => HandlePhotoSelection('camera')}>
                <IconX name="camera" origin={ICON_TYPE.ICONICONS} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => HandlePhotoSelection('Library')}>
                <IconX
                  name="folder-open-outline"
                  origin={ICON_TYPE.ICONICONS}
                />
              </TouchableOpacity>
            </View>
          </Paragraph>
        </Dialog.Content>
        <Dialog.ScrollArea>
          <Image source={myPhoto} style={{height: 200}} />
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button onPress={() => setEditPanelVisible(false)}>Cancelar</Button>
            <Button onPress={() => setEditPanelVisible(false)} visible={false}>
              Actualizar !
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50,
            paddingBottom: 10,
          }}>
          <Searchbar
            style={{width: '90%'}}
            onChangeText={onChangeSearch}
            value={searchQuery}
            placeholder="Buscar"
          />
          <TouchableOpacity onPress={() => setCreatePanelVisible(true)}>
            <IconX name="person-add-outline" origin={ICON_TYPE.ICONICONS} />
          </TouchableOpacity>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={refreshData} refreshing={isRefreshing} />
          }
          data={myData}
          renderItem={renderItem}
          keyExtractor={(item) => ' ' + item.id}
        />
        <ShowPhotoDialog />
        <Create
          panelVisible={createPanelVisible}
          onDismiss={() => setCreatePanelVisible(false)}
          closePanel={setCreatePanelVisible}
          reloadData={refreshData}
        />
      </View>
    </>
  );
}
