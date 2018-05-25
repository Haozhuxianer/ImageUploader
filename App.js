/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
          title= 'pick'
          onPress={this.handerimage}
        />
        <Button
          title= 'test'
          onPress={this.test}
        />
        <Image
          source={{uri: 'http://192.168.43.151:3000/images/image.jpg'}}
          style={{width:100, height:100}}
        />
      </View>
    );
  }

  test = async () => {
    try{
      var res = await fetch('http://192.168.43.151:3000/index/test')
      console.log(res)
    }catch(err){
      console.log(err);
    }
  }

  handerimage = async () => {

    let options = {
      title:null,
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'选择相册',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
          skipBackup: true
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);

      let data = new FormData();
      data.append('type', response.type);
      data.append('imgdata', response.data);
      data.append('filename', response.fileName);

      fetch("http://192.168.43.151:3000/index/upload" , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data
      }).then((response) => {
          console.log(response.ok)
      }).then((responseText) => {
          console.log(responseText)
      }).catch((err) => {
          console.log(err)
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
