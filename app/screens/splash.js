import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Text
} from 'react-native';
import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
import { 
  NavigationActions 
} from 'react-navigation';

import { bootstrap, KittenTheme } from '../config/';
import { scale, scaleModerate, scaleVertical, scaleHorizontal } from '../utils/scale';

import API from '../services/api';

import * as Animatable from 'react-native-animatable';

const action = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Second'})
  ]
});

export class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let init = await API.init();
    let data = await API.getQuestions();
    let question = await API.getRandomQuestion();
    let action = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Second', params: { data: data, question: question }})
      ]
    });
    this.refs.splash.bounceOutLeft();
    setTimeout(() => {
      this.props.navigation.dispatch(action);
    }, 500);
  }

  render() {
    return (
      <Animatable.Image ref="splash" style={ styles.image } resizeMode='cover' source={require('../assets/images/Default.png')}>
        <View style={styles.text}>
          <Animatable.Text animation="pulse" delay={100} easing="ease-in-out" iterationCount={'infinite'} direction="alternate" style={styles.hero}>
            The Challenger
          </Animatable.Text>
        </View>
      </Animatable.Image>
    )
  }
}

let styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    marginTop: '15%',
    /* Background: */
    alignItems: 'center',
  },
  hero: {
    color: '#FFF',
    fontSize: KittenTheme.fonts.sizes.h1,
    fontFamily: KittenTheme.fonts.family.bold,
    backgroundColor: 'transparent'
  }
});
