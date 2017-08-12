import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text
} from 'react-native';
import {
  RkStyleSheet,
  RkCard,
  RkText,
  RkButton
} from 'react-native-ui-kitten';
import { 
  NavigationActions 
} from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import { bootstrap, KittenTheme } from '../config/';

import API from '../services/api';

let moment = require('moment');

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    if(props.navigation.state && props.navigation.state.params && props.navigation.state.params.data) {
      this.state = {
        data: props.navigation.state.params.data,
        question: props.navigation.state.params.question,
        animationType: 'bounceInRight'
      }
    } else {
      this.state = {
        animationType: 'bounceInLeft'
      };
    }
  }

  async componentDidMount() {
    if(!this.state.data) {
      this.setState({ loading: true })
      let init = await API.init();
      let data = await API.getQuestions();
      let question = await API.getRandomQuestion();
      this.setState({ data: data, question: question, loading: false });
    }
  }

  start() {
    if(this.state.loading) {
      setTimeout(() => {
        this.start();
      }, 500);
      return;
    }
    let action = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Third', params: { question: this.state.question }})
        ]
    });
    this.refs.home.bounceOutLeft();
    setTimeout(() => {
      this.props.navigation.dispatch(action);
    }, 500);
  }

  render() {
    return (
      <Animatable.Image ref="home" resizeMode="cover" animation={ this.state.animationType } style={ styles.image } 
      source={require('../assets/images/Default.png')}>
        <View style={styles.text}>
          <Animatable.Text animation="pulse" delay={100} easing="ease-in-out" iterationCount={'infinite'} direction="alternate" style={styles.hero}>
            The Challenger
          </Animatable.Text>
        </View>
        <View style={{ flex: 1 }}>
            {
              this.state.data ?
              (
                <RkText rkType="secondary1 whiteColor" style={{ textAlign: 'center' }}>
                    { this.state.data.answeredQuestions.length == 0 
                    ? "No challenges complete yet!"
                    : this.state.data.answeredQuestions.length == 1
                    ? "You have completed 1 challenge so far!"
                    : "You have completed " +  this.state.data.answeredQuestions.length + " challenges so far!" }
                </RkText>
              )
              :
              (
                <RkText rkType="secondary1 whiteColor" style={{ textAlign: 'center' }}>...</RkText>
              )
            }
            
            <RkText rkType="secondary3 whiteColor" style={{ marginTop: 15, paddingHorizontal: 15, textAlign: 'center' }}>We all continue our lives in what becomes somewhat of a routine. In order to become the best version of yourself, sometimes, you need a little challenge. </RkText>
            <RkText rkType="secondary3 whiteColor" style={{ marginTop: 15, paddingHorizontal: 15, textAlign: 'center' }}>Do you want to be happier? Healthier? More daring? Challenge yourself today!</RkText>
            
        </View>
        <View style={ styles.buttonContainer }>
            <RkButton rkType='basic' style={styles.button} onPress={() => this.start() }>Check your daily challenge!</RkButton>
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
    marginBottom: KittenTheme.spacing.margin.large,
    /* Background: */
    alignItems: 'center',
  },
  hero: {
    color: '#FFF',
    fontSize: KittenTheme.fonts.sizes.h1,
    fontFamily: KittenTheme.fonts.family.bold,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: KittenTheme.spacing.margin.large,
    flex: -1,
    flexDirection: 'row',
    paddingHorizontal: KittenTheme.spacing.padding.small
  },
  button: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: KittenTheme.colors.lava
  },
  appName: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
  },
});