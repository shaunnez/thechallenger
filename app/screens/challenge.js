import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Icon,
  Linking,
  Share,
  Alert,
  Modal
} from 'react-native';

import {
  RkStyleSheet,
  RkCard,
  RkText,
  RkButton
} from 'react-native-ui-kitten';

import { ImagePicker } from 'expo';

import { NavigationActions } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import { bootstrap, KittenTheme } from '../config/';

import API from '../services/api';

let moment = require('moment');

const action = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Second'})
  ]
})

const baseImageUrl = 'http://res.cloudinary.com/choicenz/image/fetch/w_1500/';

export class ChallengeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: props.navigation.state.params.question,
      modalVisible: false
    }
  }

  async componentDidMount() {
    // nothing to do
  }

  back() {
    this.refs.challenge.bounceOutRight();
    setTimeout(() => {
      this.props.navigation.dispatch(action);
    }, 500);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <Animatable.View style={{ flex: 1 }} ref="challenge" animation="bounceInRight" >
        {
          this.state.question ? this.modalView() : <View/>
        }
        { 
          this.state.question ? this.challengesView() : this.noChallengesView()
        }
      </Animatable.View>
    )
  }

  modalView() {
    return (
      <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible}>
        <Image ref="home" animation={ this.state.animationType } style={ styles.image } source={require('../assets/images/Default-nologo.png')}>
          <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            

            <View style={ styles.buttonContainer }>
              <RkButton rkType='basic' onPress={() => this.completeQuestion() }
              style={[ styles.button, { backgroundColor: KittenTheme.colors.green, opacity: this.state.question.Completed ? 0.3 : 1 } ]}>{ this.state.question.Completed ? 'Completed' : 'Complete' }</RkButton>
            </View>
            
            <View style={ styles.buttonContainer }>
              <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.opaqueSunglow, opacity: this.state.question.Completed ? 0.3 : 1 } ]} 
              onPress={() => this.share() }>Complete + Share</RkButton>
            </View>
            <View style={ styles.buttonContainer }>
              <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.dayBreak, opacity: this.state.question.Completed ? 0.3 : 1 } ]} 
              onPress={() => this.shareWithPhoto() }>Complete + Share + Photo</RkButton>
            </View>

        
            <View style={ styles.buttonContainer }>
              <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.coolBlack75 } ]} 
              onPress={() => this.setModalVisible(false) }>Close</RkButton>
            </View>
            {
              /*
              <View style={ styles.buttonContainer }>
                <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.transparent, borderColor: KittenTheme.colors.coolBlack, borderWidth: 1 } ]} 
                onPress={() => this.cheatNextQuestion() }>
                  <RkText style={{ color: KittenTheme.colors.coolBlack }}>Demo next question</RkText>
                </RkButton>
              </View>

              <View style={ styles.buttonContainer }>
                <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.transparent, borderColor: KittenTheme.colors.coolBlack, borderWidth: 1 } ]} 
                onPress={() => this.restart() }>
                  <RkText style={{ color: KittenTheme.colors.coolBlack }}>Demo restart</RkText>
                </RkButton>
              </View>
              */
            }
          </View>
        </Image>
      </Modal>
    )
  }

  noChallengesView() {
    return (
      <View style={{flex: 1}}>
        <View style={ styles.noChallenges }>
          <RkText>No challenges left.</RkText>
          <View style={ styles.buttonContainer }>
            <RkButton rkType='basic' styles={ styles.button } onPress={() => this.restart() }>Restart?</RkButton>
          </View>
        </View>
      </View>
    )
  }
  
  challengesView() {
    return (
      <View style={{ flex: 1 }}>
        <View style={ styles.absolute }>
          <Image resizeMode="cover" animation={ this.state.animationType } 
          style={{ flex: 1, width: null, height: null }} 
          source={require('../assets/images/Default-nologo.png')} />
        </View>
        <RkCard rkType='article' style={[ styles.absolute ]}>

          <Image rkCardImg resizeMode='cover' source={{ uri: baseImageUrl + this.state.question.Image }}
          onLoadStart={() => this.setState({ imageLoaded : false })} 
          onLoadEnd={() => this.setState({ imageLoaded : true })} 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#fff'} style={{ opacity: this.state.imageLoaded ? 0 : 1 }}/>
          </Image>

          <View rkCardHeader>
            <RkText style={styles.title} rkType='header4 whiteColor' >{this.state.question.Title}: {this.state.question.Completed ? 'Completed' : 'Pending' }
            </RkText>
            <RkText rkType='secondary2 whiteColor' style={{ alignSelf: 'center' }}>Ends {moment().endOf('day').fromNow()}</RkText>
          </View>

          <View rkCardHeader>
            <RkText rkType='primary3 whiteColor'>{this.state.question.Content}</RkText>
          </View>

          { this.state.question.Extra ? 
            (
              <View rkCardHeader>
                <RkText rkType='secondary2 whiteColor'>{this.state.question.Extra}</RkText>
              </View>
            )
            :
            (
              <View/>
            )
          }
          <View rkCardFooter>
            <View style={[ styles.buttonContainer, { paddingHorizontal: 0, marginRight: KittenTheme.spacing.margin.xsmall  } ]}>
              <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.coolBlack75 } ]} 
              onPress={() => this.back() }>Back</RkButton>
            </View>
            <View style={[ styles.buttonContainer, { paddingHorizontal: 0, marginLeft: KittenTheme.spacing.margin.xsmall  } ]}>
              <RkButton rkType='basic' style={[ styles.button, { backgroundColor: KittenTheme.colors.green } ]} 
              onPress={() => this.setModalVisible(true) }>Complete</RkButton>
            </View>
          </View>
        </RkCard>
      </View>
    )
  }

  async completeQuestion() {
    let question = this.state.question;
    if(question.Completed) {
      this.setModalVisible(false);
      return;
    }
    this.justComplete();
  }

  async share() {
    let question = this.state.question;
    if(question.Completed) {
      this.setModalVisible(false);
      return;
    }
    Share.share({
      message: 'You should do it too!',
      title: 'I completed todays Challenge!',
      url: baseImageUrl + this.state.question.Image
    }, {
      dialogTitle: 'I completed todays Challenge!',
      tintColor: 'blue'
    }).then((result) => {
      if(result && result.action && result.action != "dismissedAction") {
        this.justComplete();
      }
    })
  }

  async shareWithPhoto() {
    let question = this.state.question;
    if(question.Completed) {
      this.setModalVisible(false);
      return;
    }
    ImagePicker.launchCameraAsync({ allowsEditing: true, base64: true }).then((result) => {
      if(!result.cancelled) {
        let uri = result.uri;
         Share.share({
          message: 'You should do it too!',
          title: 'I completed todays Challenge!',
          url: uri
        }, {
          dialogTitle: 'I completed todays Challenge!',
          tintColor: 'blue'
        }).then((result) => {
          if(result && result.action && result.action != "dismissedAction") {
            this.justComplete();
          }
        })
      }
    })
  }

  async justComplete() {
    let question = this.state.question;
    question.Completed = true;
    this.setModalVisible(false);
    this.refs.challenge.flash().then(async (endState) => {
      await API.saveQuestion(question);
      this.setState({ question: question });
    })
  }

  async cheatNextQuestion() {
    this.setModalVisible(false);
    this.setState({ imageLoaded: false });
    await API.cheatNextQuestion();
    let question = await API.getRandomQuestion();
    this.setState({ question: question })
    this.refs.challenge.flash()
  }

  async restart() {
    this.setModalVisible(false);
    this.setState({ imageLoaded: false });
    await API.restart();
    let question = await API.getRandomQuestion();
    this.setState({ question: question  })
    this.refs.challenge.flash()
  }


}

let styles = StyleSheet.create({
  root: {
    backgroundColor: KittenTheme.colors.white
  },
  backButton: {
    color: 'white', 
    position: 'absolute',
    left: 15,
    top: 20,
    width: 100,
    height: 30,
    zIndex: 2,
  },
  absolute: {
     position: 'absolute', 
     top: 0, 
     left: 0, 
     bottom: 0, 
     right: 0, 
     width: '100%', 
     height: '100%'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  noChallenges: {
     flex: 1, 
     alignSelf: 'stretch', 
     alignItems: 'center', 
     justifyContent: 'center'
  }
});